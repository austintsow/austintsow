import React from "react";

/*
 * Hand-drawn doodles for the Saturday date page.
 * Everything is inline SVG so the page stays self-contained (no image assets).
 * The colored-pencil look comes from two filters defined in <DoodleDefs />:
 *   #crayonRough  wobbles the outlines so nothing is machine-straight
 *   #pencilFill   speckles and offsets the color patches, like coloring outside the lines
 * Fill colors come from the c-* classes in SaturdayDate.css, not from fill attributes,
 * because var() does not resolve inside SVG presentation attributes.
 */

export function DoodleDefs() {
    return (
        <svg className="doodle-defs" aria-hidden="true" focusable="false">
            <defs>
                <filter
                    id="crayonRough"
                    x="-25%"
                    y="-25%"
                    width="150%"
                    height="150%"
                    colorInterpolationFilters="sRGB"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.05"
                        numOctaves="4"
                        seed="7"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="2.4"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>

                <filter
                    id="pencilFill"
                    x="-25%"
                    y="-25%"
                    width="150%"
                    height="150%"
                    colorInterpolationFilters="sRGB"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.62"
                        numOctaves="4"
                        seed="13"
                        result="grain"
                    />
                    <feColorMatrix
                        in="grain"
                        type="matrix"
                        values="0 0 0 0 0
                                0 0 0 0 0
                                0 0 0 0 0
                                1.9 0 0 0 -0.12"
                        result="grainAlpha"
                    />
                    <feComposite in="SourceGraphic" in2="grainAlpha" operator="in" result="speckled" />
                    <feDisplacementMap
                        in="speckled"
                        in2="grain"
                        scale="2.8"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>
        </svg>
    );
}

function Doodle({ viewBox = "0 0 120 120", className = "", patches, ink, labels }) {
    return (
        <svg
            className={`doodle ${className}`}
            viewBox={viewBox}
            aria-hidden="true"
            focusable="false"
        >
            <g className="patches" filter="url(#pencilFill)">
                {patches}
            </g>
            <g className="ink" filter="url(#crayonRough)">
                {ink}
            </g>
            {/* labels sit outside the rough filter so the lettering stays legible */}
            {labels}
        </svg>
    );
}

/* the two of us, walking somewhere, holding hands.
   viewBox is padded left and right to leave room for the pointed-at labels. */
export function CoupleDoodle() {
    return (
        <Doodle
            viewBox="-92 -22 388 142"
            className="doodle--couple"
            patches={
                <>
                    <ellipse className="c-honey" cx="59" cy="56" rx="15" ry="19" transform="rotate(-4 59 56)" />
                    <ellipse className="c-rose" cx="142" cy="55" rx="15" ry="19" transform="rotate(5 142 55)" />
                    <ellipse className="c-hair" cx="60" cy="29" rx="12" ry="10" />
                    <ellipse className="c-hair" cx="140" cy="34" rx="13" ry="18" />
                    <path
                        className="c-rose"
                        d="M100 38 C 92 32, 88 26, 92 22 C 96 19, 100 23, 100 26 C 100 23, 104 19, 108 22 C 112 26, 108 32, 100 38 Z"
                    />
                </>
            }
            ink={
                <>
                    {/* him */}
                    <circle cx="60" cy="30" r="11" />
                    <path d="M49 27 C 52 16, 68 16, 71 27" />
                    <path d="M60 41 L 58 74" />
                    <path d="M58 74 L 50 100" />
                    <path d="M58 74 L 67 100" />
                    <path d="M59 50 L 46 64" />
                    <path d="M60 50 L 78 62" />
                    {/* her */}
                    <circle cx="140" cy="28" r="11" />
                    <path d="M129 26 C 132 13, 149 13, 151 26" />
                    <path d="M129 26 C 126 42, 129 52, 131 56" />
                    <path d="M151 26 C 154 42, 151 52, 149 56" />
                    <path d="M140 39 L 142 74" />
                    <path d="M142 74 L 134 100" />
                    <path d="M142 74 L 152 100" />
                    <path d="M141 48 L 156 63" />
                    <path d="M140 48 L 122 62" />
                    {/* hands, met in the middle */}
                    <path d="M78 62 C 88 69, 112 69, 122 62" />
                    <path d="M100 38 C 92 32, 88 26, 92 22 C 96 19, 100 23, 100 26 C 100 23, 104 19, 108 22 C 112 26, 108 32, 100 38 Z" />
                    <path className="faint" d="M30 106 C 70 102, 130 102, 170 106" />

                    {/* curved arrows that come down onto each head from above.
                        They stop short of the circle and stay well clear of the
                        shoulders, otherwise they just read as a third arm. */}
                    <path d="M-14 4 C 8 0, 30 5, 48 19" />
                    <path d="M48 19 L 44 7" />
                    <path d="M48 19 L 36 15" />
                    <path d="M214 4 C 192 0, 170 5, 152 19" />
                    <path d="M152 19 L 156 7" />
                    <path d="M152 19 L 164 15" />
                </>
            }
            labels={
                <>
                    <text className="doodle-label" x="-18" y="-2" textAnchor="end">
                        me (austin)
                    </text>
                    <text className="doodle-label" x="218" y="-2" textAnchor="start">
                        you (gloria)
                    </text>
                </>
            }
        />
    );
}

