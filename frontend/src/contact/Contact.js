import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
    useEffect(() => {
        document.body.classList.add("contact-scroll-lock");

        return () => {
            document.body.classList.remove("contact-scroll-lock");
        };
    }, []);

    return (
        <div className="contact">
            <header>
                <div className="logo">
                    <Link to="/home-loaded">austin tsow</Link>
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
                        <p><a href="https://beliapp.co/app/unsatisfied" target="_blank" rel="noopener noreferrer">unsatisfied</a></p>
                    </div>
                </div>
            </main>
            <footer className="contact-footer">
                <div className="copyright">
                © 2025 Austin Tsow
                </div>
            </footer>
        </div>
    );
}

export default Contact;