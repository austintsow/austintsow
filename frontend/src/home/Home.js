import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Clock from "./Clock";
import BottomNav from "../components/BottomNav";

function Home() {
    const [mainTextVisible, setMainTextVisible] = useState(false);

    useEffect(() => {
        document.body.classList.add("home-scroll-lock");
        
        // Show content immediately
        setTimeout(() => {
            setMainTextVisible(true);
        }, 100);

        return () => {
            document.body.classList.remove("home-scroll-lock");
        };
    }, []);

    return (
        <div className="home">
            <header className={mainTextVisible ? "fade-in visible" : "fade-in"}>
                <div className="logo">
                    <Link to="/">austin tsow</Link>
                </div>
                <div className="top-clock">
                    <Clock />
                </div>
            </header>
            <main>
                <div className={mainTextVisible ? "intro-section fade-in visible" : "intro-section fade-in"}>
                    <div className="intro-large">
                        <h1>
                            hi, i'm <span className="highlight">austin</span> — a software engineer exploring ai, machine learning, and web3 to create systems that last.
                        </h1>
                    </div>
                    <div className="intro-description">
                        <p>
                            i'm interested in building across the stack, from full-stack platforms and serverless pipelines to blockchain payment research and applied ai. i focus on creating scalable systems and intuitive user experiences while exploring how emerging technologies can be applied to solve real-world problems.
                        </p>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}

export default Home;