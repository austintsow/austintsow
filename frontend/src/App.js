import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/Home";
import About from "./about/About";
import Contact from "./contact/Contact";
import Blog from "./blog/Blog";
import BlogPost from "./blog/BlogPost";
import Projects from "./projects/Projects";
import Ticker from "./components/Ticker";
import BottomNav from "./components/BottomNav";

function AppContent() {
    return (
        <>
            <Ticker />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home-loaded" element={<Navigate to="/" replace />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
            <BottomNav />
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;