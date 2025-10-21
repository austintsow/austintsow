import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";

function Projects() {
    const TILE_SIZE = 32;
    const PLAYER_SPEED = 0.08;
    
    const [playerPos, setPlayerPos] = useState({ x: 7, y: 10 });
    const [playerDirection, setPlayerDirection] = useState('down');
    const [isMoving, setIsMoving] = useState(false);
    const [nearStation, setNearStation] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const keysPressed = useRef({});
    const animationFrame = useRef(null);

    // Game stations (buildings/locations for each project)
    const stations = [
        { id: 'applyied', x: 3, y: 3, name: 'cozy cottage', type: 'office' },
        { id: 'web3', x: 11, y: 3, name: 'general store', type: 'bank' },
        { id: 'voice', x: 7, y: 6, name: 'blacksmith', type: 'studio' }
    ];

    const projects = [
        {
            id: "applyied",
            name: "applyied",
            files: [
                {
                    name: "about",
                    content: "ai-powered job application platform helping candidates optimize resumes and track applications using openai's api for intelligent matching and suggestions."
                },
                {
                    name: "tech stack",
                    content: "next.js • react • tailwind • python • firebase • openai gpt-4"
                }
            ]
        },
        {
            id: "web3",
            name: "web3-payments",
            files: [
                {
                    name: "about",
                    content: "blockchain payment system for instant, zero-fee transfers between web3 wallets and bank accounts using off-chain settlement and stablecoin protocols."
                },
                {
                    name: "tech stack",
                    content: "solidity • web3.py • solana • stablecoins • off-chain settlement"
                }
            ]
        },
        {
            id: "voice",
            name: "voice-assistant",
            files: [
                {
                    name: "about",
                    content: "nlp-powered voice assistant for gonzaga.edu providing real-time voice responses to campus queries with speech recognition and contextual search."
                },
                {
                    name: "tech stack",
                    content: "python • nltk • spacy • scrapy • speech recognition • google tts"
                }
            ]
        }
    ];

    // Movement and collision detection
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['w', 'a', 's', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key.toLowerCase())) {
                e.preventDefault();
                keysPressed.current[e.key.toLowerCase()] = true;
            }
            
            // Interact with station
            if ((e.key === ' ' || e.key === 'Enter') && nearStation) {
                e.preventDefault();
                const project = projects.find(p => p.id === nearStation);
                setSelectedProject(project);
            }
        };

        const handleKeyUp = (e) => {
            keysPressed.current[e.key.toLowerCase()] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [nearStation, projects]);

    // Game loop
    useEffect(() => {
        const gameLoop = () => {
            let newX = playerPos.x;
            let newY = playerPos.y;
            let moved = false;
            let newDirection = playerDirection;

            if (keysPressed.current['w'] || keysPressed.current['arrowup']) {
                newY -= PLAYER_SPEED;
                newDirection = 'up';
                moved = true;
            }
            if (keysPressed.current['s'] || keysPressed.current['arrowdown']) {
                newY += PLAYER_SPEED;
                newDirection = 'down';
                moved = true;
            }
            if (keysPressed.current['a'] || keysPressed.current['arrowleft']) {
                newX -= PLAYER_SPEED;
                newDirection = 'left';
                moved = true;
            }
            if (keysPressed.current['d'] || keysPressed.current['arrowright']) {
                newX += PLAYER_SPEED;
                newDirection = 'right';
                moved = true;
            }

            // Boundaries
            newX = Math.max(0.5, Math.min(14.5, newX));
            newY = Math.max(0.5, Math.min(11.5, newY));

            if (moved) {
                setPlayerPos({ x: newX, y: newY });
                setPlayerDirection(newDirection);
                setIsMoving(true);
            } else {
                setIsMoving(false);
            }

            // Check proximity to stations
            let near = null;
            stations.forEach(station => {
                const distance = Math.sqrt(
                    Math.pow(newX - station.x, 2) + Math.pow(newY - station.y, 2)
                );
                if (distance < 1.5) {
                    near = station.id;
                }
            });
            setNearStation(near);

            animationFrame.current = requestAnimationFrame(gameLoop);
        };

        animationFrame.current = requestAnimationFrame(gameLoop);

        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, [playerPos, playerDirection, stations, PLAYER_SPEED]);

    const closeProject = () => {
        setSelectedProject(null);
    };

    return (
        <div className="game-container">
            {/* Game World */}
            <div className="game-world">
                {/* Map Grid */}
                <div className="game-map">
                    {/* Render grass and dirt path */}
                    {Array.from({ length: 12 }).map((_, row) => (
                        Array.from({ length: 15 }).map((_, col) => {
                            const isPath = (row >= 5 && row <= 6) || (col >= 6 && col <= 8 && row <= 6);
                            return (
                                <div
                                    key={`${row}-${col}`}
                                    className={`tile ${isPath ? 'path' : 'grass'}`}
                                    style={{
                                        gridRow: row + 1,
                                        gridColumn: col + 1
                                    }}
                                />
                            );
                        })
                    ))}

                    {/* Stations/Buildings */}
                    {stations.map((station) => (
                        <div
                            key={station.id}
                            className="station"
                            style={{
                                gridRow: station.y + 1,
                                gridColumn: station.x + 1
                            }}
                        >
                            <div className={`station-building building-${station.type}`}></div>
                            <div className="station-name">{station.name}</div>
                        </div>
                    ))}

                    {/* Player Character */}
                    <div
                        className={`player player-${playerDirection} ${isMoving ? 'moving' : ''}`}
                        style={{
                            gridRow: Math.floor(playerPos.y) + 1,
                            gridColumn: Math.floor(playerPos.x) + 1,
                            transform: `translate(${(playerPos.x % 1) * TILE_SIZE}px, ${(playerPos.y % 1) * TILE_SIZE}px)`
                        }}
                    >
                        <div className="player-sprite"></div>
                    </div>
                </div>

                {/* Interaction Prompt */}
                {nearStation && !selectedProject && (
                    <div className="interaction-prompt">
                        Press <span className="key">SPACE</span> or <span className="key">ENTER</span> to explore
                    </div>
                )}

                {/* Controls Help */}
                <div className="controls-help">
                    Use <span className="key">WASD</span> or <span className="key">Arrow Keys</span> to move
                </div>
            </div>

            {/* Project Details Modal */}
            {selectedProject && (
                <div className="project-modal-overlay" onClick={closeProject}>
                    <div className="project-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeProject}>×</button>
                        <h2>{selectedProject.name}</h2>
                        <div className="project-files">
                            {selectedProject.files.map((file, index) => (
                                <div key={index} className="file-section">
                                    <h3>{file.name}</h3>
                                    <pre>{file.content}</pre>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Projects;
