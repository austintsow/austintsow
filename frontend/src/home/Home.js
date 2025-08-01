import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Clock from "./Clock";

function Home() {
    const [firstLine, setFirstLine] = useState("");
    const [secondLine, setSecondLine] = useState("");
    const [highlightedName, setHighlightedName] = useState("");
    const [showCaret, setShowCaret] = useState(true);
    const [welcomeIndex, setWelcomeIndex] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [mainTextVisible, setMainTextVisible] = useState(false);
    const welcomeIntervalRef = useRef(null);

    const firstPart = "hi, my";
    const secondPart = "name is ";
    const thirdPart = "austin";
    
    // Welcome messages in different languages
    const welcomeMessages = [
        "Welcome", // English
        "欢迎", // Mandarin
        "ようこそ", // Japanese
        "Bienvenido", // Spanish
        "환영합니다" // Korean
    ];

    useEffect(() => {
        document.body.classList.add("home-scroll-lock");

        return () => {
            document.body.classList.remove("home-scroll-lock");
        };
    }, []);

    // Control welcome animation
    useEffect(() => {
        // Skip the animation if we've already completed it
        if (animationComplete) return;
        
        // Clear any existing interval
        if (welcomeIntervalRef.current) {
            clearInterval(welcomeIntervalRef.current);
        }
        
        // Instead of changing text and animation at the same time, 
        // we'll use CSS animation events to coordinate the changes
        const welcomeElement = document.querySelector('.welcome-animation');
        if (welcomeElement) {
            // Add event listener for animation end
            const handleAnimationIteration = () => {
                setWelcomeIndex(prevIndex => {
                    // If we've cycled through all messages, set animation complete
                    if (prevIndex === welcomeMessages.length - 1) {
                        // Remove the event listener
                        welcomeElement.removeEventListener('animationiteration', handleAnimationIteration);
                        setAnimationComplete(true);
                        
                        // After welcome animation completes and "welcome." is displayed,
                        // trigger main text to appear after a delay
                        setTimeout(() => {
                            setMainTextVisible(true);
                            startTypingAnimation();
                        }, 1000);
                        
                        return prevIndex;
                    }
                    return prevIndex + 1;
                });
            };
            
            // Listen for each animation iteration
            welcomeElement.addEventListener('animationiteration', handleAnimationIteration);
            
            // Clean up function
            return () => {
                if (welcomeElement) {
                    welcomeElement.removeEventListener('animationiteration', handleAnimationIteration);
                }
            };
        } else {
            // Fallback to the timer-based approach if the element isn't available yet
            welcomeIntervalRef.current = setInterval(() => {
                setWelcomeIndex(prevIndex => {
                    if (prevIndex === welcomeMessages.length - 1) {
                        clearInterval(welcomeIntervalRef.current);
                        setAnimationComplete(true);
                        
                        setTimeout(() => {
                            setMainTextVisible(true);
                            startTypingAnimation();
                        }, 1000);
                        
                        return prevIndex;
                    }
                    return prevIndex + 1;
                });
            }, 1000);
            
            return () => {
                if (welcomeIntervalRef.current) {
                    clearInterval(welcomeIntervalRef.current);
                }
            };
        }
    }, [animationComplete, welcomeMessages.length]);

    // Function to handle typing animation
    const startTypingAnimation = () => {
        let index = 0;

        const typingInterval = setInterval(() => {
            if (index < firstPart.length) {
                setFirstLine(firstPart.substring(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);

                // Start typing the second line after a short delay
                setTimeout(() => {
                    let secondIndex = 0;
                    const secondTypingInterval = setInterval(() => {
                        if (secondIndex < secondPart.length) {
                            setSecondLine(secondPart.substring(0, secondIndex + 1));
                            secondIndex++;
                        } else {
                            clearInterval(secondTypingInterval);

                            // Start typing "austin" in highlight color
                            setTimeout(() => {
                                let thirdIndex = 0;
                                const thirdTypingInterval = setInterval(() => {
                                    if (thirdIndex < thirdPart.length) {
                                        setHighlightedName(thirdPart.substring(0, thirdIndex + 1));
                                        thirdIndex++;
                                    } else {
                                        clearInterval(thirdTypingInterval);
                                        // Keep caret blinking for 2 seconds after full animation
                                        setTimeout(() => setShowCaret(false), 2500);
                                    }
                                }, 150); // Typing speed for "austin"
                            }, 300); // Slight pause before typing "austin"
                        }
                    }, 150); // Typing speed for "name is"
                }, 500); // Pause before second line starts
            }
        }, 150); // Typing speed for first line
    };

    return (
        <div className="home">
            <header className={mainTextVisible ? "fade-in visible" : "fade-in"}>
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
                <div className={mainTextVisible ? "main-text fade-in visible" : "main-text fade-in"}>
                    <h1 className="hello">
                        {firstLine}
                        {firstLine.length === firstPart.length && <br />}
                        {secondLine}
                        <span className="highlight">{highlightedName}</span>
                        {showCaret && <span className="caret">|</span>}
                    </h1>
                </div>
                <div className="center-text">
                    <div className={animationComplete ? "welcome-static" : "welcome-animation"}>
                        {animationComplete ? "welcome." : welcomeMessages[welcomeIndex]}
                    </div>
                </div>
            </main>
            <footer className={mainTextVisible ? "fade-in visible" : "fade-in"}>
                <div className="applyied">
                    <Link to="/gloria">for gloria</Link>
                </div>
                <Clock />
            </footer>
        </div>
    );
}

export default Home;