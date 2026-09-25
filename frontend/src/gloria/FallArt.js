import React from "react";

/*
 * Cartoon art for the remlinger punch card. Flat fills with a heavy outline on
 * top, no gradients, so it stays readable at thumbnail size on a phone in
 * daylight. Fills sit in their own group underneath the ink so the outline
 * always wins.
 */

function Icon({ fills, ink, viewBox = "0 0 100 100" }) {
    return (
        <svg className="fa-svg" viewBox={viewBox} aria-hidden="true" focusable="false">
            <g className="fa-fills">{fills}</g>
            <g className="fa-ink">{ink}</g>
        </svg>
    );
}

/* the misty valley you drive into on the way out to carnation.
   Deliberately wide (1200x170): the container slices it horizontally, so a
   narrow phone still keeps the mountain and the ridge line in frame. */
export function ValleyScene() {
    return (
        <svg
            className="fall-scene"
            viewBox="0 0 1200 170"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden="true"
            focusable="false"
        >
            <path
                className="s-ridge-far"
                d="M0 104 L 120 74 L 210 96 L 320 60 L 430 92 L 520 70 L 600 44 L 690 76 L 790 58 L 900 94 L 1010 68 L 1110 96 L 1200 78 L 1200 170 L 0 170 Z"
            />
            <path className="s-mtn" d="M470 108 L 600 30 L 648 62 L 682 40 L 800 108 Z" />
            <path
                className="s-snow"
                d="M600 30 L 628 54 L 612 60 L 636 66 L 660 56 L 682 40 L 664 34 L 640 48 Z"
            />
            <path
                className="s-ridge-near"
                d="M0 132 C 130 116, 250 138, 380 126 C 510 114, 620 136, 750 128 C 880 120, 1000 142, 1120 124 L 1200 130 L 1200 170 L 0 170 Z"
            />
            <g className="s-trees">
                <path d="M60 156 L 82 100 L 104 156 Z" />
                <path d="M108 159 L 126 112 L 144 159 Z" />
                <path d="M300 155 L 322 102 L 344 155 Z" />
                <path d="M350 160 L 366 118 L 382 160 Z" />
                <path d="M560 158 L 580 110 L 600 158 Z" />
                <path d="M612 155 L 634 98 L 656 155 Z" />
                <path d="M840 157 L 860 106 L 880 157 Z" />
                <path d="M886 160 L 902 118 L 918 160 Z" />
                <path d="M1060 156 L 1082 104 L 1104 156 Z" />
                <path d="M1110 159 L 1126 116 L 1142 159 Z" />
            </g>
        </svg>
    );
}

export function MazeIcon() {
    return (
        <Icon
            fills={
                <>
                    <rect className="f-gold" x="18" y="22" width="64" height="62" rx="9" />
                    <circle className="f-rust" cx="68" cy="70" r="6" />
                </>
            }
            ink={
                <>
                    <rect x="18" y="22" width="64" height="62" rx="9" />
                    <path d="M18 40 L 46 40 L 46 56" />
                    <path d="M82 38 L 62 38 L 62 60 L 44 60" />
                    <path d="M32 84 L 32 68 L 54 68" />
                    <path d="M18 62 L 30 62" />
                    <path d="M68 84 L 68 76" />
                    <circle className="dot" cx="68" cy="70" r="5" />
                    {/* corn leaves at the base */}
                    <path d="M40 22 C 36 12, 46 6, 50 14" />
                    <path d="M56 22 C 62 12, 72 16, 68 24" />
                </>
            }
        />
    );
}

export function CannonIcon() {
    return (
        <Icon
            fills={
                <>
                    <path className="f-green" d="M20 78 L 44 42 L 66 56 L 40 90 Z" />
                    <circle className="f-red" cx="76" cy="26" r="11" />
                    <rect className="f-brown" x="14" y="80" width="42" height="10" rx="5" />
                </>
            }
            ink={
                <>
                    <rect x="14" y="80" width="42" height="10" rx="5" />
                    <path d="M20 78 L 44 42 L 66 56 L 40 90 Z" />
                    <path d="M44 42 L 66 56" />
                    <circle cx="76" cy="26" r="11" />
                    <path d="M76 15 C 74 9, 78 7, 80 10" />
                    <path className="thin" d="M58 44 L 64 38" />
                    <path className="thin" d="M62 54 L 70 50" />
                    <path className="thin" d="M52 34 L 55 27" />
                </>
            }
        />
    );
}

