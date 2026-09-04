import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import CardBloom from "./CardBloom";
import "./Experience.css";

const EXPERIENCE = [
    {
        id: "visa",
        company: "visa",
        tagline: "device intelligence for global payments",
        period: "jan 2026 - present",
        position: "software engineer",
        location: "bellevue, wa",
        industry: "payments / fintech",
        bloom: "#1434cb",
        seed: 0.0,
        desc: [
            "i work on visa's device-intelligence platform, building the backend services and internal tooling that keep device profiling fast, reliable, and secure at a global scale.",
            "lately that includes ai tooling that helps the team diagnose incidents faster and self-serve apis that make partner onboarding painless.",
        ],
    },
    {
        id: "applyied",
        company: "applyied",
        tagline: "ai-powered job applications",
        period: "sep 2024 - jun 2026",
        position: "co-founder, software engineer",
        location: "seattle, wa",
        industry: "ai / career tech",
        website: { label: "applyied.com", url: "https://applyied.com" },
        bloom: "#e9a13b",
        seed: 4.3,
        desc: [
            "co-founded an ai-powered job platform and built it end to end, an easier way to keep track of all your job applications in one place.",
            "wore every hat along the way: product, engineering, and growth. follow us on tiktok @applyied!",
        ],
    },
    {
        id: "paccar",
        company: "paccar",
        tagline: "trucks, tech, and logistics",
        period: "may 2025 - aug 2025",
        position: "software engineer intern",
        location: "renton, wa",
        industry: "manufacturing tech",
        bloom: "#002f6c",
        seed: 9.1,
        desc: [
            "spent a summer automating incident triage on paccar's global connected services team, building serverless pipelines and ai tooling that turned week-long debugging into a one-day fix.",
        ],
    },
    {
        id: "ipc",
        company: "independent pharmacy cooperative",
        tagline: "taking pharmacies from desktop to mobile",
        period: "sep 2024 - may 2025",
        position: "software engineer, full stack lead",
        location: "spokane, wa",
        industry: "healthcare / pharmacy",
        bloom: "#159f57",
        seed: 14.7,
        desc: [
            "ipc sponsored our team to bring their desktop-only platform to mobile. i led the build of a cross-platform app from scratch for thousands of independent pharmacies, running the team's agile process along the way.",
        ],
    },
];

// turn "@applyied" mentions inside a description into a tiktok link
const renderDesc = (text) =>
    text.split("@applyied").flatMap((part, i) =>
        i === 0
            ? [part]
            : [
                  <a
                      key={`tiktok-${i}`}
                      className="exp-link plain"
                      href="https://tiktok.com/@applyied"
                      target="_blank"
                      rel="noreferrer"
                  >
                      @applyied
                  </a>,
                  part,
              ]
    );

export default function Experience() {
    // touch devices only: a tap lights a card's gradient and it stays lit
    // until the user touches a different card or anywhere outside the cards
    // (including touching elsewhere to scroll away)
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        if (!window.matchMedia("(hover: none)").matches) return;
        const onTouch = (e) => {
            const card =
                e.target instanceof Element ? e.target.closest(".exp-card") : null;
            setActiveId(card ? card.dataset.job : null);
        };
        document.addEventListener("touchstart", onTouch, { passive: true });
        return () => document.removeEventListener("touchstart", onTouch);
    }, []);

    return (
        <section className="exp" id="experience">
            <div className="exp-mast">experience</div>
            {EXPERIENCE.map((job) => (
                <div
                    className={`exp-card${activeId === job.id ? " active" : ""}`}
                    data-job={job.id}
                    key={job.id}
                >
                    <CardBloom c1={job.bloom} seed={job.seed} className="exp-bloom" />
                    <div className="exp-card-inner">
                        <div className="exp-col-company">
                            <h3>{job.company}</h3>
                            <p className="exp-tagline">{job.tagline}</p>
                            <span className="exp-period">{job.period}</span>
                        </div>
                        <div className="exp-col-props">
                            <div className="exp-prop">
                                <span className="exp-prop-label">position</span>
                                <span className="exp-prop-value">{job.position}</span>
                            </div>
                            <div className="exp-prop">
                                <span className="exp-prop-label">location</span>
                                <span className="exp-prop-value">{job.location}</span>
                            </div>
                            <div className="exp-prop">
                                <span className="exp-prop-label">industry</span>
                                <span className="exp-prop-value">{job.industry}</span>
                            </div>
                            {job.website && (
                                <div className="exp-prop">
                                    <span className="exp-prop-label">website</span>
                                    <span className="exp-prop-value">
                                        <a
                                            className="exp-link"
                                            href={job.website.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {job.website.label}
                                            <FiArrowUpRight />
                                        </a>
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="exp-col-desc">
                            {job.desc.map((p, i) => (
                                <p key={i}>{renderDesc(p)}</p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
