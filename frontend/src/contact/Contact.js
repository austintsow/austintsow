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
            </header>
            <main className="contact-content">
                <div className="contact-info">
                    <div className="contact-item">
                        <h2>Email</h2>
                        <p><a href="mailto:austin@tsow.com">austin@tsow.com</a></p>
                    </div>
                    <div className="contact-item">
                    <h2>LinkedIn</h2>
                    <p><a href="https://www.linkedin.com/in/tsow/" target="_blank" rel="noopener noreferrer">tsow</a></p>
                    </div>
                    <div className="contact-item">
                        <h2>GitHub</h2>
                        <p><a href="https://github.com/austintsow" target="_blank" rel="noopener noreferrer">austintsow</a></p>
                    </div>
                    <div className="contact-item">
                        <h2>Beli</h2>
                        <p><a href="https://beliapp.co/app/tsow" target="_blank" rel="noopener noreferrer">tsow</a></p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Contact;