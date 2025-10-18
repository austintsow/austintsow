import React from "react";
import { Link } from "react-router-dom";
import "./Projects.css";
import BottomNav from "../components/BottomNav";

function Projects() {
    return (
        <div className="projects-page">
            <header>
                <div className="logo">
                    <Link to="/home-loaded">austin tsow</Link>
                </div>
            </header>
            <main className="projects-content">
                <h1>Projects</h1>
                <p>Coming soon...</p>
            </main>
            <BottomNav />
        </div>
    );
}

export default Projects;
