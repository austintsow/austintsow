import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { sendMessageToChatbot } from "../services/chatbot";

function Home() {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);
    const [chatVisible, setChatVisible] = useState(true);
    const chatTimerRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        document.body.classList.add("home-scroll-lock");

        return () => {
            document.body.classList.remove("home-scroll-lock");
            if (chatTimerRef.current) {
                clearTimeout(chatTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            const userMessage = message.trim();
            setMessage("");
            setIsLoading(true);
            
            // Reset chat visibility and clear any existing timer
            setChatVisible(true);
            if (chatTimerRef.current) {
                clearTimeout(chatTimerRef.current);
            }
            
            // Only keep the most recent exchange - clear previous history
            const newChatHistory = [{ role: 'user', content: userMessage }];
            setChatHistory(newChatHistory);
            
            try {
                // Get bot response (pass empty history for privacy)
                const botResponse = await sendMessageToChatbot(userMessage, []);
                setChatHistory([...newChatHistory, { role: 'assistant', content: botResponse }]);
                
                // Start 30-second timer to auto-close chat
                chatTimerRef.current = setTimeout(() => {
                    setChatVisible(false);
                    setTimeout(() => {
                        setChatHistory([]);
                    }, 300); // Wait for collapse animation
                }, 30000);
                
            } catch (error) {
                setChatHistory([...newChatHistory, { role: 'assistant', content: "Sorry, I'm having trouble right now. Try again in a moment!" }]);
                
                // Start timer even on error
                chatTimerRef.current = setTimeout(() => {
                    setChatVisible(false);
                    setTimeout(() => {
                        setChatHistory([]);
                    }, 300);
                }, 30000);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory, isLoading]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    return (
        <div className="home">
            <main className="main-content">
                <div className="hero-section">
                    <div className="intro-text">
                        <h1 className="name-title">Austin Tsow</h1>
                        <h2 className="role-title">Software Engineer</h2>
                        <p className="description">
                            cs @ gonzaga, exploring web3 payment systems
                        </p>
                        
                        <div className="chat-section">
                            {(chatHistory.length > 0 || isLoading) && (
                                <div className={`chat-container ${chatVisible ? 'visible' : 'collapsing'}`} ref={chatContainerRef}>
                                    {chatHistory.map((msg, index) => (
                                        <div key={`${index}-${msg.content.slice(0, 10)}`} className={`chat-message ${msg.role} fade-in`}>
                                            <div className="message-content">
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="chat-message assistant loading fade-in">
                                            <div className="message-content">
                                                <div className="typing-indicator">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            <form onSubmit={handleMessageSubmit} className="chat-form">
                                <div className="chat-input-container">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="what would you like to know about me?"
                                        className="chat-input"
                                        disabled={isLoading}
                                    />
                                    <button type="submit" className="chat-submit" disabled={isLoading || !message.trim()}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M8 3L13 8L8 13M13 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="dropdown-section" ref={dropdownRef}>
                            <button onClick={toggleDropdown} className="dropdown-toggle">
                                <span className="dropdown-label">more information</span>
                                <svg 
                                    width="12" 
                                    height="12" 
                                    viewBox="0 0 12 12" 
                                    fill="none" 
                                    className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}
                                >
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <div className={`dropdown-menu ${dropdownOpen ? 'open' : 'closed'}`}>
                                <a href="/AustinTsow2026.pdf" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                                    <span>view resume</span>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M10.5 3.5L3.5 10.5M10.5 3.5H6M10.5 3.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                                <Link to="/about" className="dropdown-item">
                                    <span>about me</span>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M10.5 3.5L3.5 10.5M10.5 3.5H6M10.5 3.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="status-indicators">
                        <div className="status-item">
                            <div className="status-dot active"></div>
                            <span>Available for opportunities</span>
                        </div>
                        <a href="https://www.linkedin.com/in/tsow/" target="_blank" rel="noopener noreferrer" className="status-item clickable">
                            <div className="status-dot linkedin"></div>
                            <span>Connect with me on LinkedIn</span>
                        </a>
                        {/* <a href="https://github.com/austintsow" target="_blank" rel="noopener noreferrer" className="status-item clickable">
                            <div className="status-dot github"></div>
                            <span>Checkout my work on GitHub</span>
                        </a>
                        <a href="https://beli.city/tsow" target="_blank" rel="noopener noreferrer" className="status-item clickable">
                            <div className="status-dot beli"></div>
                            <span>See what I'm eating on Beli</span>
                        </a> */}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;