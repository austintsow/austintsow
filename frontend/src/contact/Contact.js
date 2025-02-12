import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
    const [statusText, setStatusText] = useState("[status: working]");

    useEffect(() => {
        const dots = ["", ".", "..", "..."];
        let index = 0;
        const interval = setInterval(() => {
            setStatusText(`[status: working${dots[index]}]`);
            index = (index + 1) % dots.length;
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="contact">
            <header>
                <div className="logo">
                    <Link to="/">austin tsow</Link>
                </div>
                <nav>
                    <ul>
                        <li><a href="/AustinTsow2025.pdf" target="_blank" rel="noopener noreferrer">resume</a></li>
                        <li><Link to="/about">about</Link></li>
                        <li><Link to="/contact">contact</Link></li>
                    </ul>
                </nav>
            </header>
            <main className="contact-content">
                <div className="center-text">{statusText}</div>
            </main>
        </div>
    );
}

export default Contact;