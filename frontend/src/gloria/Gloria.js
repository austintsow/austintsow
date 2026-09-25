import { useState, useEffect } from "react";
import "./Gloria.css";
import FilingCabinet from "./FilingCabinet";
import { isAnswer, readUnlocked, markUnlocked } from "./gatePassword";

/*
 * the front door. Styled to match the archive sitting behind it: white,
 * hairlines, Inter, neutral greys. The warm paper version of this screen moved
 * to PaperGate.js, where its palette still fits.
 */

/* the one the passwords page quotes is first */
export const ARCHIVE_ANSWERS = ["gloriasarchive"];

const UNLOCK_KEY = "gloria-gate-open";

function HeartIcon() {
    return (
        <svg className="ag-heart" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 20.5 C 4.5 14.8, 2 10.2, 4.8 6.4 C 7.4 3.1, 11.1 5.3, 12 8.1 C 12.9 5.3, 16.6 3.1, 19.2 6.4 C 22 10.2, 19.5 14.8, 12 20.5 Z" />
        </svg>
    );
}

function Gloria() {
    // gate -> loveNote -> archive. Coming back within the session skips straight
    // to the archive so she does not sit through the note every refresh.
    const [stage, setStage] = useState(() => (readUnlocked(UNLOCK_KEY) ? "archive" : "gate"));
    const [value, setValue] = useState("");
    const [wrong, setWrong] = useState(false);

    const gated = stage !== "archive";

    useEffect(() => {
        if (!gated) return undefined;
        const prev = document.title;
        document.title = "the archive";
        // Home.css paints body from --home-bg, which flips dark with the site
        // theme, so pin it white behind this screen
        const prevBg = document.body.style.background;
        document.body.style.background = "#ffffff";
        return () => {
            document.title = prev;
            document.body.style.background = prevBg;
        };
    }, [gated]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAnswer(value, ARCHIVE_ANSWERS)) {
            markUnlocked(UNLOCK_KEY);
            setStage("loveNote");
            return;
        }
        setWrong(true);
        setTimeout(() => setWrong(false), 600);
    };

    if (stage === "archive") {
        return <FilingCabinet />;
    }

    if (stage === "loveNote") {
        return (
            <div className="ag-page">
                <div className="ag-card">
                    <div className="ag-body ag-note">
                        <HeartIcon />
                        <p className="ag-note-line">
                            i'm so grateful that you think i'm the best 🥹 i love you!!!!!
                        </p>
                        <button
                            type="button"
                            className="ag-go ag-note-go"
                            onClick={() => setStage("archive")}
                            autoFocus
                        >
                            "of course because you're the goat!" said gloria (okay now click here)
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ag-page">
            <div className={`ag-card${wrong ? " is-wrong" : ""}`}>
                <div className="ag-body">
                    <h1 className="ag-title">archive</h1>

                    <form className="ag-form" onSubmit={handleSubmit}>
                        <input
                            className="ag-input"
                            type="text"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                setWrong(false);
                            }}
                            placeholder="password"
                            aria-label="password"
                            autoFocus
                            autoComplete="off"
                            autoCapitalize="none"
                            autoCorrect="off"
                            spellCheck="false"
                        />
                        <button type="submit" className="ag-go">
                            open
                        </button>
                    </form>

                    {/* the only thing left besides the box: without hints she
                        needs to know a wrong answer registered */}
                    <p className="ag-status" role="status">
                        {wrong ? "that's not it. try again" : " "}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Gloria;
