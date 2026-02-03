import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Gloria.css";

function Gloria() {
    const [digits, setDigits] = useState(['', '', '', '', '']);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showError, setShowError] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const correctPassword = "67214";

    const handleDigitChange = (index, value) => {
        // Only allow single digit
        if (value.length > 1) {
            value = value.slice(-1);
        }

        // Only allow numbers
        if (value && !/^\d$/.test(value)) {
            return;
        }

        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);
        setShowError(false);

        // Auto-advance to next input
        if (value && index < 4) {
            inputRefs.current[index + 1].focus();
        }

        // Check password when all digits entered
        if (value && index === 4) {
            const enteredPassword = newDigits.join('');
            if (enteredPassword === correctPassword) {
                setIsUnlocked(true);
            } else {
                setShowError(true);
                // Clear after shake animation
                setTimeout(() => {
                    setDigits(['', '', '', '', '']);
                    inputRefs.current[0].focus();
                }, 600);
            }
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 5);
        if (/^\d+$/.test(pastedData)) {
            const newDigits = [...digits];
            for (let i = 0; i < pastedData.length && i < 5; i++) {
                newDigits[i] = pastedData[i];
            }
            setDigits(newDigits);

            // Check if complete
            if (pastedData.length === 5) {
                if (pastedData === correctPassword) {
                    setIsUnlocked(true);
                } else {
                    setShowError(true);
                    setTimeout(() => {
                        setDigits(['', '', '', '', '']);
                        inputRefs.current[0].focus();
                    }, 600);
                }
            } else {
                inputRefs.current[Math.min(pastedData.length, 4)].focus();
            }
        }
    };

    return (
        <div className="gloria-page">
            {!isUnlocked ? (
                <div className={`password-screen ${showError ? 'shake' : ''}`}>
                    <div className="pin-container">
                        {digits.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleDigitChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="pin-input"
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="selection-screen">
                    <div className="boxes-container">
                        <div
                            className="selection-box active"
                            onClick={() => navigate('/gloria/7months')}
                        >
                            <span className="box-title">7 months</span>
                        </div>

                        <div className="selection-box locked">
                            <div className="lock-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <span className="box-title">valentine's day</span>
                            <span className="unlock-text">unlocks soon...</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gloria;
