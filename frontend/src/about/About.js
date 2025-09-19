import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./About.css";

function About() {
    const text = [
        "i'm a builder at heart, always drawn to the intersection of technology and problem-solving. my journey started in sammamish, just thirty minutes east from seattle, where i grew up surrounded by a mix of innovation and nature. now, i'm an undergraduate student at gonzaga university, studying computer science with a concentration in software security. my passion lies in building ai-driven applications that solve real problems—from optimizing job applications with machine learning to creating voice assistants that understand natural language. i'm currently researching zero-fee blockchain payment systems, exploring how we can bridge web3 wallets with traditional banking through solidity smart contracts and off-chain settlement flows. the potential to rearchitect financial infrastructure using decentralized protocols, especially on solana's high-throughput network, fascinates me daily.",
        "when i'm not coding or researching blockchain protocols, you'll find me outside living an active life. i spend weekends hiking in the pacific northwest, exploring trails across washington, always chasing new views and elevation gains. running has become a constant, whether training for a race or just clearing my mind on a long stretch of road. but my newest obsession is pickleball—i've worked my way up to a 4.7 dupr rating, loving the strategic positioning and split-second decision making the game demands. there's something addictive about the perfect third shot drop or a well-executed kitchen rally. movement keeps me grounded, a balance to the hours spent deep in code and crypto whitepapers.",
        "food is another passion that consumes my free time. i love cooking—experimenting with flavors, refining techniques, and bringing people together over shared meals. it's a creative outlet, much like software development, where precision meets intuition and every iteration teaches you something new. beyond cooking, i'm constantly exploring new restaurants, seeking out unique dishes, and experiencing different cuisines. you can actually follow my food journey on beli (check my contact page for the link)—i document everything from hidden ramen spots to experimental tasting menus. whether it's discovering a perfect bowl of taiwanese beef noodle soup, trying a new korean bbq joint, or diving into an omakase experience, i'm always chasing the next great meal and the stories behind them."
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
class Solution:
    def build_projects(self) -> List[str]:
        """
        Given unlimited creativity and technical skills,
        return a list of impactful software solutions.
        
        Time: O(innovation) | Space: O(impact)
        """
        projects = []
        
        # blockchain payment optimization
        if self.research_zero_fee_transfers():
            projects.append("solidity contracts + off-chain flows")
        
        # ai-powered job platform  
        ml_model = self.train_ats_optimizer()
        if ml_model.accuracy > 0.85:
            projects.append("resume tailoring + job aggregation")
            
        # recipe generation for students
        if self.has_recipe_resources():
            projects.append("personalized meal planning")
            
        # campus voice assistant
        knowledge_base = self.scrape_gonzaga_data()
        nlp_engine = self.build_query_processor()
        if knowledge_base and nlp_engine:
            projects.append("real-time campus info assistant")
            
        return projects
    
    def research_zero_fee_transfers(self) -> bool:
        return True  # currently researching blockchain protocols
        
    def train_ats_optimizer(self):
        return type('Model', (), {'accuracy': 0.92})()
        
    def has_recipe_resources(self) -> bool:
        return True  # budget + dietary_prefs + gpt-3.5

# test solution
austin = Solution()
result = austin.build_projects()
print(f"Successfully built {len(result)} projects") # Output: 4
    `, []);

    const condensedCode = useMemo(() => `
class Solution:
    def build_projects(self) -> List[str]:
        """
        Return impactful software solutions.
        Time: O(innovation) | Space: O(impact)
        """
        projects = []
        
        # blockchain research
        if self.research_zero_fee_transfers():
            projects.append("solidity + off-chain")
        
        # ai job platform  
        if self.train_ats_optimizer().accuracy > 0.85:
            projects.append("resume optimization")
            
        # recipe ai + campus assistant
        projects.extend(["meal planning", "nlp assistant"])
        return projects
    
    def research_zero_fee_transfers(self) -> bool:
        return True  # blockchain protocols research

# test solution
austin = Solution()
result = austin.build_projects()
print(f"Built {len(result)} projects") # Output: 4
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
                            <a href="/AustinTsow2026.pdf" target="_blank" rel="noopener noreferrer">
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
                    © 2026 Austin Tsow
                </div>
            </footer>
        </div>
    );
}

export default About;