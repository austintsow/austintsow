import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Gloria.css";

function Gloria() {
    const [contentVisible, setContentVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showItinerary, setShowItinerary] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setContentVisible(true);
        }, 300);
    }, []);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setTimeout(() => {
            setShowItinerary(true);
        }, 300);
    };

    const aerlumePlan = [
        { time: "6:30–8:15 PM", activity: "Little Stroll Before Din", details: "Ride the Seattle Great Wheel + walk around the pier" },
        { time: "8:30–9:45 PM", activity: "Dinner at Aerlume", details: "Elevated New American fare with skyline and Elliott Bay views" },
        { time: "9:50–10:15 PM", activity: "Dessert at Molly Moon's", details: "Stroll down to the pier for scoops, sit under the Pergola" },
        { time: "10:30–12:00 AM", activity: "Drinks at MBar", details: "Rooftop lounge with cocktails, mezze, and skyline views" }
    ];

    const sugoPlan = [
        { time: "5:00 PM", activity: "Arrive in Seattle", details: "Ride the Seattle Great Wheel + walk around the pier" },
        { time: "7:15–8:15 PM", activity: "Dinner at Sugo Handroll", details: "Fast-paced omakase-style handrolls" },
        { time: "8:20–9:00 PM", activity: "Dessert at Molly Moon's", details: "Grab ice cream and walk along the pier" },
        { time: "9:00–9:45 PM", activity: "Drive to Bellevue", details: "Enjoy an open late-night drive across 520 Bridge" },
        { time: "10:00–11:30 PM", activity: "Drinks at Ascend Prime", details: "31st Floor, towering city and lake views" }
    ];

    if (!showItinerary) {
        return (
            <div className="gloria-page">
                <main className="gloria-main">
                    <div className={`gloria-content ${contentVisible ? 'fade-in-up' : ''}`}>
                        <div className="gloria-emoji">💕</div>
                        <h1 className="gloria-title">
                            happy national girlfriend day
                            <br />
                            to the <span className="emphasis">BEST</span> girlfriend <span className="emphasis">EVER</span>
                        </h1>
                        <div className="gloria-subtitle">
                            i am the luckiest man in the world to have you. i love you gloria🫶
                        </div>
                        
                        {contentVisible && (
                            <div className="date-options">
                                <div className="options-header">
                                    <h2>choose your adventure tonight</h2>
                                    <p>pick your dinner preference & i'll handle the rest</p>
                                </div>
                                
                                <div className="option-cards">
                                    <div 
                                        className="option-card aerlume" 
                                        onClick={() => handleOptionSelect('aerlume')}
                                    >
                                        <div className="card-header">
                                            <h3>Aerlume</h3>
                                            <span className="time">8:30 PM</span>
                                        </div>
                                        <p className="card-description">
                                            Elevated dining with skyline views, followed by rooftop cocktails at MBar
                                        </p>
                                        <div className="card-tag">romantic & luxurious</div>
                                    </div>
                                    
                                    <div 
                                        className="option-card sugo" 
                                        onClick={() => handleOptionSelect('sugo')}
                                    >
                                        <div className="card-header">
                                            <h3>Sugo Handroll</h3>
                                            <span className="time">7:15 PM</span>
                                        </div>
                                        <p className="card-description">
                                            Fresh omakase handrolls, then scenic drive to Bellevue for rooftop drinks
                                        </p>
                                        <div className="card-tag">adventurous & fresh</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        );
    }

    const currentPlan = selectedOption === 'aerlume' ? aerlumePlan : sugoPlan;
    const restaurantName = selectedOption === 'aerlume' ? 'Aerlume' : 'Sugo Handroll';

    return (
        <div className="gloria-page">
            <main className="gloria-main itinerary-view">
                <div className="itinerary-content">
                    <div className="itinerary-header">
                        <h1>{selectedOption === 'aerlume' ? 'option A 😋' : 'option B 😛'}</h1>
                        <p className="selected-restaurant">featuring {restaurantName}</p>
                        <button 
                            className="back-to-options" 
                            onClick={() => { setShowItinerary(false); setSelectedOption(null); }}
                        >
                            ← change plans
                        </button>
                    </div>
                    
                    <div className="timeline">
                        {currentPlan.map((item, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-time">{item.time}</div>
                                <div className="timeline-content">
                                    <h3><span className="mobile-time-activity">{item.time} | {item.activity}</span><span className="desktop-activity">{item.activity}</span></h3>
                                    <p>{item.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="itinerary-footer">
                        <p>i am so excited to spend today with youuuuu😁</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Gloria;
