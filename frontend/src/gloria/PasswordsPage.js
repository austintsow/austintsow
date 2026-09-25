import { useState, useEffect, useCallback } from "react";
import "./PasswordsPage.css";
import ArchiveBack from "./ArchiveBack";
import { ARCHIVE_ANSWERS } from "./Gloria";
import { SATURDAY_ANSWERS } from "./SaturdayDate";
import { FESTIVE_PASSWORD } from "./FestiveEvening";

/*
 * The cheat sheet, for when a page asks her for a password.
 *
 * Every value below is imported from the component that actually checks it, so
 * changing a password in one place can never leave this page lying and lock her
 * out. Never hand-copy one in here.
 */

const KEYS = [
    {
        id: "gate",
        where: "the front door",
        path: "/gloria",
        value: ARCHIVE_ANSWERS[0],
        also: ARCHIVE_ANSWERS.slice(1),
        note: "all one word, no space. capitals don't matter.",
    },
    {
        id: "saturday",
        where: "sweet saturday",
        path: "/gloria/saturday",
        value: SATURDAY_ANSWERS[0],
        also: SATURDAY_ANSWERS.slice(1),
        note: "the september 2026 one. capitals and stray spaces don't matter.",
    },
    {
        id: "festive",
        where: "a festive evening",
        path: "/gloria/festive",
        value: FESTIVE_PASSWORD,
        also: [],
        note: "the december 2025 one. all one word.",
    },
];

function PasswordsPage() {
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        const prev = document.title;
        document.title = "passwords";
        const prevBg = document.body.style.background;
        document.body.style.background = "#ffffff";
        return () => {
            document.title = prev;
            document.body.style.background = prevBg;
        };
    }, []);

    useEffect(() => {
        if (!copied) return;
        const t = setTimeout(() => setCopied(null), 1600);
        return () => clearTimeout(t);
    }, [copied]);

    const copy = useCallback(async (id, value) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(id);
        } catch {
            /* older browser or no permission, she can still read and type it */
        }
    }, []);

    return (
        <div className="pw-page">
            <ArchiveBack tone="light" />

            <header className="pw-header">
                <h1 className="pw-title">passwords</h1>
                <p className="pw-sub">
                    for whenever something asks. tap one to copy it.
                </p>
            </header>

            <ul className="pw-list">
                {KEYS.map((k) => (
                    <li className="pw-item" key={k.id}>
                        <div className="pw-meta">
                            <span className="pw-where">{k.where}</span>
                            <code className="pw-path">{k.path}</code>
                        </div>

                        <button
                            type="button"
                            className={`pw-value${copied === k.id ? " is-copied" : ""}`}
                            onClick={() => copy(k.id, k.value)}
                        >
                            <code>{k.value}</code>
                            <span className="pw-copy">{copied === k.id ? "copied" : "copy"}</span>
                        </button>

                        <p className="pw-note">
                            {k.note}
                            {k.also.length > 0 && (
                                <>
                                    {" "}
                                    &ldquo;{k.also.join('", "')}&rdquo; works too.
                                </>
                            )}
                        </p>
                    </li>
                ))}
            </ul>

            <p className="pw-foot">
                that&rsquo;s all of them. nothing else in here is locked.
            </p>
        </div>
    );
}

export default PasswordsPage;
