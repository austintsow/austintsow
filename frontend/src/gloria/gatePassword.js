/*
 * Shared password plumbing for the gates in here (the front door and the paper
 * gate on sweet saturday). Both gates match the same forgiving way and both
 * remember an unlock for the session, so that logic lives here once instead of
 * drifting apart in two files.
 */

/* case, stray spaces and end punctuation all get ignored, so "Austin Is The
   Best!" opens the same door as the typed-perfect version */
export function normalizeAnswer(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ")
        .replace(/[.!?,]+$/, "");
}

export function isAnswer(value, answers) {
    return answers.includes(normalizeAnswer(value));
}

/* sessionStorage, not local: a refresh does not re-prompt, a new visit does.
   Every gate passes its own key so unlocking one never unlocks another. */
export function readUnlocked(key) {
    try {
        return window.sessionStorage.getItem(key) === "1";
    } catch {
        return false;
    }
}

export function markUnlocked(key) {
    try {
        window.sessionStorage.setItem(key, "1");
    } catch {
        /* private browsing, she just retypes it next time */
    }
}
