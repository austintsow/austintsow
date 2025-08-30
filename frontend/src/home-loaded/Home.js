import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Clock from "./Clock";

function Home() {
    const [contentVisible, setContentVisible] = useState(false);
    const firstPart = "hi, my";
    const secondPart = "name is ";
    const thirdPart = "austin";

    useEffect(() => {
        document.body.classList.add("home-scroll-lock");
        
        setTimeout(() => {
            setContentVisible(true);
        }, 100);
        
        return () => {
            document.body.classList.remove("home-scroll-lock");
        };
    }, []);

    return (
        <div className="home">
            <header>
                <div className="logo">
                    <Link to="/">austin tsow</Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href="/AustinTsow2026.pdf" target="_blank" rel="noopener noreferrer">
                                resume
                            </a>
                        </li>
                        <li><Link to="/about">about</Link></li>
                        <li><Link to="/contact">contact</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <div className={`main-text fade-in ${contentVisible ? 'visible' : ''}`}>
                    <h1 className="hello">
                        {firstPart}
                        <br />
                        {secondPart}
                        <span className="highlight">{thirdPart}</span>
                    </h1>
                </div>
                <div className="center-text">
                    <div className={contentVisible ? "welcome-static visible" : "welcome-static hidden-welcome"}>
                        welcome.
                    </div>
                </div>
            </main>
            <footer>
                <div className={`applyied fade-in ${contentVisible ? 'visible' : ''}`}>
                    <a href="http://applyied.com" target="_blank" rel="noopener noreferrer">applyied</a>
                </div>
                <div className={`fade-in ${contentVisible ? 'visible' : ''}`}>
                    <Clock />
                </div>
            </footer>
        </div>
    );
}

export default Home;