import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./home/Home";
import About from "./about/About";
import Contact from "./contact/Contact";
import Blog from "./blog/Blog";
import BlogPost from "./blog/BlogPost";
import Gloria from "./gloria/Gloria";
import SevenMonths from "./gloria/SevenMonths";
import Valentine from "./gloria/Valentine";
import SaturdayDate from "./gloria/SaturdayDate";
import GloriaArchive from "./gloria/GloriaArchive";
import Ticker from "./components/Ticker";
import BottomNav from "./components/BottomNav";

function AppContent() {
    const location = useLocation();
    const isGloriaPage = location.pathname.startsWith('/gloria');

    return (
        <>
            {!isGloriaPage && <Ticker />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home-loaded" element={<Navigate to="/" replace />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/gloria" element={<Gloria />} />
                <Route path="/gloria/7months" element={<SevenMonths />} />
                <Route path="/gloria/valentine" element={<Valentine />} />
                <Route path="/gloria/saturday" element={<SaturdayDate />} />
                <Route path="/gloria/archive" element={<GloriaArchive />} />
            </Routes>
            {!isGloriaPage && <BottomNav />}
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