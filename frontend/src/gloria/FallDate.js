import { useState, useEffect, useCallback } from "react";
import "./FallDate.css";
import ArchiveBack from "./ArchiveBack";
import {
    ValleyScene,
    MazeIcon,
    CannonIcon,
    DrinkIcon,
    PumpkinIcon,
    FerrisIcon,
    GlassIcon,
    Leaf,
} from "./FallArt";

/*
 * remlinger farms punch card.
 *
 * She'll be holding this on a phone in a field, so every stop is one big tap
 * target, punches survive a reload, and nothing needs hover. The fine print on
 * each stop is the real detail from the farm's site (what it costs, what the
 * wristband gets you) so the card is actually useful while standing there.
 */

const STORAGE_KEY = "gloria-remlinger-punches";

/* The way back to the archive stays hidden until the date is over, so the card
   is the only thing on screen while we're actually at the farm.

   Pinned to an absolute instant rather than the device clock: midnight pacific
   on sunday sep 27 2026, which is 07:00 UTC that day (pacific runs UTC-7 until
   DST ends nov 1, so it is PDT on that date, not PST). Date.UTC gives the same
   moment on every device. A local-time Date would instead fire at whatever
   midnight her phone believes in, and a phone set anywhere east of pacific
   would uncover the link while we were still at the farm. */
const BACK_LINK_SHOWS_AT = Date.UTC(2026, 8, 27, 7, 0, 0);

const STOPS = [
    {
        id: "maze",
        name: "corn maze",
        Art: MazeIcon,
        note: "the 425 magazine maze! with a scavenger hunt hidden inside it",
        tone: "gold",
    },
    {
        id: "cannon",
        name: "apple cannon",
        Art: CannonIcon,
        note: "we shoot a bucket of apples out of a cannon!",
        tone: "green",
    },
    {
        id: "drink",
        name: "caramel apple delight",
        Art: DrinkIcon,
        note: "let's try their signature caramel apple drink 😋",
        tone: "caramel",
    },
    {
        id: "patch",
        name: "the pumpkin patch",
        Art: PumpkinIcon,
        note: "grabs a pumpkin or pumpkins to carve????",
        tone: "orange",
    },
    {
        id: "ferris",
        name: "ferris wheel",
        Art: FerrisIcon,
        note: "it's like the big wheel in seattle but not so big",
        tone: "rust",
    },
    {
        id: "glass",
        name: "the glass studio",
        Art: GlassIcon,
        note: "they blow miniature glass pumpkins while you stand and watch 😃",
        tone: "sky",
    },
];

function readPunches() {
    try {
        const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(raw) ? raw.filter((id) => STOPS.some((s) => s.id === id)) : [];
    } catch {
        return [];
    }
}

function FallDate() {
    const [punched, setPunched] = useState(readPunches);
    const [justPunched, setJustPunched] = useState(null);
    const [showBack, setShowBack] = useState(() => Date.now() >= BACK_LINK_SHOWS_AT);

    const done = punched.length;
    const complete = done === STOPS.length;

    useEffect(() => {
        if (showBack) return;
        let timer;
        const tick = () => {
            const left = BACK_LINK_SHOWS_AT - Date.now();
            if (left <= 0) {
                setShowBack(true);
                return;
            }
            // setTimeout overflows past ~24.8 days and would fire immediately,
            // so chain shorter waits instead of trusting one long one
            timer = setTimeout(tick, Math.min(left, 2000000000));
        };
        tick();
        return () => clearTimeout(timer);
    }, [showBack]);

    useEffect(() => {
        const prev = document.title;
        document.title = "remlinger farms";
        const prevBg = document.body.style.background;
        document.body.style.background = "#f6efdf";
        return () => {
            document.title = prev;
            document.body.style.background = prevBg;
        };
    }, []);

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(punched));
        } catch {
            /* private browsing, the card just won't remember */
        }
    }, [punched]);

    useEffect(() => {
        if (!justPunched) return;
        const t = setTimeout(() => setJustPunched(null), 700);
        return () => clearTimeout(t);
    }, [justPunched]);

    const toggle = useCallback((id) => {
        setPunched((prev) => {
            if (prev.includes(id)) return prev.filter((x) => x !== id);
            setJustPunched(id);
            return [...prev, id];
        });
    }, []);

    const reset = useCallback(() => setPunched([]), []);

    return (
        <div className="fall-page">
            {showBack && <ArchiveBack tone="light" />}

            <div className="fall-sky" aria-hidden="true">
                <ValleyScene />
                <Leaf className="l1" />
                <Leaf className="l2" />
                <Leaf className="l3" />
            </div>

            <header className="fall-header">
                <p className="fall-kicker">a very fall date at...</p>
                <h1 className="fall-title">
                    remlinger farms 👨‍🌾 👩‍🌾 🎃 🍁 🧣
                </h1>
                <p className="fall-meta">
                    <span>our date from 11am to however long it takes us to complete this card!</span>
                </p>
            </header>

            <main className="fall-card">
                <div className="fall-card-top">
                    <div>
                        <p className="fall-card-label">the punch card</p>
                        <h2 className="fall-card-name">gloria &amp; austin</h2>
                    </div>
                    <div className="fall-count" aria-live="polite">
                        <span className="fall-count-num">{done}</span>
                        <span className="fall-count-of">of {STOPS.length}</span>
                    </div>
                </div>

                <div className="fall-track" aria-hidden="true">
                    <span
                        className="fall-track-fill"
                        style={{ width: `${(done / STOPS.length) * 100}%` }}
                    />
                </div>

                <p className="fall-howto">tap one when we&rsquo;ve done it.</p>

                <ul className="fall-stops">
                    {STOPS.map((stop, i) => {
                        const isPunched = punched.includes(stop.id);
                        return (
                            <li key={stop.id} className="fall-stop" data-tone={stop.tone}>
                                <button
                                    type="button"
                                    className={`fall-slot${isPunched ? " is-punched" : ""}${
                                        justPunched === stop.id ? " is-fresh" : ""
                                    }`}
                                    aria-pressed={isPunched}
                                    onClick={() => toggle(stop.id)}
                                >
                                    <span className="fall-hole" aria-hidden="true">
                                        <span className="fall-hole-num">{i + 1}</span>
                                    </span>

                                    <span className="fall-art" aria-hidden="true">
                                        <stop.Art />
                                        <span className="fall-stamp">done</span>
                                    </span>

                                    <span className="fall-text">
                                        <span className="fall-name">{stop.name}</span>
                                        <span className="fall-note">{stop.note}</span>
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>

                <div className="fall-stub">
                    {complete ? (
                        <div className="fall-prize">
                            <p className="fall-prize-line">card&rsquo;s full!!!</p>
                            <p className="fall-prize-sub">
                                we've completed our remlinger date! i&rsquo;d do this whole day over and over again. thank you for a perfect fall saturday, gloria. i love you so much 💌
                            </p>
                            <button type="button" className="fall-reset" onClick={reset}>
                                clear the card
                            </button>
                        </div>
                    ) : (
                        <p className="fall-stub-line">
                            {STOPS.length - done} remaining 🎃
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default FallDate;
