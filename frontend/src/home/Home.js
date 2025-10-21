import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Clock from "./Clock";

function Home() {
    const [centerText, setCenterText] = useState("");
    const [mainTextVisible, setMainTextVisible] = useState(false);
    const [showCenterCaret, setShowCenterCaret] = useState(true);

    useEffect(() => {
        document.body.classList.add("home-scroll-lock");
        let isMounted = true;

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const type = async (text) => {
            for (let i = 0; i < text.length; i++) {
                if (!isMounted) return;
                setCenterText((prev) => prev + text[i]);
                await sleep(120);
            }
        };

        const backspace = async (count) => {
            for (let i = 0; i < count; i++) {
                if (!isMounted) return;
                setCenterText((prev) => prev.slice(0, -1));
                await sleep(80);
            }
        };

        const runAnimation = async () => {
            await sleep(500); // Initial pause
            await type("hi...");
            await sleep(1000);
            await backspace(5);
            await sleep(300);
            await type("my name is austin");
            await sleep(1000);
            await backspace(18);
            await sleep(300);
            await type("welcome.");
            await sleep(500);
            if (isMounted) {
                setShowCenterCaret(false);
                setMainTextVisible(true);
            }
        };

        runAnimation();

        return () => {
            isMounted = false;
            document.body.classList.remove("home-scroll-lock");
        };
    }, []);

    return (
        <div className="home">
            <header className={mainTextVisible ? "fade-in visible" : "fade-in"}>
                <div className="logo">
                    <Link to="/">austin tsow</Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href="/AustinTsow2026.pdf" download="AustinTsow2026.pdf" target="_blank" rel="noopener noreferrer">
                                resume
                            </a>
                        </li>
                        <li><Link to="/about">about</Link></li>
                        <li><Link to="/contact">contact</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <div className="center-text">
                    {centerText}
                    {showCenterCaret && <span className="caret">|</span>}
                </div>
                <div className={mainTextVisible ? "main-text fade-in visible" : "main-text fade-in"}>
                    <h1 className="hello">
                        hi, my<br />name is <span className="highlight">austin</span>
                    </h1>
                </div>
            </main>
            <footer className={mainTextVisible ? "fade-in visible" : "fade-in"}>
                <div className="applyied">
                    <a href="http://applyied.com" target="_blank" rel="noopener noreferrer">applyied</a>
                </div>
                <Clock />
            </footer>
        </div>
    );
}

export default Home;