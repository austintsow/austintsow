import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Portfolio from "./portfolio/Portfolio";
import Gloria from "./gloria/Gloria";
import SevenMonths from "./gloria/SevenMonths";
import Valentine from "./gloria/Valentine";
import SaturdayDate from "./gloria/SaturdayDate";
import GloriaArchive from "./gloria/GloriaArchive";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/gloria" element={<Gloria />} />
                <Route path="/gloria/7months" element={<SevenMonths />} />
                <Route path="/gloria/valentine" element={<Valentine />} />
                <Route path="/gloria/saturday" element={<SaturdayDate />} />
                <Route path="/gloria/archive" element={<GloriaArchive />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
