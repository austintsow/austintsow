import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./BottomNav.css";

function BottomNav() {
    const location = useLocation();
    const navRef = useRef(null);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const [time, setTime] = useState("");
    const [isClockHovered, setIsClockHovered] = useState(false);
    const [showDetailedTime, setShowDetailedTime] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const prevPathRef = useRef(location.pathname);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        if (path === "/blog") {
            return location.pathname.startsWith("/blog");
        }
        return location.pathname === path;
    };

    useEffect(() => {
        if (navRef.current) {
            const activeButton = navRef.current.querySelector('.nav-button.active');
            if (activeButton) {
                const navRect = navRef.current.getBoundingClientRect();
                const buttonRect = activeButton.getBoundingClientRect();
                
                // Check if we're staying in the same section (e.g., /blog to /blog/:slug)
                const prevPath = prevPathRef.current;
                const currentPath = location.pathname;
                const isSameSection = 
                    (prevPath.startsWith('/blog') && currentPath.startsWith('/blog')) ||
                    (prevPath === '/' && currentPath === '/') ||
                    (prevPath === '/about' && currentPath === '/about') ||
                    (prevPath === '/projects' && currentPath === '/projects') ||
                    (prevPath === '/contact' && currentPath === '/contact');
                
                setIndicatorStyle({
                    width: buttonRect.width,
                    transform: `translateX(${buttonRect.left - navRect.left}px) translateY(-50%)`,
                    transition: isSameSection ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                });
            }
        }
        
        prevPathRef.current = location.pathname;
    }, [location.pathname]);

    useEffect(() => {
        let hoverTimeout;
        
        if (isClockHovered && !isMobile) {
            hoverTimeout = setTimeout(() => {
                setShowDetailedTime(true);
            }, 300);
        } else {
            setShowDetailedTime(false);
        }
        
        return () => clearTimeout(hoverTimeout);
    }, [isClockHovered, isMobile]);

    useEffect(() => {
        const updateTime = () => {
            const current = new Date();
            
            if (showDetailedTime) {
                const hours = current.getHours();
                const minutes = String(current.getMinutes()).padStart(2, '0');
                const seconds = String(current.getSeconds()).padStart(2, '0');
                const milliseconds = String(current.getMilliseconds()).padStart(3, '0');
                const ampm = hours >= 12 ? 'pm' : 'am';
                const displayHours = hours % 12 || 12;
                setTime(`${displayHours}:${minutes}:${seconds}.${milliseconds} ${ampm}`);
            } else {
                setTime(current.toLocaleTimeString("en-US", { 
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true 
                }).toLowerCase());
            }
        };
        
        updateTime();
        const interval = setInterval(updateTime, showDetailedTime ? 10 : 1000);
        
        return () => clearInterval(interval);
    }, [showDetailedTime]);

    return (
        <nav className="glass-nav" ref={navRef}>
            <div className="nav-indicator" style={indicatorStyle}></div>
            <Link 
                to="/" 
                className={`nav-button ${isActive("/") ? "active" : ""}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                {isActive("/") && <span>Home</span>}
            </Link>
            
            <Link 
                to="/about" 
                className={`nav-button ${isActive("/about") ? "active" : ""}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                {isActive("/about") && <span>About</span>}
            </Link>
            
            <Link 
                to="/blog" 
                className={`nav-button ${isActive("/blog") ? "active" : ""}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                {isActive("/blog") && <span>Blog</span>}
            </Link>
            
            <Link 
                to="/projects" 
                className={`nav-button ${isActive("/projects") ? "active" : ""}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                {isActive("/projects") && <span>Projects</span>}
            </Link>
            
            <a
                href="/AustinTsow2026.pdf"
                download="AustinTsow2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            </a>
            
            <div className="nav-separator">|</div>
            
            <div 
                className="nav-time"
                data-expanded={showDetailedTime}
                onMouseEnter={!isMobile ? () => setIsClockHovered(true) : undefined}
                onMouseLeave={!isMobile ? () => setIsClockHovered(false) : undefined}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{time} pst</span>
            </div>
        </nav>
    );
}

export default BottomNav;
