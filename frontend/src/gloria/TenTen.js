import { useEffect } from "react";
import "./TenTen.css";
import ArchiveBack from "./ArchiveBack";
import useShowAfter from "./useShowAfter";
import {
    STOPS,
    DRAWER_SHOWS_AT,
    at,
    clock,
    useActiveStop,
    useStoredPicks,
    usePageChrome,
} from "./tenTenPlan";
import { JournalDefs, INKS, Bouquet, Blossom, Washi, Tick } from "./JournalArt";

/*
 * a 10/10 chilly day.
 *
 * Built like a real planner page: the date, the hour column and the rules are
 * "printed" (a serif), everything we're doing is "written in" (a pen script),
 * and each stop is time-blocked in coloured pencil across the hours it takes.
 */

const FONTS =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Nanum+Pen+Script&display=swap";

const GRID_START = at(9);
const GRID_END = at(22);
const HOUR = 64;

const INK_FOR = {
    gym: "sage",
    mall: "rose",
    lunch: "butter",
    groceries: "peach",
    cook: "lavender",
    after: "blush",
};

const HOURS = Array.from({ length: (GRID_END - GRID_START) / 60 + 1 }, (_, i) => GRID_START + i * 60);

/* fonts only this page uses, so they're requested here rather than site-wide */
function useJournalFonts() {
    useEffect(() => {
        if (document.querySelector(`link[href="${FONTS}"]`)) return;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = FONTS;
        document.head.appendChild(link);
    }, []);
}

/* radios when it's one or the other, checkboxes when both is allowed */
function Checks({ choice, picks, onPick, label }) {
    return (
        <div className="jr-checks" role={choice.multi ? "group" : "radiogroup"} aria-label={label}>
            {choice.options.map((o) => {
                const on = picks.includes(o.id);
                return (
                    <button
                        key={o.id}
                        type="button"
                        role={choice.multi ? "checkbox" : "radio"}
                        aria-checked={on}
                        className={`jr-check${on ? " is-on" : ""}`}
                        onClick={() => onPick(o.id)}
                    >
                        <Tick on={on} />
                        <span>{o.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

/* a stop with options starts with none ticked and a nudge to pick */
function ChoiceBlock({ stop, isNow }) {
    const { key, options, multi } = stop.choice;
    const [picks, pick] = useStoredPicks(key, options, multi);
    return <Block stop={stop} isNow={isNow} picks={picks} onPick={pick} />;
}

function Block({ stop, isNow, picks = [], onPick }) {
    const ink = INK_FOR[stop.id];
    const end = Math.min(stop.end, GRID_END);
    const top = ((stop.start - GRID_START) / 60) * HOUR;
    const height = ((end - stop.start) / 60) * HOUR - 4;
    const from = clock(stop.start).time;
    const to = stop.endLabel ? "bed" : clock(stop.end).time;

    return (
        <div
            className={`jr-block jr-block--${stop.id}${stop.end > GRID_END ? " is-open" : ""}${isNow ? " is-now" : ""}`}
            style={{ top, height, "--ink": INKS[ink] }}
        >
            <svg className="jr-block-fill" aria-hidden="true" focusable="false">
                <rect width="100%" height="100%" fill={`url(#jr-hatch-${ink})`} filter="url(#jr-grain)" />
                <rect width="3.5" height="100%" fill={INKS[ink]} filter="url(#jr-grain)" />
            </svg>

            <div className="jr-block-body">
                <div className="jr-line1">
                    <span className="jr-entry">
                        {stop.title}
                        {stop.choice && picks.length === 0 && <span className="jr-hint"> ({stop.choice.hint})</span>}
                    </span>
                    {isNow ? (
                        <span className="jr-now">now</span>
                    ) : (
                        <span className="jr-when">
                            {from} &ndash; {to}
                        </span>
                    )}
                </div>
                {stop.sub && <span className="jr-sub">{stop.sub}</span>}
                {stop.choice && (
                    <Checks choice={stop.choice} picks={picks} onPick={onPick} label={stop.title} />
                )}
            </div>
        </div>
    );
}

function TenTen() {
    const showDrawer = useShowAfter(DRAWER_SHOWS_AT);
    const active = useActiveStop();
    usePageChrome("a 10/10 chilly day", "#efe9de");
    useJournalFonts();

    return (
        <div className="jr-page">
            <JournalDefs />
            {showDrawer && <ArchiveBack tone="light" />}

            <article className="jr-paper">
                <header className="jr-head">
                    <div className="jr-date">
                        <span className="jr-dow">saturday</span>
                        <span className="jr-num">10</span>
                        <span className="jr-month">october 2026</span>
                    </div>
                    <div className="jr-pinned">
                        <Washi className="jr-washi--top" />
                        <Bouquet />
                    </div>
                </header>

                <h1 className="jr-title">
                    a 10/10 chilly day
                    <svg className="jr-swash" viewBox="0 0 220 14" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                        <path filter="url(#jr-line)" d="M3 9 C 50 4, 120 3, 216 6 C 160 8, 90 10, 40 12" />
                    </svg>
                    <Blossom ink="sky" className="jr-blossom--title" />
                </h1>

                <section className="jr-sched" aria-label="the day">
                    <p className="jr-label">schedule</p>

                    <div className="jr-grid" style={{ height: ((GRID_END - GRID_START) / 60) * HOUR }}>
                        {HOURS.map((m, i) => {
                            const top = ((m - GRID_START) / 60) * HOUR;
                            const last = i === HOURS.length - 1;
                            return (
                                <div
                                    className={`jr-hour${last ? " jr-hour--last" : ""}`}
                                    style={{ top }}
                                    key={m}
                                    aria-hidden="true"
                                >
                                    <span>{Number(clock(m).time.split(":")[0])}</span>
                                </div>
                            );
                        })}

                        {STOPS.map((s) =>
                            s.choice ? (
                                <ChoiceBlock key={s.id} stop={s} isNow={active === s.id} />
                            ) : (
                                <Block key={s.id} stop={s} isNow={active === s.id} />
                            )
                        )}

                        <Blossom ink="rose" className="jr-blossom--low" />
                    </div>
                </section>
            </article>
        </div>
    );
}

export default TenTen;