/* mid stride */
export function RunDoodle() {
    return (
        <Doodle
            className="doodle--run"
            patches={
                <>
                    <ellipse className="c-sage" cx="58" cy="49" rx="13" ry="15" transform="rotate(-22 58 49)" />
                    <circle className="c-hair" cx="68" cy="25" r="10" />
                </>
            }
            ink={
                <>
                    <circle cx="68" cy="26" r="9" />
                    <path d="M59 24 C 62 14, 76 14, 77 22" />
                    <path d="M63 34 C 58 46, 55 57, 51 66" />
                    <path d="M62 42 L 77 37 L 82 47" />
                    <path d="M60 45 L 46 45 L 40 35" />
                    <path d="M51 66 L 65 78 L 63 95" />
                    <path d="M51 66 L 38 71 L 30 60" />
                    <path className="faint" d="M16 41 L 36 41" />
                    <path className="faint" d="M10 54 L 27 54" />
                    <path className="faint" d="M17 67 L 31 67" />
                    <path className="faint" d="M20 103 C 50 100, 84 100, 104 103" />
                </>
            }
        />
    );
}

/* a grocery bag in one hand, a flat pack we swore we would not buy in the other */
export function ErrandsDoodle() {
    return (
        <Doodle
            className="doodle--errands"
            patches={
                <>
                    <ellipse className="c-sage" cx="43" cy="50" rx="11" ry="13" />
                    <rect className="c-terracotta" x="55" y="53" width="19" height="25" rx="2" />
                    <rect className="c-blue" x="80" y="63" width="25" height="32" rx="2" />
                    <circle className="c-hair" cx="44" cy="23" r="9" />
                </>
            }
            ink={
                <>
                    <circle cx="44" cy="24" r="9" />
                    <path d="M35 22 C 38 12, 52 12, 53 21" />
                    <path d="M44 33 L 42 62" />
                    <path d="M42 62 L 34 84 L 31 96" />
                    <path d="M42 62 L 52 84 L 56 96" />
                    <path d="M43 42 L 32 55" />
                    <path d="M43 43 L 55 52" />
                    {/* grocery bag */}
                    <path d="M54 52 L 75 52 L 72 79 L 57 79 Z" />
                    <path d="M59 52 C 60 45, 69 45, 70 52" />
                    {/* flat pack */}
                    <path d="M79 62 L 106 62 L 106 96 L 79 96 Z" />
                    <path className="faint" d="M79 62 L 106 96" />
                    <path className="faint" d="M84 88 L 96 88" />
                    <path className="faint" d="M20 103 C 50 100, 84 100, 108 103" />
                </>
            }
        />
    );
}

