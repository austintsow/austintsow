import React, { useEffect, useRef } from "react";
import photo from "./austin.jpg";
import "./Loader.css";

// tracks real load milestones: the about photo, fonts, and the window load
// event. the bar only advances when something actually finishes, so it holds
// in place while things are still buffering.
export default function Loader({ onDone }) {
    const rootRef = useRef(null);
    const barRef = useRef(null);
    const pctRef = useRef(null);

    useEffect(() => {
        let cancelled = false;
        let done = 0;
        const total = 3;

        const img = new Image();
        const imgReady = new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
        });
        img.src = photo;

        const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

        const pageReady =
            document.readyState === "complete"
                ? Promise.resolve()
                : new Promise((resolve) =>
                      window.addEventListener("load", resolve, { once: true })
                  );

        [imgReady, fontsReady, pageReady].forEach((p) =>
            p.then(() => {
                if (!cancelled) done += 1;
            })
        );

        let raf;
        let shown = 0;
        const tick = () => {
            if (cancelled) return;
            const goal = (done / total) * 100;
            shown += (goal - shown) * 0.1;
            if (goal >= 100 && shown > 99.2) shown = 100;
            if (barRef.current) barRef.current.style.width = `${shown}%`;
            if (pctRef.current) pctRef.current.textContent = `${Math.round(shown)}%`;
            if (shown === 100) {
                if (rootRef.current) rootRef.current.classList.add("loader-out");
                setTimeout(() => {
                    if (!cancelled) onDone();
                }, 500);
                return;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelled = true;
            cancelAnimationFrame(raf);
        };
    }, [onDone]);

    return (
        <div className="loader" ref={rootRef}>
            <div className="loader-box">
                <div className="loader-row">
                    <span className="loader-label">austintsow.com</span>
                    <span className="loader-pct" ref={pctRef}>
                        0%
                    </span>
                </div>
                <div className="loader-track">
                    <div className="loader-bar" ref={barRef} />
                </div>
            </div>
        </div>
    );
}
