import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./About.css";

function About() {
    const text = [
        "i'm a builder at heart, always drawn to the intersection of technology and problem-solving. my journey started in sammamish, just thirty minutes east from seattle, where i grew up surrounded by a mix of innovation and nature. now, i'm an undergraduate student at gonzaga university, studying computer science with a concentration in software security. my passion lies in building ai-driven applications that solve real problems—from optimizing job applications with machine learning to creating voice assistants that understand natural language. i'm currently researching zero-fee blockchain payment systems, exploring how we can bridge web3 wallets with traditional banking through solidity smart contracts and off-chain settlement flows. the potential to rearchitect financial infrastructure using decentralized protocols, especially on solana's high-throughput network, fascinates me daily.",
        "when i'm not coding or researching blockchain protocols, you'll find me outside living an active life. i spend weekends hiking in the pacific northwest, exploring trails across washington, always chasing new views and elevation gains. running has become a constant, whether training for a race or just clearing my mind on a long stretch of road. but my newest obsession is pickleball! i'm rated a 5.1 DUPR... in my dreams, at least. there's something addictive about the perfect third shot drop or a well-executed kitchen rally — and who knows, if i keep improving, maybe i'll actually earn that 5.1 one day.",
        "food is another passion that consumes my free time. i love cooking—experimenting with flavors, refining techniques, and bringing people together over shared meals. it's a creative outlet, much like software development, where precision meets intuition and every iteration teaches you something new. beyond cooking, i'm constantly exploring new restaurants, seeking out unique dishes, and experiencing different cuisines. you can actually follow my food journey on beli (check my contact page for the link), i document everything... well most things besides fast food unless i'm blown away. whether it's discovering a perfect bowl of taiwanese beef noodle soup, trying a new korean bbq joint, or diving into an omakase experience, i'm always chasing the next great meal and the stories behind them."
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
class Projects:
    def get_latest_work(self) -> List[str]:
        """
        a snapshot of my latest projects.
        Time: O(passion) | Space: O(impact)
        """
        latest_work = []
        
        # ai-powered job application platform
        if self.is_building_applyied():
            latest_work.append("ai-driven resume optimization")
        
        # zero-fee blockchain payment systems
        if self.is_researching_web3_payments():
            latest_work.append("zero-fee USDC to USD bank transfers")
            
        return latest_work
    
    def is_building_applyied(self) -> bool:
        return True  # actively developing
        
    def is_researching_web3_payments(self) -> bool:
        return True  # exploring solidity and off-chain flows

# see what im up to
austin = Projects()
work = austin.get_latest_work()
print(f"currently building: {work}")
    `, []);

    const condensedCode = useMemo(() => `
class Projects:
    def get_latest_work(self) -> List[str]:
        """my latest projects."""
        latest = []
        
        # ai job platform
        if self.is_building_applyied():
            latest.append("resume optimization")
        
        # web3 payments research
        if self.is_researching_web3_payments():
            latest.append("crypto-to-fiat transfers")
            
        return latest

# see what im up to
austin = Projects()
print(austin.get_latest_work())
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
                            <a href="/AustinTsow2026.pdf" download="AustinTsow2026.pdf" target="_blank" rel="noopener noreferrer">
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
                    <div className="ide-header">
                        <span className="ide-dot red"></span>
                        <span className="ide-dot yellow"></span>
                        <span className="ide-dot green"></span>
                    </div>
                    <div className="ide-body">
                        {/* Sizer to set the container height */}
                        <SyntaxHighlighter language="python" style={vscDarkPlus} className="ide-sizer">
                            {isMobile ? condensedCode : fullCode}
                        </SyntaxHighlighter>
                        {/* Visible typing animation */}
                        <SyntaxHighlighter language="python" style={vscDarkPlus} className="ide-code">
                            {typedCode}
                        </SyntaxHighlighter>
                    </div>
                </motion.div>
            </main>
            <footer className="contact-footer">
                <div className="copyright">
                    © 2026 Austin Tsow
                </div>
            </footer>
        </div>
    );
}

export default About;