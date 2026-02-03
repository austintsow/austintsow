import { useState, useEffect, useRef } from "react";
import "./SevenMonths.css";

const ASCII_CHARS = "@#$%&*+=?!<>{}[]|~abcdefghijklmnopqrstuvwxyz0123456789";
const SPARKLE_CHARS = ["*", "+", "✦", "✧", "°", "•", "·"];

const PATTERNS = {
    six: [
        "      ████████      ",
        "    ██        ██    ",
        "   ██          ██   ",
        "  ██                ",
        "  ██                ",
        "  ██  ████████      ",
        "  ██ ██      ██     ",
        "  ██ ██      ██     ",
        "   ████      ██     ",
        "     ██████████     ",
    ],
    heart: [
        "      ████      ████      ",
        "    ████████  ████████    ",
        "   ██████████████████████ ",
        "   ██████████████████████ ",
        "   ██████████████████████ ",
        "    ████████████████████  ",
        "      ████████████████    ",
        "        ████████████      ",
        "          ████████        ",
        "            ████          ",
        "             ██           ",
    ],
    seven: [
        "████████████████████",
        "████████████████████",
        "                 ██ ",
        "                ██  ",
        "               ██   ",
        "              ██    ",
        "             ██     ",
        "            ██      ",
        "           ██       ",
        "          ██        ",
    ],
    message: [
        "█  █  ███  ████  ████  █   █",
        "█  █ █   █ █   █ █   █ █   █",
        "████ █████ ████  ████   ███ ",
        "█  █ █   █ █     █       █  ",
        "█  █ █   █ █     █       █  ",
        "                            ",
        "█████  █   █  ███  █   █ █████ █  █  ███",
        "   █   ██ ██ █   █ ██  █   █   █  █ █   ",
        "  █    █ █ █ █   █ █ █ █   █   ████  ██ ",
        " █     █   █ █   █ █  ██   █   █  █    █",
        " █     █   █  ███  █   █   █   █  █ ███ ",
        "                                        ",
        " ███  █     ███  ████  █  ███ ",
        "█     █    █   █ █   █ █ █   █",
        "█  ██ █    █   █ ████  █ █████",
        "█   █ █    █   █ █   █ █ █   █",
        " ███  ████  ███  █   █ █ █   █",
    ],
};

const LOVE_NOTE = "Happy 7 months Gloria ahhhhhhhhh it doesn't really feel like it's been that long but it has and I'm so lucky that I get to call you mine. I know you're locked in right now (or should be locked in) so I'll keep this short and easy. I can't wait to see you in a few days, I miss you so so so so so so much and I can't wait to have you wrapped in my arms again. I hope you like my little ascii art thing that I made lol. We're in such an exciting time of our lives Gloria, you're wrapping up with school and I'm working. We're adulting! We've got this… WE. I wish you the very best luck, I'm sending all of my luck and energy for your studies for your interview as well as school. You've got this Gloria I believe in you and I know that you're so capable of everything that you can do. I want nothing more than to be right by your side through it all, supporting you in every way I can. Any of your problems is mine as well. I love you Gloria and happy 7 months 💐❤️";

function getRandomChar() {
    return ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
}

function getSparkleChar() {
    return SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)];
}

