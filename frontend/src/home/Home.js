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
        { id: 3, text: "beli/tsow", color: "beli", link: "https://app.beliapp.com/lists/tsow" },
        { id: 4, text: "ig/a1stn", color: "purple", link: "https://www.instagram.com/a1stn/" },
        { id: 5, text: "austin@tsow.com", color: "yellow", link: "mailto:austin@tsow.com" },
        { id: 6, text: "gh/austintsow", color: "gray", link: "https://github.com/austintsow" }
    ];

    return (
        <div className="home">
            <main>
                <div className={mainTextVisible ? "intro-section fade-in visible" : "intro-section fade-in"}>
                    <div className="intro-large">
                        <h1>
                            Hi, I'm <span className="highlight">Austin</span> — I build, design, and experiment with technology
                        </h1>
                    </div>
                    <div className="intro-description">
                        <p>
                            I'm passionate about AI, machine learning, Web3, and software engineering. From creating full-stack platforms and serverless pipelines to exploring blockchain payments and applied AI, I love working at the intersection of innovation and impact. My focus is on building scalable systems, intuitive user experiences, and exploring how emerging tech can solve real-world problems.
                        </p>
                    </div>
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
                </div>
            </main>
            <BottomNav />
        </div>
    );
}

export default Home;