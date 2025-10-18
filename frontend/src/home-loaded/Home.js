import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Clock from "./Clock";
import BottomNav from "../components/BottomNav";

function Home() {
    const [contentVisible, setContentVisible] = useState(false);

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
            <header className={contentVisible ? "fade-in visible" : "fade-in"}>
                <div className="logo">
                    <Link to="/">austin tsow</Link>
                </div>
                <div className="top-clock">
                    <Clock />
                </div>
            </header>
            <main>
                <div className={contentVisible ? "intro-section fade-in visible" : "intro-section fade-in"}>
                    <div className="intro-large">
                        <h1>
                            hi, i'm <span className="highlight">austin</span> — a software engineer exploring ai, machine learning, web3, and full-stack development to turn ideas into scalable, impactful systems.
                        </h1>
                    </div>
                    <div className="intro-description">
                        <p>
                            i'm passionate about ai, machine learning, web3, and software engineering. from creating full-stack platforms and serverless pipelines to exploring blockchain payments and applied ai, i love working at the intersection of innovation and impact. my focus is on building scalable systems, intuitive user experiences, and exploring how emerging tech can solve real-world problems.
                        </p>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}

export default Home;