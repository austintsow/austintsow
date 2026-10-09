/*
 * Colored-pencil drawings for the journal version of the 10/10 page.
 *
 * Pencil is three things here: colour laid down as diagonal hatching rather
 * than flat fill (the jr-hatch-* patterns), paper tooth showing through the
 * strokes (#jr-grain knocks random specks out of whatever it's applied to),
 * and outlines that wobble a little (#jr-line). Colour is kept slightly off
 * the outlines on purpose, the way coloured pencil actually lands.
 */

export const INKS = {
    rose: "#e2849a",
    blush: "#efb1c0",
    peach: "#f0a57c",
    butter: "#eec45a",
    sage: "#8fae7f",
    lavender: "#ab98d5",
    sky: "#93bde2",
    kraft: "#d9bf93",
};

export function JournalDefs() {
    return (
        <svg className="jr-defs" aria-hidden="true" focusable="false">
            <defs>
                {Object.entries(INKS).map(([name, color]) => (
                    <pattern
                        key={name}
                        id={`jr-hatch-${name}`}
                        width="4.6"
                        height="4.6"
                        patternUnits="userSpaceOnUse"
                        patternTransform="rotate(-38)"
                    >
                        <line x1="0" y1="0" x2="0" y2="4.6" stroke={color} strokeWidth="2.3" strokeOpacity="0.62" />
                    </pattern>
                ))}

                <filter id="jr-grain" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="3" result="n" />
                    <feColorMatrix
                        in="n"
                        type="matrix"
                        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.9 0 0 0 -0.32"
                        result="a"
                    />
                    <feComposite in="SourceGraphic" in2="a" operator="in" result="g" />
                    <feDisplacementMap in="g" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
                </filter>

                <filter id="jr-line" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="8" result="w" />
                    <feDisplacementMap in="SourceGraphic" in2="w" scale="1.7" xChannelSelector="R" yChannelSelector="G" result="d" />
                    <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="5" result="n" />
                    <feColorMatrix
                        in="n"
                        type="matrix"
                        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.4 0 0 0 -0.45"
                        result="a"
                    />
                    <feComposite in="d" in2="a" operator="in" />
                </filter>

                <pattern id="jr-washi-dots" width="7" height="7" patternUnits="userSpaceOnUse">
                    <circle cx="3.5" cy="3.5" r="1.1" fill="#ffffff" fillOpacity="0.85" />
                </pattern>
            </defs>
        </svg>
    );
}

/* one lily tepal pointing straight up from the flower's centre, the tip
   flicking a little to one side the way lily petals curl back */
function tepal(len, wid) {
    return `M0 0 C${wid} ${-len * 0.3}, ${wid * 0.85} ${-len * 0.78}, ${len * 0.1} ${-len}
        C${-wid * 0.45} ${-len * 0.8}, ${-wid * 1.05} ${-len * 0.32}, 0 0 Z`;
}

const POLLEN = "#c4773f";
const SPECKLE = "#cf4f6d";

/* outer three first, so the inner three overlap them */
const TEPALS = [0, 120, 240, 60, 180, 300];

/* an open lily: six striped, speckled tepals and long stamens. tilt and squash
   turn it away from the viewer a bit, so two of them don't look stamped. */
