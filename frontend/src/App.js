import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Portfolio from "./portfolio/Portfolio";
import Gloria from "./gloria/Gloria";
import SevenMonths from "./gloria/SevenMonths";
import Valentine from "./gloria/Valentine";
import SaturdayDate from "./gloria/SaturdayDate";
import FilingCabinet from "./gloria/FilingCabinet";
import FinderPage from "./gloria/FinderPage";
import FallDate from "./gloria/FallDate";
import GfDay from "./gloria/GfDay";
import FestiveEvening from "./gloria/FestiveEvening";
import PasswordsPage from "./gloria/PasswordsPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/gloria" element={<Gloria />} />
                <Route path="/gloria/gfday" element={<GfDay />} />
                <Route path="/gloria/festive" element={<FestiveEvening />} />
                <Route path="/gloria/7months" element={<SevenMonths />} />
                <Route path="/gloria/valentine" element={<Valentine />} />
                <Route path="/gloria/saturday" element={<SaturdayDate />} />
                <Route path="/gloria/fall" element={<FallDate />} />
                <Route path="/gloria/archive" element={<FilingCabinet />} />
                <Route path="/gloria/passwords" element={<PasswordsPage />} />
                <Route path="/gloria/photos" element={<FinderPage />} />
                <Route path="/gloria/letter" element={<FinderPage initialView="readme" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