export function DrinkIcon() {
    return (
        <Icon
            fills={
                <>
                    <path className="f-caramel" d="M28 46 L 72 46 L 67 88 C 66 92, 34 92, 33 88 Z" />
                    <path className="f-cream" d="M32 46 C 32 30, 68 30, 68 46 Z" />
                    <circle className="f-red" cx="50" cy="20" r="12" />
                </>
            }
            ink={
                <>
                    <path d="M28 46 L 72 46 L 67 88 C 66 92, 34 92, 33 88 Z" />
                    <path d="M26 46 L 74 46" />
                    <path d="M32 46 C 34 36, 40 32, 44 33" />
                    <path d="M68 46 C 66 36, 60 32, 56 33" />
                    <circle cx="50" cy="20" r="12" />
                    <path d="M50 8 L 50 2" />
                    <path className="thin" d="M36 60 C 40 64, 40 70, 36 74" />
                    <path className="thin" d="M64 58 C 60 63, 60 69, 64 73" />
                </>
            }
        />
    );
}

export function PumpkinIcon() {
    return (
        <Icon
            fills={
                <>
                    <ellipse className="f-orange" cx="50" cy="60" rx="34" ry="28" />
                    <rect className="f-brown" x="46" y="24" width="9" height="12" rx="4" />
                </>
            }
            ink={
                <>
                    <ellipse cx="50" cy="60" rx="34" ry="28" />
                    <path d="M50 33 C 42 42, 42 78, 50 88" />
                    <path d="M32 36 C 26 46, 26 74, 32 84" />
                    <path d="M68 36 C 74 46, 74 74, 68 84" />
                    <path d="M50 33 L 50 26" />
                    <path d="M52 26 C 60 18, 72 22, 70 32" />
                </>
            }
        />
    );
}

export function FerrisIcon() {
    return (
        <Icon
            fills={
                <>
                    <circle className="f-gold" cx="50" cy="12" r="7.5" />
                    <circle className="f-rust" cx="82" cy="44" r="7.5" />
                    <circle className="f-gold" cx="50" cy="76" r="7.5" />
                    <circle className="f-rust" cx="18" cy="44" r="7.5" />
                    <circle className="f-orange" cx="50" cy="44" r="5" />
                </>
            }
            ink={
                <>
                    <circle cx="50" cy="44" r="32" />
                    <path className="thin" d="M18 44 L 82 44" />
                    <path className="thin" d="M50 12 L 50 76" />
                    <path className="thin" d="M27 21 L 73 67" />
                    <path className="thin" d="M73 21 L 27 67" />
                    <circle cx="50" cy="12" r="7.5" />
                    <circle cx="82" cy="44" r="7.5" />
                    <circle cx="50" cy="76" r="7.5" />
                    <circle cx="18" cy="44" r="7.5" />
                    <circle cx="50" cy="44" r="5" />
                    <path d="M38 66 L 30 94" />
                    <path d="M62 66 L 70 94" />
                    <path d="M24 94 L 76 94" />
                </>
            }
        />
    );
}

export function GlassIcon() {
    return (
        <Icon
            fills={
                <>
                    <circle className="f-glow" cx="64" cy="56" r="27" />
                    <ellipse className="f-orange" cx="64" cy="56" rx="19" ry="17" />
                </>
            }
            ink={
                <>
                    <path d="M10 88 L 44 66" />
                    <path d="M8 92 L 18 86" />
                    <ellipse cx="64" cy="56" rx="19" ry="17" />
                    <path className="thin" d="M64 40 C 58 46, 58 66, 64 72" />
                    <path className="thin" d="M52 43 C 48 50, 48 62, 52 69" />
                    <path className="thin" d="M76 43 C 80 50, 80 62, 76 69" />
                    <path d="M64 39 L 64 32" />
                    <path className="thin" d="M92 26 C 98 20, 94 13, 89 12" />
                    <path className="thin" d="M30 30 C 36 24, 32 17, 27 16" />
                </>
            }
        />
    );
}

/* the leaf that rains down the page */
export function Leaf({ className = "" }) {
    return (
        <svg className={`fall-leaf ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 2 C 18 7, 21 14, 12 22 C 3 14, 6 7, 12 2 Z" />
            <path className="vein" d="M12 5 L 12 20" />
        </svg>
    );
}
