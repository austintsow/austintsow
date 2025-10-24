import React, { useState, useEffect } from "react";
import "./Home.css";

const emojiOptions = [
    { emoji: "🐕", label: "dog", fact: "obi's my best buddy for walks, naps, and everything in between." },
    { emoji: "🍵", label: "matcha", fact: "my go to! i promise you i am not performative..." },
    { emoji: "💻", label: "laptop", fact: "my all-in-one spot for coding, music, and ideas." },
    { emoji: "🌲", label: "pine tree", fact: "nothing feels more like home than the pnw outdoors." },
    { emoji: "🥾", label: "hiking boots", fact: "happiest when i'm out on the trails." },
    { emoji: "🏃", label: "running", fact: "currently training for a half marathon!" },
    { emoji: "🍱", label: "bento", fact: "i'm a self-proclaimed foodie sharing meals on ", factLink: { text: "beli", url: "https://app.beliapp.com/lists/tsow" }, factEnd: "." },
    { emoji: "🔗", label: "web3", fact: "curious about how web3 can reshape how we connect and share value." },
    { emoji: "✈️", label: "travel", fact: "always excited to see new places and cultures." }
];

function Home() {
    const [mainTextVisible, setMainTextVisible] = useState(false);
    const [randomEmoji, setRandomEmoji] = useState({ emoji: "🐕", label: "dog", fact: "" });

    useEffect(() => {
        // Select random emoji on load
        const randomIndex = Math.floor(Math.random() * emojiOptions.length);
        setRandomEmoji(emojiOptions[randomIndex]);
        
        // Show content immediately
        setTimeout(() => {
            setMainTextVisible(true);
        }, 100);
    }, []);

    const pills = [
        { id: 1, text: "in/tsow", color: "blue", link: "https://www.linkedin.com/in/austintsow/" },
        { id: 2, text: "gh/austintsow", color: "gray", link: "https://github.com/austintsow" },
        { id: 3, text: "beli/tsow", color: "beli", link: "https://app.beliapp.com/lists/tsow" },
        { id: 4, text: "austin@tsow.com", color: "yellow", link: "mailto:austin@tsow.com" }
    ];

    return (
        <div className="home">
            <main>
                <div className={mainTextVisible ? "intro-section fade-in visible" : "intro-section fade-in"}>
                    <div className="intro-left">
                        <h1 className="intro-name">
                            austin tsow<span className="wave-container">.<span className="wave-emoji">{randomEmoji.emoji}</span></span>
                        </h1>
                        <p className="intro-subtitle">
                            cs @ gonzaga, looking for new grad swe roles
                        </p>
                        <p className="emoji-fact">
                            <span className="emoji-fact-emoji">{randomEmoji.emoji}</span>{" "}
                            {randomEmoji.fact}
                            {randomEmoji.factLink && (
                                <>
                                    <a
                                        href={randomEmoji.factLink.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="emoji-fact-link"
                                    >
                                        {randomEmoji.factLink.text}
                                    </a>
                                    {randomEmoji.factEnd}
                                </>
                            )}
                        </p>
                    </div>
                    <div className="intro-right">
                        <div className="pills-section">
                            {pills.map((pill, index) => (
                                pill.link ? (
                                    <a
                                        key={pill.id}
                                        href={pill.link}
                                        target={pill.link.startsWith('mailto:') || pill.link.startsWith('/') ? '_self' : '_blank'}
                                        rel={pill.link.startsWith('mailto:') || pill.link.startsWith('/') ? '' : 'noopener noreferrer'}
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
                                i build full stack platforms and ai systems. currently building <span className="highlight" style={{ animationDelay: '1.6s' }}>ai-powered</span> applications and researching <span className="highlight" style={{ animationDelay: '2s' }}>zero-fee web3</span> payment protocols.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;