import React from "react";
import "./About.css";

function About() {
    const experience = [
        {
            company: "applyied",
            role: "Software Engineer, Full Stack",
            date: "Sep. 2024 - Present",
            color: "#f5a623"
        },
        {
            company: "PACCAR",
            role: "Software Engineer Intern",
            date: "May 2025 - Aug. 2025",
            color: "#0066cc"
        },
        {
            company: "IPCRX",
            role: "Software Engineer, Full Stack Lead",
            date: "Sep. 2024 - May 2025",
            color: "#059669"
        }
    ];


    return (
        <div className="about-page">
            <div className="about-content">
                <div className="about-wrapper">
                    {/* Left: Text Content */}
                    <div className="about-text">
                        <h3 className="section-title">background</h3>
                        <p>
                            i'm from sammamish, washington, just outside seattle, and grew up in a taiwanese-american household. i'm currently finishing my computer science degree at gonzaga university with a concentration in software security, graduating in december 2025. my journey into software engineering has taken me from building ai-driven applications and cloud infrastructure at PACCAR to co-founding applyied and leading agile teams while shipping cross-platform mobile apps at the Independent Pharmacy Cooperative (IPC). what drives me isn't just the technology itself, but the potential to create systems that genuinely improve how people interact with software, whether that's automating tedious workflows, making job searches smarter, or building infrastructure that solves real problems. i'm always chasing that next challenge, the kind that pushes me to learn something new and build something meaningful.

                        </p>
                        
                        <h3 className="section-title">hobbies</h3>
                        <p>
                            when i'm not coding, you'll find me outside living an active life. i spend weekends hiking in the pacific northwest, exploring trails across washington, always chasing new views and elevation gains. running has become a constant, whether training for a race or just clearing my mind on a long stretch of road. but my newest obsession is pickleball! i'm rated a 5.1 DUPR... in my dreams, at least. there's something addictive about the perfect third shot drop or a well-executed kitchen rally, and who knows, if i keep improving, maybe i'll actually earn that 5.1 one day. beyond the physical, i'm deeply fascinated by DeFi and decentralized finance. i genuinely believe we're witnessing the infrastructure layer for the next generation of financial systems being built in real time. solana has become my favorite blockchain to build on because the speed and low transaction costs make it feel like what crypto was always supposed to be. experimenting with smart contracts, exploring zero-fee payment systems, and staying plugged into the crypto community has become a legitimate hobby that blends my technical interests with my belief in what's possible.
                        </p>
                        
                        <h3 className="section-title">tasting</h3>
                        <p>
                            food is another passion that consumes my free time. i love cooking, experimenting with flavors, refining techniques, and bringing people together over shared meals. recently, i've gotten into baking, which has been a whole new challenge. there's something humbling about how unforgiving baking can be, you can't just wing measurements or improvise like you can with cooking. perfecting a sourdough starter, nailing the exact hydration ratio for croissants, or getting that golden crust on a loaf has become oddly addictive. it's a creative outlet, much like software development, where precision meets intuition and every iteration teaches you something new. beyond the kitchen, i'm constantly exploring new restaurants, seeking out unique dishes, and experiencing different cuisines. you can actually follow my food journey on beli (check my home page for the link), i document everything... well most things besides fast food unless i'm blown away. whether it's discovering a perfect bowl of taiwanese beef noodle soup, trying a new korean bbq joint, or diving into an omakase experience, i'm always chasing the next great meal and the stories behind them.
                        </p>
                    </div>

                    {/* Right: Experience Timeline */}
                    <div className="timeline-container">
                        <h3 className="timeline-title">experience</h3>
                        <div className="timeline">
                            {/* Future Vision */}
                            <div className="timeline-future">
                                <div className="timeline-dot" style={{ borderColor: '#999' }}>
                                    <div className="timeline-dot-inner" style={{ backgroundColor: '#999' }}></div>
                                </div>
                                <div className="timeline-future-line"></div>
                                <div className="timeline-content">
                                    <div className="timeline-company" style={{ color: '#999' }}>where to now?</div>
                                    <div className="timeline-role">Software Engineer</div>
                                    <div className="timeline-date">Jan. 2026 - ?</div>
                                </div>
                            </div>
                            
                            {experience.map((job, index) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-dot" style={{ borderColor: job.color }}>
                                        <div className="timeline-dot-inner" style={{ backgroundColor: job.color }}></div>
                                    </div>
                                    {index < experience.length - 1 && (
                                        <div className="timeline-line"></div>
                                    )}
                                    <div className="timeline-content">
                                        <div className="timeline-company" style={{ color: job.color }}>{job.company}</div>
                                        <div className="timeline-role">{job.role}</div>
                                        <div className="timeline-date">{job.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;