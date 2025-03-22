import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./About.css";

function About() {
    const text = [
        "i'm a builder at heart, always drawn to the intersection of technology and problem-solving. my journey started in sammamish, just thirty minutes east from seattle, where i grew up surrounded by a mix of innovation and nature. now, i'm an undergraduate student at gonzaga university, studying computer science with a concentration in software security. i focus on ai-driven applications, blending machine learning to create intuitive, efficient solutions. outside of software, i'm deeply interested in web3, particularly in decentralized finance (defi) and solana's role in building a more scalable, permissionless financial ecosystem. the idea of rearchitecting trust and ownership on-chain is something i continue to explore.",
        "when i'm not working on projects, you'll find me outside. i spend weekends hiking in the pacific northwest, exploring trails across washington, always chasing new views and elevation gains. running has become a constant, whether training for a race or just clearing my mind on a long stretch of road. movement keeps me grounded, a balance to the hours spent typing on my keyboard.",
        "i also love cooking—experimenting with flavors, refining techniques, and bringing people together over food. it's a creative outlet, much like design and development, where precision meets intuition. whether it's perfecting a dish or fine-tuning a piece of code, i'm always iterating, always learning. beyond cooking, i enjoy exploring new restaurants, trying unique dishes, and experiencing different cuisines (find me on beli - on contact page). whether it's a hidden ramen spot, a local café, or an experimental tasting menu, i love discovering new flavors and the stories behind them."
    ];

    const generateWordDelays = (words) => {
        const shuffledIndexes = [...Array(words.length).keys()].sort(() => Math.random() - 0.5);
        let delay = 0;
        let batchSize = 1;
        const wordDelays = new Array(words.length).fill(0);

        for (let i = 0; i < words.length; i += batchSize) {
            const currentDelay = delay;
            shuffledIndexes.slice(i, i + batchSize).forEach(index => {
                wordDelays[index] = currentDelay;
            });

            delay += 0.5;
            batchSize = Math.min(batchSize * 2, 8);
        }

        return wordDelays;
    };

    // Memoized full & condensed code to avoid re-creation on every render
    const fullCode = useMemo(() => `
def applyied():
    """ 
    - ai platform optimizing job applications. 
    - uses ml to tailor resumes & boost ats visibility
    - automates job aggregation & application tracking
    """
    pass

def ai_recipe_app():
    """ 
    - ai-driven recipe generator for college students.
    - uses gpt-3.5 to suggest meals based on ingredients
    - supports dietary preferences & budget-friendly planning
    """
    pass

def gonzaga_voice_assistant():
    """ 
    - nlp-powered voice assistant for gonzaga.edu.
    - answers student queries using web scraping & nlp
    - integrates real-time data on courses & campus info
    """
    pass

def showcase_projects():
    """ a quick highlight of my top ai-driven projects. """
    applyied()
    ai_recipe_app()
    gonzaga_voice_assistant()

showcase_projects()
    `, []);

    const condensedCode = useMemo(() => `
def applyied():
    """ ai job platform """
    pass

def ai_recipe_app():
    """ ai recipe generator """
    pass

def gonzaga_voice_assistant():
    """ nlp voice assistant """
    pass

def showcase_projects():
    """ my top ai-driven builds """
    applyied()
    ai_recipe_app()
    gonzaga_voice_assistant()

showcase_projects()
    `, []);

    // Detect screen size and update code content
    const [typedCode, setTypedCode] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        let index = 0;
        const selectedCode = isMobile ? condensedCode : fullCode;
        const interval = setInterval(() => {
            if (index < selectedCode.length) {
                setTypedCode(selectedCode.substring(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [isMobile, condensedCode, fullCode]);

    return (
        <div className="about">
            <header>
                <div className="logo">
                    <Link to="/home-loaded">austin tsow</Link>
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
            <main className="about-content">
                {/* Left: Fading Text Section */}
                <motion.section 
                    className="about-text"
                    initial={{ opacity: 0, color: "rgba(128, 128, 128, 0)" }} 
                    animate={{ opacity: 1, color: "rgba(195, 195, 195)" }} 
                    transition={{ duration: 1.5 }}
                >
                    {text.map((paragraph, pIndex) => {
                        const words = paragraph.split(" ");
                        const wordDelays = generateWordDelays(words);

                        return (
                            <motion.p key={pIndex} style={{ marginBottom: "20px" }}>
                                {words.map((word, wIndex) => (
                                    <motion.span
                                        key={wIndex}
                                        initial={{ color: "rgb(195, 195, 195)" }}
                                        animate={{ color: "rgba(0, 0, 0, 1)" }}
                                        transition={{ duration: 0.8, delay: wordDelays[wIndex] }}
                                        style={{ display: "inline-block", marginRight: "5px" }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.p>
                        );
                    })}
                </motion.section>

                {/* Right: Mini IDE Section */}
                <motion.div 
                    className="ide-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <SyntaxHighlighter language="python" style={vscDarkPlus} className="ide-code">
                        {typedCode}
                    </SyntaxHighlighter>
                </motion.div>
            </main>
            <footer className="contact-footer">
                <div className="copyright">
                    © 2025 Austin Tsow
                </div>
            </footer>
        </div>
    );
}

export default About;