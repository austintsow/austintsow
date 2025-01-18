import React, { useEffect } from "react";
import "./Home.css";
import Clock from "./Clock";

function Home() {
    useEffect(() => {
        // Add class to lock scrolling when Home is mounted
        document.body.classList.add("home-scroll-lock");

        // Remove the class when Home is unmounted
        return () => {
            document.body.classList.remove("home-scroll-lock");
        };
    }, []);

    return (
        <div className="home">
            <header>
                <div className="logo">austin tsow</div>
                <nav>
                    <ul>
                        <li>projects</li>
                        <li>about</li>
                        <li>contact</li>
                    </ul>
                </nav>
            </header>
            <main>
                <div className="main-text">
                    <h1 className="hello">
                        hi, my <br /> name is <span className="highlight">austin</span>
                    </h1>
                </div>
                <div className="redesign-text">
                    [status: redesign process]
                </div>
            </main>
            <footer>
                <div className="blog">blog</div>
                <Clock />
            </footer>
        </div>
    );
}

export default Home;