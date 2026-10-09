import { useState, useEffect } from "react";

/*
 * true once an absolute instant has passed, flipping live if the page is left
 * open across it.
 *
 * Pass a Date.UTC(...) value, never a local-time Date: a local Date fires at
 * whatever midnight the device believes in, so a phone set east of pacific
 * would trip early. setTimeout also overflows past ~24.8 days and fires
 * immediately, so long waits are chained in shorter hops.
 */
export default function useShowAfter(instant) {
    const [shown, setShown] = useState(() => Date.now() >= instant);

    useEffect(() => {
        if (shown) return undefined;
        let timer;
        const tick = () => {
            const left = instant - Date.now();
            if (left <= 0) {
                setShown(true);
                return;
            }
            timer = setTimeout(tick, Math.min(left, 2000000000));
        };
        tick();
        return () => clearTimeout(timer);
    }, [instant, shown]);

    return shown;
}
