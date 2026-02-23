import React, { useState } from "react";
import "./Valentine.css";
import FinderBrowser from './FinderBrowser';

function Valentine() {
    const [noClickCount, setNoClickCount] = useState(0);
    const [noButtonPosition, setNoButtonPosition] = useState(null);
    const [noButtonText, setNoButtonText] = useState("no");
    const [showCelebration, setShowCelebration] = useState(false);
    const [showYesStreak, setShowYesStreak] = useState(false);
    const [showFinder, setShowFinder] = useState(false);

    // Handle YES button click
    const handleYesClick = () => {
        // Trigger celebration
        setShowCelebration(true);
        setShowYesStreak(true);
    };

    // Handle NO button click
    const handleNoClick = () => {
        const newCount = noClickCount + 1;
        setNoClickCount(newCount);

        // Click 7+: If already showing "YES", trigger celebration
        if (noButtonText === "YES") {
            setShowCelebration(true);
            setShowYesStreak(true);
            return;
        }

        if (newCount >= 6) {
            // Click 6: Change to "YES" only (don't trigger celebration yet)
            setNoButtonText("YES");
            return;
        }

        // Update text based on click count (clicks 1-5)
        if (newCount === 4) {
            setNoButtonText("why 😢");
        } else if (newCount === 5) {
            setNoButtonText("really? 😭");
        }
        // else text stays "no" (clicks 1-3)

        // Move to random position (all clicks 1-5)
        const newLeft = 5 + Math.random() * 80; // 5-85%
        const newTop = 10 + Math.random() * 75; // 10-85%
        setNoButtonPosition({ left: newLeft, top: newTop });
    };

    // Handle folder click
    const handleFolderClick = () => {
        setShowFinder(true);
    };

    return (
        <div className="valentine-page">
            <div className={showCelebration ? "valentine-content thanos-snap" : "valentine-content"}>
                <h1 className="valentine-heading">gloria, will you be my valentine</h1>

                <div className="video-container">
                    <video
                        className="minion-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/video/minon.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="buttons-container">
                    <button
                        className="yes-button"
                        onClick={handleYesClick}
                    >
                        yes
                    </button>

                    <button
                        className="no-button"
                        onClick={handleNoClick}
                        style={noButtonPosition ? {
                            position: 'absolute',
                            left: `${noButtonPosition.left}%`,
                            top: `${noButtonPosition.top}%`
                        } : {}}
                    >
                        {noButtonText}
                    </button>
                </div>
            </div>

            {showCelebration && (
                <div className="folder-celebration" onClick={handleFolderClick}>
                    <svg className="folder-icon" width="120" height="120" viewBox="0 0 120 120">
                        <defs>
                            <linearGradient id="folderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#5FC2F9" />
                                <stop offset="100%" stopColor="#4DA3E0" />
                            </linearGradient>
                        </defs>
                        <rect x="10" y="35" width="100" height="70" rx="8" fill="url(#folderGradient)" />
                        <path d="M10 45 L10 35 Q10 35 15 35 L45 35 Q48 35 50 32 L55 28 Q57 26 60 26 L105 26 Q110 26 110 31 L110 45 Z" fill="#72CFFF" />
                    </svg>
                    <div className="folder-label">my-favorite</div>
                </div>
            )}

            {showYesStreak && (
                <div className="yes-streak-container">
                    <img
                        src="/images/YES.png"
                        alt="YES celebration!"
                        className="yes-streak-image"
                        onAnimationEnd={() => setShowYesStreak(false)}
                    />
                </div>
            )}

            {showFinder && (
                <FinderBrowser onClose={() => setShowFinder(false)} />
            )}
        </div>
    );
}

export default Valentine;
