import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import HomeLoaded from "./home-loaded/Home";
import About from "./about/About";
import Contact from "./contact/Contact";
import Gloria from "./gloria/Gloria";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home-loaded" element={<HomeLoaded />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gloria" element={<Gloria />} />
            </Routes>
        </Router>
    );
}

export default App;