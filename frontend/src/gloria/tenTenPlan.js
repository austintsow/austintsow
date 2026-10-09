import { useState, useEffect, useCallback } from "react";

/*
 * The 10/10 day itself: the stops, the clock, and the hooks the page runs on.
 */

export const DAY = "2026-10-10";

/* no way back to the archive until the day is done: midnight pacific going
   into sunday oct 11, i.e. 07:00 UTC (still PDT, DST ends nov 1) */
export const DRAWER_SHOWS_AT = Date.UTC(2026, 9, 11, 7, 0, 0);

export const at = (h, min = 0) => h * 60 + min;

export const STOPS = [
    { id: "gym", start: at(9), end: at(10, 30), title: "gym" },
    { id: "mall", start: at(11), end: at(13), title: "the mall", sub: "garage!!!!" },
    {
        id: "lunch",
        start: at(13, 15),
        end: at(14, 15),
        title: "lunch",
        choice: {
            key: "gloria-1010-journal-lunch",
            hint: "choose one!",
            options: [
                { id: "sushi", label: "sushi" },
                { id: "not-sushi", label: "not sushi" },
            ],
        },
    },
    { id: "groceries", start: at(14, 30), end: at(15, 15), title: "mi gao ingredients" },
    { id: "cook", start: at(15, 45), end: at(17, 15), title: "make mi gao" },
    {
        id: "after",
        start: at(17, 15),
        end: at(24),
        endLabel: "until bed",
        title: "your choice for the rest of the day!",
        choice: {
            key: "gloria-1010-journal-pick",
            hint: "choose one or both!",
            multi: true,
            options: [
                { id: "pumpkins", label: "paint pumpkins" },
                { id: "show", label: "watch our show" },
            ],
        },
    },
];

export function clock(mins) {
    const h24 = Math.floor(mins / 60);
    const m = mins % 60;
    return {
        time: `${((h24 + 11) % 12) + 1}:${String(m).padStart(2, "0")}`,
        half: h24 < 12 ? "am" : "pm",
    };
}

/* the date and minute of day in pacific, whatever timezone the phone is on */
function pacificNow() {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type).value;
    return {
        date: `${get("year")}-${get("month")}-${get("day")}`,
        minutes: Number(get("hour")) * 60 + Number(get("minute")),
    };
}

/* id of the stop happening right now on the day, otherwise null */
export function useActiveStop() {
    const [now, setNow] = useState(pacificNow);
    useEffect(() => {
        const id = setInterval(() => setNow(pacificNow()), 30000);
        return () => clearInterval(id);
    }, []);
    if (now.date !== DAY) return null;
    const hit = STOPS.find((s) => now.minutes >= s.start && now.minutes < s.end);
    return hit ? hit.id : null;
}

/* the ticked options of a stop, remembered across reloads. on a multi stop each
   tick toggles on its own; otherwise ticking one replaces the last */
export function useStoredPicks(storageKey, options, multi = false) {
    const [picks, setPicks] = useState(() => {
        try {
            const saved = (window.localStorage.getItem(storageKey) || "").split(",");
            return options.map((o) => o.id).filter((id) => saved.includes(id));
        } catch {
            return [];
        }
    });

    const pick = useCallback(
        (id) => {
            let next = [id];
            if (multi) next = picks.includes(id) ? picks.filter((x) => x !== id) : [...picks, id];
            setPicks(next);
            try {
                window.localStorage.setItem(storageKey, next.join(","));
            } catch {
                /* private browsing: the picks just won't survive a reload */
            }
        },
        [storageKey, multi, picks]
    );

    return [picks, pick];
}

/* page title + body colour for the time a page is mounted */
export function usePageChrome(title, background) {
    useEffect(() => {
        const prev = document.title;
        document.title = title;
        const prevBg = document.body.style.background;
        document.body.style.background = background;
        return () => {
            document.title = prev;
            document.body.style.background = prevBg;
        };
    }, [title, background]);
}