/* paint the city */
export function PaintDoodle() {
    return (
        <Doodle
            className="doodle--paint"
            patches={
                <>
                    <rect className="c-canvas" x="73" y="42" width="33" height="28" />
                    <path
                        className="c-rose"
                        d="M88 60 C 84 56, 82 52, 85 50 C 88 48, 90 51, 90 53 C 90 51, 92 48, 95 50 C 98 52, 96 56, 88 60 Z"
                    />
                    <ellipse className="c-mustard" cx="33" cy="52" rx="11" ry="13" />
                    <ellipse className="c-terracotta" cx="22" cy="62" rx="10" ry="7" />
                    <circle className="c-hair" cx="34" cy="29" r="9" />
                </>
            }
            ink={
                <>
                    {/* easel */}
                    <path d="M74 98 L 86 46" />
                    <path d="M104 98 L 93 46" />
                    <path d="M77 78 L 101 78" />
                    <path d="M72 41 L 107 41 L 107 71 L 72 71 Z" />
                    <path className="faint" d="M78 64 L 101 64" />
                    <path d="M88 60 C 84 56, 82 52, 85 50 C 88 48, 90 51, 90 53 C 90 51, 92 48, 95 50 C 98 52, 96 56, 88 60 Z" />
                    {/* painter */}
                    <circle cx="34" cy="30" r="9" />
                    <path d="M25 28 C 27 17, 42 16, 44 27" />
                    <path d="M25 28 C 23 40, 25 48, 27 51" />
                    <path d="M34 39 L 32 68" />
                    <path d="M32 68 L 26 93" />
                    <path d="M32 68 L 41 93" />
                    <path d="M34 46 L 53 40 L 63 45" />
                    <path d="M33 48 L 24 56" />
                    {/* palette */}
                    <ellipse cx="22" cy="62" rx="10" ry="7" />
                    <circle cx="24" cy="63" r="1.5" />
                    <circle cx="18" cy="60" r="1.5" />
                    <circle cx="21" cy="66" r="1.5" />
                </>
            }
        />
    );
}

/* a table for two */
export function DinnerDoodle() {
    return (
        <Doodle
            className="doodle--dinner"
            patches={
                <>
                    <path className="c-blue" d="M19 70 C 21 54, 45 54, 47 70 Z" />
                    <path className="c-rose" d="M73 70 C 75 54, 99 54, 101 70 Z" />
                    <ellipse className="c-mustard" cx="60" cy="52" rx="4" ry="8" />
                    <circle className="c-hair" cx="33" cy="37" r="9" />
                    <ellipse className="c-hair" cx="88" cy="42" rx="10" ry="14" />
                </>
            }
            ink={
                <>
                    {/* him */}
                    <circle cx="33" cy="38" r="9" />
                    <path d="M24 36 C 26 26, 40 26, 42 35" />
                    <path d="M19 70 C 21 53, 45 53, 47 70" />
                    {/* her */}
                    <circle cx="88" cy="38" r="9" />
                    <path d="M79 36 C 81 25, 96 25, 97 36" />
                    <path d="M79 36 C 77 48, 80 55, 82 58" />
                    <path d="M97 36 C 99 48, 96 55, 94 58" />
                    <path d="M73 70 C 75 53, 99 53, 101 70" />
                    {/* table */}
                    <path d="M14 72 L 106 72" />
                    <path d="M60 72 L 60 98" />
                    <path d="M45 100 L 75 100" />
                    {/* plates and one candle */}
                    <ellipse cx="36" cy="69" rx="9" ry="3" />
                    <ellipse cx="84" cy="69" rx="9" ry="3" />
                    <path d="M60 69 L 60 58" />
                    <path d="M60 58 C 56 54, 58 48, 60 45 C 62 48, 64 54, 60 58 Z" />
                </>
            }
        />
    );
}

/* cheers */
export function DrinksDoodle() {
    return (
        <Doodle
            className="doodle--drinks"
            patches={
                <>
                    <path className="c-rose" d="M27 41 L 55 41 L 42 58 Z" transform="rotate(13 44 58)" />
                    <path className="c-mustard" d="M65 41 L 93 41 L 80 58 Z" transform="rotate(-13 76 58)" />
                </>
            }
            ink={
                <>
                    <g transform="rotate(13 44 58)">
                        <path d="M26 39 L 56 39 L 42 58 Z" />
                        <path d="M41 58 L 41 79" />
                        <path d="M31 81 L 51 81" />
                        <path className="faint" d="M34 89 C 38 83, 46 83, 50 89" />
                    </g>
                    <g transform="rotate(-13 76 58)">
                        <path d="M64 39 L 94 39 L 80 58 Z" />
                        <path d="M79 58 L 79 79" />
                        <path d="M69 81 L 89 81" />
                        <path className="faint" d="M72 89 C 76 83, 84 83, 88 89" />
                    </g>
                    <path d="M60 25 L 60 14" />
                    <path d="M48 29 L 41 21" />
                    <path d="M72 29 L 79 21" />
                    <path className="faint" d="M53 19 L 51 12" />
                    <path className="faint" d="M67 19 L 69 12" />
                </>
            }
        />
    );
}

