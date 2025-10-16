import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./About.css";

function About() {
    const text = [
        "i'm a builder at heart, always drawn to the intersection of technology and problem-solving. my journey started in sammamish, just thirty minutes east from seattle, where i grew up surrounded by a mix of innovation and nature. now, i'm an undergraduate student at gonzaga university, studying computer science with a concentration in software security. my passion lies in building ai-driven applications that solve real problems—from optimizing job applications with machine learning to creating voice assistants that understand natural language. i'm currently researching zero-fee blockchain payment systems, exploring how we can bridge web3 wallets with traditional banking through solidity smart contracts and off-chain settlement flows. the potential to rearchitect financial infrastructure using decentralized protocols, especially on solana's high-throughput network, fascinates me daily.",
        "when i'm not coding or researching blockchain protocols, you'll find me outside living an active life. i spend weekends hiking in the pacific northwest, exploring trails across washington, always chasing new views and elevation gains. running has become a constant, whether training for a race or just clearing my mind on a long stretch of road. but my newest obsession is pickleball—i've worked my way up to a 4.7 dupr rating, loving the strategic positioning and split-second decision making the game demands. there's something addictive about the perfect third shot drop or a well-executed kitchen rally. movement keeps me grounded, a balance to the hours spent deep in code and crypto whitepapers.",
        "food is another passion that consumes my free time. i love cooking—experimenting with flavors, refining techniques, and bringing people together over shared meals. it's a creative outlet, much like software development, where precision meets intuition and every iteration teaches you something new. beyond cooking, i'm constantly exploring new restaurants, seeking out unique dishes, and experiencing different cuisines. you can actually follow my food journey on beli (@tsow)—i document literally all the spots i go to... Well besides the fast food ones unless i'm blown away. whether it's discovering a perfect bowl of taiwanese beef noodle soup, trying a new korean bbq joint, or diving into an omakase experience, i'm always chasing the next great meal and the stories behind them."
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

            delay += 1.2;
            batchSize = Math.min(batchSize * 2, 8);
        }

        return wordDelays;
    };

    // Memoized full & condensed code to avoid re-creation on every render
    const fullCode = useMemo(() => `
class Solution:
    def build_projects(self) -> List[str]:
        """
        my most recent projects - feel free to scroll once fully loaded
        building practical solutions for real-world challenges
        
        time: O(67) | space: O(clash_royale)
        """
        projects = []
        
        # blockchain payment optimization
        if self.research_zero_fee_transfers():
            projects.append("solidity contracts + off-chain flows")
        
        # ai-powered job platform  
        ml_model = self.train_ats_optimizer()
        if ml_model.accuracy > 0.85:
            projects.append("resume tailoring + job aggregation")
            
        return projects
    
    def research_zero_fee_transfers(self) -> bool:
        return True  # currently researching blockchain protocols
        
    def train_ats_optimizer(self):
        return type('model', (), {'accuracy': 0.92})()

# test solution
austin = Solution()
result = austin.build_projects()
print(f"most recent interesting projects: {len(result)}")
    `, []);

    const condensedCode = useMemo(() => `
class Solution:
    def build_projects(self) -> List[str]:
        """
        Recent projects - scroll once loaded.
        Time: O(late_nights) | Space: O(coffee_cups)
        """
        projects = []
        
        # blockchain research
        if self.research_zero_fee_transfers():
            projects.append("solidity + off-chain")
        
        # ai job platform  
        if self.train_ats_optimizer().accuracy > 0.85:
            projects.append("resume optimization")
            
        return projects
    
    def research_zero_fee_transfers(self) -> bool:
        return True  # blockchain protocols research

# test solution
austin = Solution()
result = austin.build_projects()
print(f"Most recent interesting projects: {len(result)}") # Output: 2
    `, []);

    // Detect screen size and update code content
    const [typedCode, setTypedCode] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [userHasScrolled, setUserHasScrolled] = useState(false);
    const codeContainerRef = useRef(null);
    const lastScrollTop = useRef(0);

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
        
        // Reset user scroll state when code changes
        setUserHasScrolled(false);
        
        const interval = setInterval(() => {
            if (index < selectedCode.length) {
                setTypedCode(selectedCode.substring(0, index + 1));
                index++;
                
                // Only auto-scroll if user hasn't manually scrolled
                if (!userHasScrolled && codeContainerRef.current) {
                    requestAnimationFrame(() => {
                        const element = codeContainerRef.current?.querySelector('pre');
                        if (element) {
                            lastScrollTop.current = element.scrollHeight;
                            element.scrollTop = element.scrollHeight;
                        }
                    });
                }
            } else {
                clearInterval(interval);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [isMobile, condensedCode, fullCode]); // Removed userHasScrolled dependency

    // Handle scroll behavior like LLM interfaces
    useEffect(() => {
        let isUserScrolling = false;
        
        const checkScrollPosition = (element) => {
            const currentScrollTop = element.scrollTop;
            const maxScrollTop = element.scrollHeight - element.clientHeight;
            const isAtBottom = Math.abs(currentScrollTop - maxScrollTop) <= 5; // 5px tolerance
            
            if (isAtBottom && !isUserScrolling) {
                setUserHasScrolled(false);
            } else {
                setUserHasScrolled(true);
            }
        };

        const handleWheel = (e) => {
            // Immediately stop auto-scroll when user tries to scroll
            isUserScrolling = true;
            setUserHasScrolled(true);
            
            // Clear the flag after a short delay
            setTimeout(() => {
                isUserScrolling = false;
                const element = codeContainerRef.current?.querySelector('pre');
                if (element) {
                    checkScrollPosition(element);
                }
            }, 100);
        };

        const handleScroll = (e) => {
            if (!isUserScrolling) {
                const element = e.target;
                checkScrollPosition(element);
            }
        };

        const handleTouchStart = () => {
            isUserScrolling = true;
            setUserHasScrolled(true);
        };

        const handleTouchEnd = () => {
            setTimeout(() => {
                isUserScrolling = false;
                const element = codeContainerRef.current?.querySelector('pre');
                if (element) {
                    checkScrollPosition(element);
                }
            }, 100);
        };

        if (codeContainerRef.current) {
            const element = codeContainerRef.current.querySelector('pre');
            if (element) {
                element.addEventListener('scroll', handleScroll);
                element.addEventListener('wheel', handleWheel, { passive: true });
                element.addEventListener('touchstart', handleTouchStart);
                element.addEventListener('touchend', handleTouchEnd);
                
                return () => {
                    element.removeEventListener('scroll', handleScroll);
                    element.removeEventListener('wheel', handleWheel);
                    element.removeEventListener('touchstart', handleTouchStart);
                    element.removeEventListener('touchend', handleTouchEnd);
                };
            }
        }
    }, []);

    return (
        <div className="about">
            <main className="main-content">
                <div className="hero-section">
                    <div className="intro-text">
                        <Link to="/" className="back-link">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6.5 3L2 8l4.5 5M2.5 8h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>back home</span>
                        </Link>
                        <h1 className="page-title">About Me</h1>
                        <p className="page-subtitle">
                            builder, researcher, always curious about what's next
                        </p>
                    </div>
                    
                    <div className="content-layout">
                        {/* First Paragraph - Builder/Tech Focus */}
                        <motion.section 
                            className="intro-paragraph"
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {(() => {
                                const words = text[0].split(" ");
                                const wordDelays = generateWordDelays(words);
                                return (
                                    <motion.div className="story-paragraph">
                                        {words.map((word, wIndex) => (
                                            <motion.span
                                                key={wIndex}
                                                initial={{ color: "#c3c3c3" }}
                                                animate={{ color: "#4a4a4a" }}
                                                transition={{ duration: 1.2, delay: wordDelays[wIndex] * 0.15 }}
                                                style={{ display: "inline-block", marginRight: "5px" }}
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                );
                            })()}
                        </motion.section>

                        {/* Code Showcase Section */}
                        <motion.div 
                            className="code-showcase"
                            ref={codeContainerRef}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <div className="code-header">
                                <div className="window-controls">
                                    <span className="control red"></span>
                                    <span className="control yellow"></span>
                                    <span className="control green"></span>
                                </div>
                                <span className="file-name">austin_projects.py</span>
                            </div>
                            <SyntaxHighlighter language="python" style={vscDarkPlus} className="code-content">
                                {typedCode}
                            </SyntaxHighlighter>
                        </motion.div>

                        {/* Life & Hobbies Section */}
                        <motion.section 
                            className="life-section"
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            {text.slice(1).map((paragraph, pIndex) => {
                                const words = paragraph.split(" ");
                                const wordDelays = generateWordDelays(words);

                                return (
                                    <motion.div key={pIndex + 1} className="story-paragraph">
                                        {words.map((word, wIndex) => (
                                            <motion.span
                                                key={wIndex}
                                                initial={{ color: "#c3c3c3" }}
                                                animate={{ color: "#4a4a4a" }}
                                                transition={{ duration: 1.2, delay: (wordDelays[wIndex] * 0.15) + (pIndex * 3) }}
                                                style={{ display: "inline-block", marginRight: "5px" }}
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                );
                            })}
                        </motion.section>
                    </div>
                    
                </div>
            </main>
        </div>
    );
}

export default About;