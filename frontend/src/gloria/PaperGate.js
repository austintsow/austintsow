import { useState } from "react";
import "./SaturdayDate.css";
import "./PaperGate.css";
import ArchiveBack from "./ArchiveBack";
import { DoodleDefs, EnvelopeDoodle, SketchBox } from "./SaturdayDoodles";
import { isAnswer, readUnlocked, markUnlocked } from "./gatePassword";

/*
 * The warm paper password gate: sealed envelope, serif heading, plum button,
 * sketch-outline hint button.
 *
 * It started out as the front door in Gloria.js, borrowing this palette from
 * SaturdayDate.css. The front door is white now, so the whole look moved here
 * and guards the pages it already matched. Wrapping, not gating by route, so
 * the page behind it keeps its own state once it opens.
 *
 * Styles are namespaced .pg-* because CRA bundles every stylesheet globally;
 * .doodle / .hint-btn / .sketch-box come from SaturdayDate.css on purpose, and
 * PaperGate.css re-declares the paper variables they read.
 */
function PaperGate({
    answers,
    hints = [],
    storageKey,
    kicker = "one small thing first",
    title = "password, please",
    children,
}) {
    const [unlocked, setUnlocked] = useState(() => readUnlocked(storageKey));
    const [value, setValue] = useState("");
    const [wrong, setWrong] = useState(false);
    const [hintsShown, setHintsShown] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAnswer(value, answers)) {
            markUnlocked(storageKey);
            setUnlocked(true);
            return;
        }
        setWrong(true);
        setTimeout(() => setWrong(false), 600);
    };

    if (unlocked) {
        return children;
    }

    const outOfHints = hintsShown >= hints.length;

    return (
        <div className="pg-page">
            <ArchiveBack tone="light" />
            <DoodleDefs />

            <div className={`pg-card${wrong ? " is-wrong" : ""}`}>
                <div className="pg-art" aria-hidden="true">
                    <EnvelopeDoodle />
                </div>

                <p className="pg-kicker">{kicker}</p>
                <h1 className="pg-title">{title}</h1>

                <form className="pg-form" onSubmit={handleSubmit}>
                    <input
                        className="pg-input"
                        type="text"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            setWrong(false);
                        }}
                        placeholder="type it here"
                        aria-label="password"
                        autoFocus
                        autoComplete="off"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                    <button type="submit" className="pg-go">
                        go
                    </button>
                </form>

                <p className="pg-status" role="status">
                    {wrong ? "nope, not it. try again" : " "}
                </p>

                {hintsShown > 0 && (
                    <ul className="pg-hints">
                        {hints.slice(0, hintsShown).map((hint) => (
                            <li className="pg-hint" key={hint}>
                                {hint}
                            </li>
                        ))}
                    </ul>
                )}

                {hints.length > 0 && (
                    <button
                        type="button"
                        className="hint-btn pg-hint-btn"
                        disabled={outOfHints}
                        onClick={() => setHintsShown((n) => Math.min(n + 1, hints.length))}
                    >
                        <SketchBox />
                        <span>
                            {outOfHints
                                ? "that's all i've got"
                                : hintsShown === 0
                                ? "hint"
                                : "another hint"}
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default PaperGate;
