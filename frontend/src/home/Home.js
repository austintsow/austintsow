import React, { useEffect, useState } from "react";
import "./Home.css";
import BottomNav from "../components/BottomNav";

function Home() {
    const [mainTextVisible, setMainTextVisible] = useState(false);

    useEffect(() => {
        // Show content immediately
        setTimeout(() => {
            setMainTextVisible(true);
        }, 100);
    }, []);

    const pills = [
        { id: 1, text: "open to work", color: "green", link: null },
        { id: 2, text: "in/tsow", color: "blue", link: "https://www.linkedin.com/in/austintsow/" },
        { id: 3, text: "gh/austintsow", color: "gray", link: "https://github.com/austintsow" },
        { id: 4, text: "beli/tsow", color: "beli", link: "https://app.beliapp.com/lists/tsow" },
        { id: 5, text: "austin@tsow.com", color: "yellow", link: "mailto:austin@tsow.com" },
        { id: 6, text: "ig/a1stn", color: "purple", link: "https://www.instagram.com/a1stn/" }
    ];

    return (
        <div className="home">
            <main>
                <div className={mainTextVisible ? "intro-section fade-in visible" : "intro-section fade-in"}>
                    <div className="intro-left">
                        <h1 className="intro-name">
                            austin tsow<span className="wave-container">.<span className="wave-emoji">👋</span></span>
                        </h1>
                        <p className="intro-subtitle">
                            i build, design, and experiment with technology, creating full stack platforms and ai systems while exploring what's next
                        </p>
                    </div>
                    <div className="intro-right">
                        <div className="pills-section">
                            {pills.map((pill, index) => (
                                pill.link ? (
                                    <a
                                        key={pill.id}
                                        href={pill.link}
                                        target={pill.link.startsWith('mailto:') ? '_self' : '_blank'}
                                        rel={pill.link.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                                        className={`pill pill-${pill.color}`}
                                        style={{ animationDelay: `${index * 0.2}s` }}
                                    >
                                        <span className="pill-dot"></span>
                                        <span className="pill-text">{pill.text}</span>
                                    </a>
                                ) : (
                                    <div
                                        key={pill.id}
                                        className={`pill pill-${pill.color}`}
                                        style={{ animationDelay: `${index * 0.2}s` }}
                                    >
                                        <span className="pill-dot"></span>
                                        <span className="pill-text">{pill.text}</span>
                                    </div>
                                )
                            ))}
                        </div>
                        <div className="intro-description">
                            <p>
                                i'm passionate about ai, machine learning, web3, and software engineering. my focus is on building scalable systems and intuitive experiences while exploring how emerging tech can solve real world problems. i enjoy working at the intersection of innovation and impact.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}

export default Home;