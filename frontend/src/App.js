import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import HomeLoaded from "./home-loaded/Home";
import About from "./about/About";
import Contact from "./contact/Contact";
import Blog from "./blog/Blog";
import Projects from "./projects/Projects";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home-loaded" element={<HomeLoaded />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
        </Router>
    );
}

export default App;