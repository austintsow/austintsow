import { useState } from "react";
import "./Gloria.css";
import "./SaturdayDate.css";
import SaturdayDate from "./SaturdayDate";
import { DoodleDefs, EnvelopeDoodle, SketchBox, SmallHeart } from "./SaturdayDoodles";

/* both phrasings open it, so she cannot get it "nearly right" and be told no */
const ANSWERS = ["austin is the best", "austin is the best ever"];
const UNLOCK_KEY = "gloria-gate-open";

const HINTS = [
    "who is the best ever?",
    "four words. the first one is a name you say a lot.",
    "austin is the ____",
];

/* forgiving match: case, stray spaces and end punctuation all get ignored */
function normalize(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ")
        .replace(/[.!?,]+$/, "");
}

function readUnlocked() {
    try {
        return window.sessionStorage.getItem(UNLOCK_KEY) === "1";
    } catch {
        return false;
    }
}

function Gloria() {
    // gate -> loveNote -> plan. Coming back within the session skips to the plan
    // so she does not sit through the note every refresh.
    const [stage, setStage] = useState(() => (readUnlocked() ? "plan" : "gate"));
    const [value, setValue] = useState("");
    const [wrong, setWrong] = useState(false);
    const [hintsShown, setHintsShown] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ANSWERS.includes(normalize(value))) {
            try {
                window.sessionStorage.setItem(UNLOCK_KEY, "1");
            } catch {
                /* private browsing, she just retypes it */
            }
            setStage("loveNote");
            return;
        }
        setWrong(true);
        setTimeout(() => setWrong(false), 600);
    };

    if (stage === "plan") {
        return <SaturdayDate />;
    }

    if (stage === "loveNote") {
        return (
            <div className="gloria-page gate-page">
                <DoodleDefs />
                <div className="gate-card love-note">
                    <SmallHeart className="love-note-heart" />
                    <p className="love-note-line">
                        i'm so grateful that you think i'm the best 🥹 i love you!!!!!
                    </p>
                    <button
                        type="button"
                        className="gate-go love-note-go"
                        onClick={() => setStage("plan")}
                        autoFocus
                    >
                        "of course because you're the goat!" said gloria (okay now click here)
                    </button>
                </div>
            </div>
        );
    }

    const outOfHints = hintsShown >= HINTS.length;

    return (
        <div className="gloria-page gate-page">
            <DoodleDefs />

            <div className={`gate-card${wrong ? " is-wrong" : ""}`}>
                <div className="gate-art" aria-hidden="true">
                    <EnvelopeDoodle />
                </div>

                <p className="gate-kicker">one small thing first</p>
                <h1 className="gate-title">password, please</h1>

                <form className="gate-form" onSubmit={handleSubmit}>
                    <input
                        className="gate-input"
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
                    <button type="submit" className="gate-go">
                        go
                    </button>
                </form>

                <p className="gate-status" role="status">
                    {wrong ? "nope, not it. try again" : " "}
                </p>

                {hintsShown > 0 && (
                    <ul className="gate-hints">
                        {HINTS.slice(0, hintsShown).map((hint) => (
                            <li className="gate-hint" key={hint}>
                                {hint}
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    type="button"
                    className="hint-btn gate-hint-btn"
                    disabled={outOfHints}
                    onClick={() => setHintsShown((n) => Math.min(n + 1, HINTS.length))}
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
            </div>
        </div>
    );
}

export default Gloria;
