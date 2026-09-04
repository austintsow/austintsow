import React, { useState } from "react";
import AuralisHero from "./AuralisHero";
import About from "./About";
import Experience from "./Experience";
import Loader from "./Loader";
import "./Portfolio.css";

export default function Portfolio() {
    const [loading, setLoading] = useState(true);
    return (
        <div className="portfolio">
            {loading && <Loader onDone={() => setLoading(false)} />}
            <AuralisHero />
            <About />
            <Experience />
            <footer className="footer">
                <span>© {new Date().getFullYear()} austin tsow. all rights reserved.</span>
            </footer>
        </div>
    );
}
