import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Clock from "./Clock";

function Home() {
    const [dots, setDots] = useState("");

    useEffect(() => {
        document.body.classList.add("home-scroll-lock");

        return () => {
            document.body.classList.remove("home-scroll-lock");
        };
    }, []);

    // Loading animation for status: updating...
    useEffect(() => {
        const dotCycle = ["", ".", "..", "..."];
        let index = 0;

        const interval = setInterval(() => {
            setDots(dotCycle[index]);
            index = (index + 1) % dotCycle.length;
        }, 500); // Change every 500ms

        return () => clearInterval(interval);
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
                            <a href="/AustinTsow2025.pdf" target="_blank" rel="noopener noreferrer">
                                resume
                            </a>
                        </li>
                        <li><Link to="/about">about</Link></li>
                        <li><Link to="/contact">contact</Link></li>
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
                    [status: updating{dots}]
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