/* salt and straw, one scoop each */
export function IceCreamDoodle() {
    return (
        <Doodle
            className="doodle--icecream"
            patches={
                <>
                    <ellipse className="c-blue" cx="40" cy="72" rx="15" ry="17" />
                    <path className="c-mustard" d="M63 48 L 87 48 L 75 74 Z" />
                    <circle className="c-rose" cx="69" cy="42" r="8" />
                    <circle className="c-mustard" cx="80" cy="42" r="8" />
                    <circle className="c-terracotta" cx="74" cy="32" r="8" />
                    <circle className="c-hair" cx="40" cy="29" r="10" />
                </>
            }
            ink={
                <>
                    <circle cx="40" cy="30" r="10" />
                    <path d="M30 28 C 32 16, 48 16, 50 27" />
                    <path d="M30 28 C 28 42, 31 50, 33 53" />
                    <path d="M50 27 C 52 42, 49 50, 47 53" />
                    <path d="M36 36 C 38 39, 42 39, 44 36" />
                    <path d="M24 64 C 26 47, 54 47, 56 64" />
                    <path d="M26 64 L 28 94" />
                    <path d="M54 64 L 52 94" />
                    <path d="M52 55 L 66 46" />
                    {/* cone */}
                    <path d="M62 47 L 88 47 L 75 75 Z" />
                    <path className="faint" d="M66 56 L 79 51" />
                    <path className="faint" d="M69 64 L 82 58" />
                    <circle cx="69" cy="42" r="8" />
                    <circle cx="80" cy="42" r="8" />
                    <circle cx="74" cy="33" r="8" />
                    <path className="faint" d="M64 50 C 62 55, 63 58, 65 59" />
                </>
            }
        />
    );
}

/* the sketched loop drawn around whichever bar she picks */
export function ScribbleCircle() {
    return (
        <svg
            className="scribble"
            viewBox="0 0 300 160"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M12 24 C 70 8, 232 6, 289 20 C 297 60, 296 112, 287 143 C 224 156, 66 158, 14 145 C 5 104, 4 58, 13 22 C 34 12, 92 7, 138 8" />
        </svg>
    );
}

/* sealed envelope, for the password gate */
export function EnvelopeDoodle() {
    return (
        <Doodle
            className="doodle--envelope"
            patches={
                <>
                    <rect className="c-canvas" x="19" y="39" width="82" height="52" rx="4" />
                    <path
                        className="c-rose"
                        d="M60 68 C 52 62, 48 56, 52 52 C 56 49, 60 52, 60 55 C 60 52, 64 49, 68 52 C 72 56, 68 62, 60 68 Z"
                    />
                </>
            }
            ink={
                <>
                    <rect x="18" y="38" width="84" height="54" rx="5" />
                    <path d="M18 38 L 60 66 L 102 38" />
                    <path className="faint" d="M18 92 L 48 63" />
                    <path className="faint" d="M102 92 L 72 63" />
                    <path d="M60 68 C 52 62, 48 56, 52 52 C 56 49, 60 52, 60 55 C 60 52, 64 49, 68 52 C 72 56, 68 62, 60 68 Z" />
                    <path className="faint" d="M108 26 L 112 20" />
                    <path className="faint" d="M14 24 L 10 18" />
                    <path className="faint" d="M60 24 L 60 17" />
                </>
            }
        />
    );
}

/* hand-drawn rounded rectangle that sits behind the hint button */
export function SketchBox() {
    return (
        <svg
            className="sketch-box"
            viewBox="0 0 120 44"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M11 4 C 42 1, 82 2, 110 5 C 116 14, 117 30, 110 40 C 78 43, 38 43, 10 40 C 3 31, 3 13, 11 4 Z" />
        </svg>
    );
}

export function SmallHeart({ className = "" }) {
    return (
        <svg
            className={`small-heart ${className}`}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
        >
            <path
                filter="url(#crayonRough)"
                d="M12 21 C 4 15, 1 10, 4 6 C 7 2.6, 11 5, 12 8 C 13 5, 17 2.6, 20 6 C 23 10, 20 15, 12 21 Z"
            />
        </svg>
    );
}
