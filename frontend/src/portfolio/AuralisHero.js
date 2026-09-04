import React, { useEffect, useRef } from "react";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import "./AuralisHero.css";

const VERT = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// bloom field palette (light gray + sky blues) driven by the auralis
// noise flow: two layered simplex fields, slow drift, animated grain
const FRAG = `
precision highp float;
varying vec2 vUv;

uniform vec2 u_resolution;
uniform float u_time;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float ratio = u_resolution.x / u_resolution.y;
  vec2 p = uv * vec2(ratio, 1.0);
  float t = u_time * 0.2;

  float n1 = snoise(p * 0.5 + t);
  float n2 = snoise(p * 0.9 - t * 0.5 + n1);
  float light = pow(abs(n2), 2.5) * 0.5;

  vec3 base = vec3(0.886, 0.886, 0.886);
  vec3 blue = vec3(0.106, 0.624, 0.996);
  vec3 cyan = vec3(0.290, 0.788, 1.0);

  vec3 col = base;
  col = mix(col, blue, smoothstep(0.05, 0.9, n1) * 0.9);
  col = mix(col, cyan, light);

  // soft persistent bloom behind the title
  float center = exp(-length(p - vec2(0.5 * ratio, 0.55)) * 1.6);
  col = mix(col, blue, center * 0.5);

  // grain
  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time);
  col += (grain - 0.5) * 0.14;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function compile(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(sh);
        gl.deleteShader(sh);
        throw new Error(info);
    }
    return sh;
}

export default function AuralisHero() {
    const heroRef = useRef(null);
    const canvasRef = useRef(null);
    const hintRef = useRef(null);

    // the scroll cue fades out as the about section arrives and fades back
    // in when you return to the landing view
    useEffect(() => {
        const hint = hintRef.current;
        if (!hint) return;
        const onScroll = () => {
            const p = Math.min(window.scrollY / (window.innerHeight * 0.35), 1);
            hint.style.opacity = String(1 - p);
            hint.style.pointerEvents = p >= 1 ? "none" : "auto";
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const hero = heroRef.current;
        const canvas = canvasRef.current;
        const gl = canvas.getContext("webgl", { antialias: true });
        if (!gl) return;

        let program;
        try {
            program = gl.createProgram();
            gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
            gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error("bloom shader link failed:", gl.getProgramInfoLog(program));
                return;
            }
        } catch (e) {
            console.error("bloom shader failed:", e);
            return;
        }
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW
        );
        const pos = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(pos);
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

        const uRes = gl.getUniformLocation(program, "u_resolution");
        const uTime = gl.getUniformLocation(program, "u_time");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const SPEED = 0.3;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.round(canvas.clientWidth * dpr);
            canvas.height = Math.round(canvas.clientHeight * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener("resize", resize);

        let raf;
        const render = (now) => {
            raf = requestAnimationFrame(render);
            const rect = hero.getBoundingClientRect();
            if (rect.bottom <= 0) return;
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, reduced ? 8.0 : now * 0.001 * SPEED);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        raf = requestAnimationFrame(render);

        // no loseContext() here: react strict mode remounts effects in dev,
        // and a lost context would leave the second mount drawing nothing
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            gl.deleteProgram(program);
        };
    }, []);

    return (
        <section className="hero" ref={heroRef}>
            <canvas className="hero-canvas" ref={canvasRef} />
            <div className="hero-overlay">
                <h1 className="hero-name">austin tsow</h1>
                <div className="hero-links">
                    <a
                        className="hero-link"
                        href="https://github.com/austintsow"
                        target="_blank"
                        rel="noreferrer"
                    >
                        github
                        <FiArrowUpRight />
                    </a>
                    <a
                        className="hero-link"
                        href="https://linkedin.com/in/tsow"
                        target="_blank"
                        rel="noreferrer"
                    >
                        linkedin
                        <FiArrowUpRight />
                    </a>
                    <a
                        className="hero-link"
                        href="/resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                    >
                        resume
                        <FiArrowUpRight />
                    </a>
                    <a className="hero-link" href="mailto:austin@tsow.com">
                        email
                        <FiArrowUpRight />
                    </a>
                </div>
            </div>
            <a className="hero-hint" href="#about" ref={hintRef}>
                more below
                <FiArrowDown />
            </a>
        </section>
    );
}