function parsePattern(pattern) {
    const coords = [];
    pattern.forEach((row, y) => {
        for (let x = 0; x < row.length; x++) {
            if (row[x] !== ' ') {
                coords.push({ x, y });
            }
        }
    });
    return {
        coords,
        width: Math.max(...pattern.map(r => r.length)),
        height: pattern.length
    };
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function SevenMonths() {
    const [progress, setProgress] = useState(0);
    const [showNote, setShowNote] = useState(false);
    const [isTrickling, setIsTrickling] = useState(false);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);
    const sparklesRef = useRef([]);
    const pointsRef = useRef([]);
    const trickleRef = useRef([]);
    const trickleStartRef = useRef(null);
    const gridInfoRef = useRef({ cols: 80, rows: 30, charWidth: 12, charHeight: 18, fontSize: 14, centerX: 0, centerY: 0 });

    const shapes = useRef({
        six: parsePattern(PATTERNS.six),
        heart: parsePattern(PATTERNS.heart),
        seven: parsePattern(PATTERNS.seven),
        message: parsePattern(PATTERNS.message)
    });

    // Scale shape to grid
    const scaleShape = (shapeName) => {
        const { cols, rows } = gridInfoRef.current;
        const shape = shapes.current[shapeName];
        const isMessage = shapeName === 'message';

        const scale = isMessage
            ? Math.min((cols * 0.9) / shape.width, (rows * 0.65) / shape.height)
            : Math.min((cols * 0.45) / shape.width, (rows * 0.5) / shape.height);

        const offsetX = (cols - shape.width * scale) / 2;
        const offsetY = (rows - shape.height * scale) / 2;

        return shape.coords.map(c => ({
            x: c.x * scale + offsetX,
            y: c.y * scale + offsetY
        }));
    };

    // Auto-play animation
    useEffect(() => {
        const totalDuration = 14000;
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const t = Math.min(elapsed / totalDuration, 1);

            setProgress(t * 100);

            if (t >= 1) {
                return;
            }

            requestAnimationFrame(animate);
        };

        const timeoutId = setTimeout(() => {
            requestAnimationFrame(animate);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    // Canvas setup
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';

            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);

            const fontSize = Math.max(12, Math.min(16, window.innerWidth / 50));
            const charWidth = fontSize * 0.6;
            const charHeight = fontSize * 1.2;
            const cols = Math.floor(window.innerWidth / charWidth);
            const rows = Math.floor(window.innerHeight / charHeight);
            const centerX = cols / 2;
            const centerY = rows / 2;

            gridInfoRef.current = { cols, rows, charWidth, charHeight, fontSize, centerX, centerY };

            // Background particles
            const bgParticles = [];
            for (let i = 0; i < 120; i++) {
                bgParticles.push({
                    x: Math.random() * cols,
                    y: Math.random() * rows,
                    speed: 0.1 + Math.random() * 0.25,
                    brightness: 0.03 + Math.random() * 0.05
                });
            }
            particlesRef.current = bgParticles;

            // Sparkles
            const sparkles = [];
            for (let i = 0; i < 25; i++) {
                sparkles.push({
                    x: Math.random() * cols,
                    y: Math.random() * rows,
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.03 + Math.random() * 0.04,
                    maxBrightness: 0.25 + Math.random() * 0.25
                });
            }
            sparklesRef.current = sparkles;

            // Initialize morph points
            const maxPoints = 500;
            const points = [];
            for (let i = 0; i < maxPoints; i++) {
                points.push({
                    x: centerX + (Math.random() - 0.5) * 20,
                    y: centerY + (Math.random() - 0.5) * 20,
                    targetX: centerX,
                    targetY: centerY,
                    char: getRandomChar(),
                    isPink: Math.random() < 0.18,
                    active: false
                });
            }
            pointsRef.current = points;
        };

        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    // Render loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        const render = () => {
            const { cols, rows, charWidth, charHeight, fontSize, centerX, centerY } = gridInfoRef.current;

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            ctx.font = `${fontSize}px "SF Mono", "Monaco", "Consolas", monospace`;
            ctx.textAlign = 'center';

            // Background matrix rain
            particlesRef.current.forEach((p) => {
                p.y = (p.y + p.speed * 0.04) % rows;
                const px = p.x * charWidth + charWidth / 2;
                const py = p.y * charHeight + charHeight / 2;
                ctx.fillStyle = `rgba(255, 255, 255, ${p.brightness})`;
                ctx.fillText(getRandomChar(), px, py);
            });

            // Draw sparkles
            sparklesRef.current.forEach((s, i) => {
                s.phase += s.speed;
                const brightness = s.maxBrightness * (0.5 + 0.5 * Math.sin(s.phase));
                if (brightness > 0.08) {
                    const px = s.x * charWidth + charWidth / 2;
                    const py = s.y * charHeight + charHeight / 2;
                    ctx.fillStyle = i % 3 === 0
                        ? `rgba(255, 182, 193, ${brightness})`
                        : `rgba(255, 255, 255, ${brightness})`;
                    ctx.fillText(getSparkleChar(), px, py);
                }
            });

            // Determine current shape based on progress
            // 0-25: six, 25-50: heart, 50-75: seven, 75-100: message
            let currentCoords;
            let localProgress;

            if (progress < 25) {
                currentCoords = scaleShape('six');
                localProgress = progress / 25;
            } else if (progress < 50) {
                const fromCoords = scaleShape('six');
                const toCoords = scaleShape('heart');
                localProgress = (progress - 25) / 25;
                const t = easeInOutCubic(localProgress);
                currentCoords = fromCoords.map((from, i) => {
                    const to = toCoords[i % toCoords.length];
                    return {
                        x: from.x + (to.x - from.x) * t,
                        y: from.y + (to.y - from.y) * t
                    };
                });
                // Add extra points from heart if it has more
                if (toCoords.length > fromCoords.length) {
                    for (let i = fromCoords.length; i < toCoords.length; i++) {
                        currentCoords.push({
                            x: centerX + (toCoords[i].x - centerX) * t,
                            y: centerY + (toCoords[i].y - centerY) * t
                        });
                    }
                }
            } else if (progress < 75) {
                const fromCoords = scaleShape('heart');
                const toCoords = scaleShape('seven');
                localProgress = (progress - 50) / 25;
                const t = easeInOutCubic(localProgress);
                currentCoords = fromCoords.map((from, i) => {
                    const to = toCoords[i % toCoords.length];
                    return {
                        x: from.x + (to.x - from.x) * t,
                        y: from.y + (to.y - from.y) * t
                    };
                });
            } else {
                const fromCoords = scaleShape('seven');
                const toCoords = scaleShape('message');
                localProgress = (progress - 75) / 25;
                const t = easeInOutCubic(localProgress);
                currentCoords = [];
                const maxLen = Math.max(fromCoords.length, toCoords.length);
                for (let i = 0; i < maxLen; i++) {
                    const from = fromCoords[i % fromCoords.length];
                    const to = toCoords[i % toCoords.length];
                    if (i < toCoords.length) {
                        currentCoords.push({
                            x: from.x + (to.x - from.x) * t,
                            y: from.y + (to.y - from.y) * t
                        });
                    }
                }
            }

            // Draw current shape (with trickle effect if active)
            if (!isTrickling) {
                currentCoords.forEach((coord, i) => {
                    const px = coord.x * charWidth + charWidth / 2;
                    const py = coord.y * charHeight + charHeight / 2;

                    const char = getRandomChar();
                    const isPink = Math.random() < 0.18;

                    if (isPink) {
                        ctx.fillStyle = 'rgba(255, 182, 193, 0.95)';
                    } else {
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                    }
                    ctx.fillText(char, px, py);
                });
            } else {
                // Trickle animation - characters fall away
                const now = Date.now();
                if (!trickleStartRef.current) {
                    trickleStartRef.current = now;
                    // Initialize trickle data for each character
                    trickleRef.current = currentCoords.map((coord, i) => ({
                        x: coord.x * charWidth + charWidth / 2,
                        y: coord.y * charHeight + charHeight / 2,
                        velocity: 0,
                        delay: Math.random() * 800, // Random delay before falling
                        char: getRandomChar(),
                        isPink: Math.random() < 0.18,
                        opacity: 1
                    }));
                }

                const elapsed = now - trickleStartRef.current;
                let allGone = true;

                trickleRef.current.forEach((particle) => {
                    if (elapsed < particle.delay) {
                        // Still waiting to fall
                        allGone = false;
                        if (particle.isPink) {
                            ctx.fillStyle = `rgba(255, 182, 193, ${particle.opacity})`;
                        } else {
                            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                        }
                        ctx.fillText(particle.char, particle.x, particle.y);
                    } else {
                        // Apply gravity
                        particle.velocity += 0.5;
                        particle.y += particle.velocity;
                        particle.opacity -= 0.015;

                        if (particle.opacity > 0 && particle.y < window.innerHeight + 50) {
                            allGone = false;
                            if (particle.isPink) {
                                ctx.fillStyle = `rgba(255, 182, 193, ${particle.opacity})`;
                            } else {
                                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                            }
                            ctx.fillText(particle.char, particle.x, particle.y);
                        }
                    }
                });

                if (allGone && !showNote) {
                    setShowNote(true);
                }
            }

            // Draw "click me" box (only when message is showing - progress >= 75)
            if (progress >= 75 && !showNote && !isTrickling) {
                const boxX = cols * 0.78 * charWidth;
                const boxY = rows * 0.72 * charHeight;
                const pulse = 0.7 + 0.3 * Math.sin(Date.now() / 300);

                ctx.fillStyle = `rgba(255, 182, 193, ${pulse})`;
                ctx.font = `${fontSize * 1.1}px "SF Mono", "Monaco", "Consolas", monospace`;
                ctx.fillText("[ click me ]", boxX, boxY);
            }

            animationRef.current = requestAnimationFrame(render);
        };

        animationRef.current = requestAnimationFrame(render);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [progress, showNote, isTrickling]);

    const handleClick = (e) => {
        if (progress >= 75 && !showNote && !isTrickling) {
            const { cols, rows, charWidth, charHeight } = gridInfoRef.current;
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const boxX = cols * 0.78 * charWidth;
            const boxY = rows * 0.72 * charHeight;

            if (Math.abs(x - boxX) < 100 && Math.abs(y - boxY) < 40) {
                setIsTrickling(true);
            }
        }
    };

    return (
        <div className="seven-months-page">
            <canvas
                ref={canvasRef}
                className="ascii-canvas"
                onClick={handleClick}
            />

            {showNote && (
                <div className="note-overlay">
                    <div className="note-box">
                        <p className="note-text">{LOVE_NOTE}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SevenMonths;
