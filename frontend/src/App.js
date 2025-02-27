import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import About from "./about/About";
// Remove: import Contact from "./contact/Contact";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* Remove this: <Route path="/contact" element={<Contact />} /> */}
            </Routes>
        </Router>
    );
}

export default App;