import React, { useEffect, useRef } from "react";

// same flowing-noise shader as the landing bloom, parameterized by brand
// color, on a near-white base so card text stays readable. only draws while
// its parent card is hovered (plus one initial frame).
const VERT = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_seed;
uniform vec3 u_c1;
uniform vec3 u_c2;

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

  float n1 = snoise(p * 0.5 + t + u_seed);
  float n2 = snoise(p * 0.9 - t * 0.5 + n1 + u_seed * 0.7);
  float light = pow(abs(n2), 2.5) * 0.5;

  vec3 col = vec3(0.965, 0.973, 0.98);
  col = mix(col, u_c1, smoothstep(0.05, 0.9, n1) * 0.5);
  col = mix(col, u_c2, light * 0.65);

  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time);
  col += (grain - 0.5) * 0.07;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function hexToRgb(hex) {
    const h = hex.replace("#", "");
    return [
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255,
    ];
}

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

export default function CardBloom({ c1, c2 = "#ffffff", seed = 0, className }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const host = canvas.parentElement;
        const gl = canvas.getContext("webgl", { antialias: true });
        if (!gl) return;

        let program;
        try {
            program = gl.createProgram();
            gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
            gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error("card bloom link failed:", gl.getProgramInfoLog(program));
                return;
            }
        } catch (e) {
            console.error("card bloom shader failed:", e);
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
        gl.uniform3fv(gl.getUniformLocation(program, "u_c1"), hexToRgb(c1));
        gl.uniform3fv(gl.getUniformLocation(program, "u_c2"), hexToRgb(c2));
        gl.uniform1f(gl.getUniformLocation(program, "u_seed"), seed);

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const SPEED = 0.3;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1);
            canvas.width = Math.max(1, Math.round(host.clientWidth * dpr));
            canvas.height = Math.max(1, Math.round(host.clientHeight * dpr));
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(host);

        let raf;
        let drawn = false;
        const render = (now) => {
            raf = requestAnimationFrame(render);
            if (drawn && !host.matches(":hover") && !host.classList.contains("active"))
                return;
            const rect = host.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, reduced ? 8.0 : now * 0.001 * SPEED);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            drawn = true;
        };
        raf = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, [c1, c2, seed]);

    return <canvas ref={canvasRef} className={className} />;
}
