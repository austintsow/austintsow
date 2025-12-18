import React, { useState } from "react";
import "./Gloria.css";

function Gloria() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [showHearts, setShowHearts] = useState(false);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password.toLowerCase() === 'austinlovesgloria') {
            setShowError(false);
            setShowHearts(true);
            setTimeout(() => {
                setShowDetails(true);
                setShowHearts(false);
            }, 2000);
        } else {
            setShowError(true);
            setShowHearts(false);
        }
    };

    const restaurants = [
        {
            name: "fogo de chão",
            type: "brazilian steakhouse",
            description: "where we celebrated our one month anniversary with endless meats",
            hoverColor: "#8B4513"
        },
        {
            name: "seastar",
            type: "seafood",
            description: "seafood's very yum if you're feeling seafood",
            hoverColor: "#1E90FF"
        },
        {
            name: "el gaucho",
            type: "steakhouse",
            description: "looks like a yummy steakhouse and i've seen a lot of tiktoks of people coming here for their anniversaries so it must be good",
            hoverColor: "#8B0000"
        }
    ];

    return (
        <div className="gloria-page">
            {/* Falling Snowflakes */}
            <div className="snowflakes" aria-hidden="true">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="snowflake"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}
                    >
                        ❄
                    </div>
                ))}
            </div>

            {/* Floating Hearts Animation (shown on correct password) */}
            {showHearts && (
                <div className="hearts-container" aria-hidden="true">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="heart"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 1}s`
                            }}
                        >
                            ❤
                        </div>
                    ))}
                </div>
            )}

            <div className="gloria-content">
                {/* Christmas Lights */}
                <div className="christmas-lights">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="light" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                </div>

                {!showDetails ? (
                    /* INVITATION LANDING PAGE WITH PASSWORD */
                    <div className={`invitation-container ${showHearts ? 'fade-out' : ''}`}>
                        <h1 className="invitation-title">austin invites you to a date!</h1>
                        <form onSubmit={handlePasswordSubmit} className="password-form">
                            <input
                                type="password"
                                className="password-input"
                                placeholder="enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" className="password-button">
                                enter
                            </button>
                        </form>
                        {showError && (
                            <p className="error-message">you must not be gloria!</p>
                        )}
                    </div>
                ) : (
                    /* DATE DETAILS PAGE */
                    <div className="gloria-container">
                        <h1 className="gloria-title">a festive evening together</h1>

                    <div className="date-info">
                        <p className="date-time">december 22 @ 6:45pm</p>
                    </div>

                    <div className="section">
                        <h2 className="section-heading">dinner</h2>
                        <p className="section-subtitle">choose where we'll start our evening</p>

                        <div className="restaurants-grid">
                            {restaurants.map((restaurant, index) => (
                                <div
                                    key={index}
                                    className={`restaurant-card ${selectedRestaurant === index ? 'selected' : ''}`}
                                    onClick={() => setSelectedRestaurant(index)}
                                    style={{
                                        '--hover-color': restaurant.hoverColor,
                                        '--hover-color-light': restaurant.hoverColor + '15',
                                        '--hover-color-shadow': restaurant.hoverColor + '26'
                                    }}
                                >
                                    <div className="restaurant-header">
                                        <h3 className="restaurant-name">{restaurant.name}</h3>
                                        <span className="restaurant-type">{restaurant.type}</span>
                                    </div>
                                    <p className="restaurant-description">{restaurant.description}</p>
                                    {selectedRestaurant === index && (
                                        <div className="selected-indicator">✓ your choice</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="section">
                        <h2 className="section-heading">after dinner</h2>
                        <div className="activity-card">
                            <h3 className="activity-name">forum social house</h3>
                            <p className="activity-description">
                                since we didnt get to play in sf, we get to do it today!
                            </p>
                        </div>
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Gloria;