function Lily({ x, y, len, tilt, squash }) {
    return (
        <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(1 ${squash})`}>
            {TEPALS.map((a, i) => {
                const d = tepal(len, i < 3 ? 8 : 9.5);
                return (
                    <g key={a} transform={`rotate(${a})`}>
                        {/* paper underneath, so a front petal hides the line of the one behind */}
                        <path d={d} fill="#fffdf8" />
                        <path d={d} transform="translate(0.7 0.5)" fill="url(#jr-hatch-blush)" filter="url(#jr-grain)" />
                        <path
                            d={`M0 -2 C 1.2 ${-len * 0.3}, 1.4 ${-len * 0.55}, 1 ${-len * 0.72}`}
                            className="jr-lily-stripe"
                            filter="url(#jr-grain)"
                        />
                        <path d={d} className="jr-ink" filter="url(#jr-line)" />
                        {[[-1.6, 0.26], [1.9, 0.33], [-0.9, 0.42], [2.4, 0.5]].map(([dx, f]) => (
                            <circle key={f} cx={dx} cy={-len * f} r="0.6" fill={SPECKLE} fillOpacity="0.6" />
                        ))}
                    </g>
                );
            })}

            {/* stamens sit between the petals; the pistil goes straight out */}
            <g className="jr-ink jr-ink--thin jr-lily-filament" filter="url(#jr-line)">
                {[30, 90, 150, 210, 270, 330].map((a) => (
                    <path key={a} transform={`rotate(${a})`} d={`M0 0 Q 1.5 ${-len * 0.3}, 0.4 ${-len * 0.56}`} />
                ))}
                <path d={`M0 0 L ${len * 0.12} ${-len * 0.6}`} transform="rotate(200)" />
            </g>
            <g filter="url(#jr-grain)">
                {[30, 90, 150, 210, 270, 330].map((a) => (
                    <ellipse
                        key={a}
                        transform={`rotate(${a}) translate(0.4 ${-len * 0.56})`}
                        rx="1.9"
                        ry="0.95"
                        fill={POLLEN}
                    />
                ))}
                <circle transform="rotate(200)" cx={len * 0.12} cy={-len * 0.6} r="1.3" fill="url(#jr-hatch-sage)" />
            </g>
        </g>
    );
}

/* a closed lily bud, green going pink at the tip */
function Bud({ x, y, tilt }) {
    const d = "M0 0 C 4.5 -6, 5.5 -19, 0.8 -31 C -4 -19, -4.6 -6, 0 0 Z";
    return (
        <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
            <path d={d} fill="#fffdf8" />
            <path d={d} transform="translate(0.6 0.5)" fill="url(#jr-hatch-blush)" filter="url(#jr-grain)" />
            <path d="M0 0 C 3.6 -4, 4 -9, 2.6 -12 L -2.6 -12 C -3.6 -9, -3.4 -4, 0 0 Z" fill="url(#jr-hatch-sage)" filter="url(#jr-grain)" />
            <g className="jr-ink" filter="url(#jr-line)">
                <path d={d} />
                <path className="jr-faint" d="M0.4 -3 C 1.8 -12, 1.9 -22, 0.8 -30" />
            </g>
        </g>
    );
}

const LILIES = [
    { x: 116, y: 62, len: 26, tilt: 22, squash: 0.7 },
    { x: 68, y: 72, len: 31, tilt: -10, squash: 0.94 },
];

const BREATH = [
    [128, 88], [133, 80], [138, 90], [125, 96], [132, 97], [140, 84],
];

/* lilies (her favourite) with a bud, lavender, baby's breath, kraft wrap and a bow */
export function Bouquet() {
    return (
        <svg className="jr-bouquet" viewBox="0 0 160 210" aria-hidden="true" focusable="false">
            {/* back of the wrap */}
            <path
                d="M38 104 L 130 96 L 102 180 L 70 182 Z"
                fill="url(#jr-hatch-kraft)"
                filter="url(#jr-grain)"
                opacity="0.7"
            />
            <g className="jr-ink" filter="url(#jr-line)">
                <path d="M38 104 L 130 96 L 102 180 L 70 182 Z" />
            </g>

            {/* lavender and baby's breath, behind everything */}
            <g filter="url(#jr-grain)">
                {[[25, 56], [28, 64], [31, 72], [35, 80], [39, 88]].map(([x, y], i) => (
                    <ellipse
                        key={i}
                        cx={x}
                        cy={y}
                        rx="2.6"
                        ry="4.4"
                        transform={`rotate(-30 ${x} ${y})`}
                        fill="url(#jr-hatch-lavender)"
                    />
                ))}
            </g>
            <g className="jr-ink jr-ink--thin" filter="url(#jr-line)">
                <path d="M72 136 C 56 112, 40 86, 23 50" />
                <path d="M86 136 C 100 118, 118 102, 130 90" />
                <path d="M118 102 L 124 96" />
                <path d="M124 104 L 133 97" />
                {BREATH.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="2.3" />
                ))}
            </g>

            {/* leaves */}
            <g filter="url(#jr-grain)">
                <path d="M79 128 C 60 118, 48 100, 46 84 C 58 96, 70 110, 81 124 Z" fill="url(#jr-hatch-sage)" />
                <path d="M90 126 C 105 114, 119 98, 125 86 C 117 104, 105 118, 91 130 Z" fill="url(#jr-hatch-sage)" />
                <path d="M85 120 C 81 104, 83 92, 89 82 C 89 96, 88 108, 87 120 Z" fill="url(#jr-hatch-sage)" />
            </g>

            {/* stems */}
            <g className="jr-ink jr-ink--stem" filter="url(#jr-line)">
                <path d="M68 74 C 73 100, 80 122, 82 140" />
                <path d="M94 50 C 90 85, 86 115, 85 140" />
                <path d="M116 64 C 107 98, 93 122, 88 140" />
            </g>

            <g className="jr-ink jr-ink--thin" filter="url(#jr-line)">
                <path d="M79 128 C 60 118, 48 100, 46 84 C 58 96, 70 110, 81 124" />
                <path d="M90 126 C 105 114, 119 98, 125 86 C 117 104, 105 118, 91 130" />
            </g>

            <Bud x={94} y={51} tilt={9} />
            {LILIES.map((l) => (
                <Lily key={l.x} {...l} />
            ))}

            {/* front of the wrap, folded over the stems */}
            <path
                d="M48 118 C 70 125, 100 125, 124 111 L 99 182 L 73 184 Z"
                fill="url(#jr-hatch-kraft)"
                filter="url(#jr-grain)"
            />
            <g className="jr-ink" filter="url(#jr-line)">
                <path d="M48 118 C 70 125, 100 125, 124 111 L 99 182 L 73 184 Z" />
                <path className="jr-faint" d="M87 124 L 86 182" />
            </g>

            {/* bow */}
            <g filter="url(#jr-grain)">
                <path d="M86 150 C 74 138, 63 144, 69 155 C 73 161, 82 157, 86 150 Z" fill="url(#jr-hatch-rose)" />
                <path d="M86 150 C 98 138, 109 144, 103 155 C 99 161, 90 157, 86 150 Z" fill="url(#jr-hatch-rose)" />
            </g>
            <g className="jr-ink" filter="url(#jr-line)">
                <path d="M86 150 C 74 138, 63 144, 69 155 C 73 161, 82 157, 86 150 Z" />
                <path d="M86 150 C 98 138, 109 144, 103 155 C 99 161, 90 157, 86 150 Z" />
                <ellipse cx="86" cy="151" rx="3.4" ry="3" />
                <path d="M85 154 C 80 165, 76 173, 71 181" />
                <path d="M87 154 C 92 165, 96 172, 101 179" />
                {/* stem ends poking out the bottom */}
                <path className="jr-stem-end" d="M81 185 L 79 197" />
                <path className="jr-stem-end" d="M86 185 L 86 199" />
                <path className="jr-stem-end" d="M91 184 L 93 196" />
            </g>
        </svg>
    );
}

/* a small five-petal flower, for the margins */
export function Blossom({ ink = "sky", className = "" }) {
    const petals = [0, 72, 144, 216, 288];
    return (
        <svg className={`jr-blossom ${className}`} viewBox="-12 -12 24 24" aria-hidden="true" focusable="false">
            <g filter="url(#jr-grain)">
                {petals.map((a) => (
                    <ellipse key={a} cx="0.6" cy="-5.4" rx="3.6" ry="4.4" transform={`rotate(${a})`} fill={`url(#jr-hatch-${ink})`} />
                ))}
                <circle cx="0.4" cy="0.4" r="2.4" fill="url(#jr-hatch-butter)" />
            </g>
            <g className="jr-ink jr-ink--thin" filter="url(#jr-line)">
                {petals.map((a) => (
                    <ellipse key={a} cx="0" cy="-5.6" rx="3.4" ry="4.3" transform={`rotate(${a})`} />
                ))}
                <circle cx="0" cy="0" r="2.2" />
            </g>
        </svg>
    );
}

/* a strip of washi tape with torn ends */
export function Washi({ className = "", ink = "blush" }) {
    const d =
        "M4 0 L 88 0 L 92 3 L 89 7 L 92 11 L 89 15 L 92 19 L 88 22 L 4 22 L 0 19 L 3 15 L 0 11 L 3 7 L 0 3 Z";
    return (
        <svg className={`jr-washi ${className}`} viewBox="0 0 92 22" aria-hidden="true" focusable="false">
            <path d={d} fill={INKS[ink]} fillOpacity="0.55" />
            <path d={d} fill="url(#jr-washi-dots)" />
        </svg>
    );
}

/* hand-drawn checkbox; the tick draws itself in when ticked */
export function Tick({ on }) {
    return (
        <svg className={`jr-tick${on ? " is-on" : ""}`} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path className="jr-tick-box" filter="url(#jr-line)" d="M2.5 4 L 15.5 3.2 L 16 16.4 L 3 16.8 Z" />
            <path className="jr-tick-mark" filter="url(#jr-line)" d="M4 10.5 L 8 14.5 L 18 2" pathLength="1" />
        </svg>
    );
}
