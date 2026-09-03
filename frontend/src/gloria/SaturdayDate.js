import { useState, useEffect, useRef, useCallback } from "react";
import "./SaturdayDate.css";
import {
    DoodleDefs,
    CoupleDoodle,
    RunDoodle,
    ErrandsDoodle,
    PaintDoodle,
    DinnerDoodle,
    DrinksDoodle,
    IceCreamDoodle,
    ScribbleCircle,
    SketchBox,
    SmallHeart,
} from "./SaturdayDoodles";

const STORAGE_KEY = "gloria-saturday-bar";

const SCHEDULE = [
    {
        id: "gym",
        time: "9:00 – 11:00 am",
        title: "gym + run as planned",
        note: "we earn the rest of the day first.",
        accent: "sage",
        Doodle: RunDoodle,
    },
    {
        id: "errands",
        time: "11:00 am – 3:00 pm",
        title: "errands",
        note: "whole foods to return stuff, then ikea for hangers and return rug",
        accent: "blue",
        Doodle: ErrandsDoodle,
    },
    {
        id: "paint",
        time: "3:45 – 5:45 pm",
        title: "paint the city",
        note: "let's paint! no rules about who paints better because we know who the better artist is (me - austin)",
        accent: "rose",
        Doodle: PaintDoodle,
    },
    {
        id: "dinner",
        time: "6:45 pm",
        title: "dinner at kokkaku",
        note: "reservation is already in. just show up hungry.",
        accent: "terracotta",
        Doodle: DinnerDoodle,
    },
];

const BARS = [
    {
        id: "nest",
        name: "the nest rooftop bar",
        rating: 7.8,
        reviews: 762,
        tags: ["rooftop", "city views", "the crowd pleaser"],
        blurb: "great view, but rainy, but also good reviews.",
    },
    {
        id: "rosebay",
        name: "rosebay bar",
        rating: 7.2,
        reviews: 18,
        tags: ["quiet", "under the radar", "our secret"],
        blurb: "looks very vibey based off of the tiktok you sent me.",
    },
];

const FINALE = {
    id: "icecream",
    time: "after drinks",
    title: "salt & straw",
    note: "molly moons two times in a row means we must go to salt & straw!",
    accent: "mustard",
    Doodle: IceCreamDoodle,
};

function readStoredBar() {
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        return BARS.some((b) => b.id === saved) ? saved : null;
    } catch {
        return null;
    }
}

/* Fades itself in once it scrolls into view.
   The visible flag lives in React state on purpose: an earlier version toggled the
   class imperatively, and any re-render that changed the element's className (the
   summary card gaining .is-complete) wiped it back out and made the card vanish. */
