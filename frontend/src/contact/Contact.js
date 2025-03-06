import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
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
                <div className="contact-info">
                    <div className="contact-item">
                        <h2>Email</h2>
                        <p>atsow@icloud.com</p>
                    </div>
                    <div className="contact-item">
                        <h2>GitHub</h2>
                        <p>austintsow</p>
                    </div>
                    <div className="contact-item">
                        <h2>LinkedIn</h2>
                        <p>tsow</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Contact;