function Reveal({ tag: Tag = "div", className = "", children, ...rest }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce || typeof IntersectionObserver === "undefined") {
            setShown(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "0px 0px -6% 0px", threshold: 0 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            className={`reveal${shown ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
            {...rest}
        >
            {children}
        </Tag>
    );
}

function TimelineItem({ item, index }) {
    const { time, title, note, accent, Doodle } = item;
    return (
        <Reveal
            tag="li"
            className={`tl-item tl-item--${index % 2 === 0 ? "a" : "b"}`}
            style={{ "--accent": `var(--${accent})` }}
        >
            <div className="tl-rail" aria-hidden="true">
                <span className="tl-dot" />
            </div>
            <div className="tl-card">
                <p className="tl-time">{time}</p>
                <h3 className="tl-title">{title}</h3>
                <p className="tl-note">{note}</p>
            </div>
            <div className="tl-art" aria-hidden="true">
                <Doodle />
            </div>
        </Reveal>
    );
}

function BarCard({ bar, selected, dimmed, onSelect }) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={selected}
            className={`bar-card${selected ? " is-selected" : ""}${dimmed ? " is-dimmed" : ""}`}
            onClick={() => onSelect(bar.id)}
        >
            {selected && <ScribbleCircle />}

            <span className="bar-check" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                    <path filter="url(#crayonRough)" d="M5 13 L 10 18 L 19 6" />
                </svg>
            </span>

            <span className="bar-name">{bar.name}</span>

            <span className="bar-score">
                <span className="bar-score-num">{bar.rating.toFixed(1)}</span>
                <span className="bar-score-den">/ 10</span>
            </span>

            <span className="bar-meter" aria-hidden="true">
                <span className="bar-meter-fill" style={{ width: `${bar.rating * 10}%` }} />
            </span>

            <span className="bar-reviews">
                {bar.reviews.toLocaleString()} beli {bar.reviews === 1 ? "review" : "reviews"}
            </span>

            <span className="bar-blurb">{bar.blurb}</span>

            <span className="bar-tags">
                {bar.tags.map((t) => (
                    <span className="bar-tag" key={t}>
                        {t}
                    </span>
                ))}
            </span>

            <span className="bar-cta">{selected ? "picked" : "pick this one"}</span>
        </button>
    );
}

function SaturdayDate() {
    const [pick, setPick] = useState(readStoredBar);
    const [justPicked, setJustPicked] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const chosen = BARS.find((b) => b.id === pick) || null;

    const select = useCallback((id) => {
        setPick((prev) => {
            if (prev === id) return prev;
            setJustPicked(true);
            try {
                window.localStorage.setItem(STORAGE_KEY, id);
            } catch {
                /* private browsing, no big deal */
            }
            return id;
        });
    }, []);

    const reset = useCallback(() => {
        setPick(null);
        setJustPicked(false);
        try {
            window.localStorage.removeItem(STORAGE_KEY);
        } catch {
            /* ignore */
        }
    }, []);

    useEffect(() => {
        if (!justPicked) return;
        const t = setTimeout(() => setJustPicked(false), 1400);
        return () => clearTimeout(t);
    }, [justPicked]);

    useEffect(() => {
        const prevTitle = document.title;
        document.title = "sweet saturday!!!!!";

        // Home.css paints body from --home-bg, which flips dark with the site theme.
        // Keep the paper color behind us so iOS overscroll does not flash it.
        const prevBg = document.body.style.background;
        document.body.style.background = "#fbf6ee";

        return () => {
            document.title = prevTitle;
            document.body.style.background = prevBg;
        };
    }, []);

    return (
        <div className="saturday-page">
            <DoodleDefs />
            <div className="paper-grain" aria-hidden="true" />

            <Reveal tag="header" className="sat-header">
                <div className="sat-header-art" aria-hidden="true">
                    <CoupleDoodle />
                </div>
                <p className="sat-kicker">an itinerary for one person only!</p>
                <p className="sat-from">to gloria, from austin</p>
                <h1 className="sat-title">sweet saturday!!!!!</h1>
                <p className="sat-sub">
                    the entire day planned by me, i'm so hyped and i hope you are too😁
                </p>
                <span className="sat-rule" aria-hidden="true" />
            </Reveal>

            <main className="sat-main">
                <ol className="timeline">
                    {SCHEDULE.map((item, i) => (
                        <TimelineItem key={item.id} item={item} index={i} />
                    ))}

                    {/* the one part of the day she gets to write */}
                    <Reveal
                        tag="li"
                        className="tl-item tl-item--choice"
                        style={{ "--accent": "var(--plum)" }}
                    >
                        <div className="tl-rail" aria-hidden="true">
                            <span className="tl-dot tl-dot--open" />
                        </div>

                        <div className="tl-card choice-card">
                            <p className="tl-time">8:45 pm</p>

                            <div className="tl-title-row">
                                <h3 className="tl-title">drinks</h3>
                                <button
                                    type="button"
                                    className={`hint-btn${showHint ? " is-open" : ""}`}
                                    aria-expanded={showHint}
                                    onClick={() => setShowHint((h) => !h)}
                                >
                                    <SketchBox />
                                    <span>{showHint ? "hide hint" : "hint"}</span>
                                </button>
                            </div>

                            <p className="tl-note">
                                this is where you decide! but if you can't decide click on hint next
                                to drinks! but two options, pick whichever one sounds right to you
                            </p>

                            {showHint && (
                                <p className="hint-text">
                                    austin is leaning towards a rooftop bar...
                                </p>
                            )}

                            <div
                                className="bar-grid"
                                role="radiogroup"
                                aria-label="pick where we go for drinks"
                            >
                                {BARS.map((bar) => (
                                    <BarCard
                                        key={bar.id}
                                        bar={bar}
                                        selected={pick === bar.id}
                                        dimmed={pick !== null && pick !== bar.id}
                                        onSelect={select}
                                    />
                                ))}
                            </div>

                            <div className="choice-status" aria-live="polite">
                                {chosen ? (
                                    <div className={`confirm${justPicked ? " is-fresh" : ""}`}>
                                        <SmallHeart />
                                        <p className="confirm-line">
                                            great choice. <strong>{chosen.name}</strong> it is.
                                        </p>
                                        <p className="confirm-sub">
                                            locked in for 8:45. i will handle getting us there.
                                        </p>
                                        <button type="button" className="confirm-reset" onClick={reset}>
                                            actually, let me change my mind
                                        </button>
                                    </div>
                                ) : (
                                    <p className="choice-waiting">waiting on you</p>
                                )}
                            </div>
                        </div>

                        <div className="tl-art" aria-hidden="true">
                            <DrinksDoodle />
                        </div>
                    </Reveal>

                    <TimelineItem item={FINALE} index={5} />
                </ol>

                <Reveal tag="section" className={`summary${chosen ? " is-complete" : ""}`}>
                    <h2 className="summary-title">the day, in one line</h2>
                    <p className="summary-line">
                        gym + run, ikea and whole foods, paint something super amazing, eat at
                        kokkaku, then drinks at{" "}
                        <span className={`summary-slot${chosen ? " is-filled" : ""}`}>
                            {chosen ? chosen.name : "_____"}
                        </span>
                        , then ice cream to fulfill the sweet saturday
                    </p>
                    {!chosen && (
                        <p className="summary-hint">
                            one blank left. scroll up and fill it in. and lmk what you choose!
                        </p>
                    )}
                </Reveal>
            </main>
        </div>
    );
}

export default SaturdayDate;
