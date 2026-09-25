import React from "react";

/*
 * Animals for the archive, drawn the way a kid would draw them: wobbly outlines,
 * colour that misses the lines a bit.
 *
 * Two filters do the work. #kidInk shoves the outlines around so nothing is
 * machine-straight, #kidFill speckles the colour and offsets it from the lines.
 * #tornEdge is separate and gets applied to the card's paper layer, not here.
 */

export function PaperDefs() {
    return (
        <svg className="zoo-defs" aria-hidden="true" focusable="false">
            <defs>
                <filter id="kidInk" x="-25%" y="-25%" width="150%" height="150%"
                    colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" seed="9" result="n" />
                    <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6"
                        xChannelSelector="R" yChannelSelector="G" />
                </filter>

                <filter id="kidFill" x="-25%" y="-25%" width="150%" height="150%"
                    colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" seed="4" result="g" />
                    <feColorMatrix in="g" type="matrix"
                        values="0 0 0 0 0
                                0 0 0 0 0
                                0 0 0 0 0
                                1.7 0 0 0 -0.15" result="ga" />
                    <feComposite in="SourceGraphic" in2="ga" operator="in" result="sp" />
                    <feDisplacementMap in="sp" in2="g" scale="3.4"
                        xChannelSelector="R" yChannelSelector="G" />
                </filter>

                {/* ragged edge for the paper each card is torn from */}
                <filter id="tornEdge" x="-8%" y="-8%" width="116%" height="116%"
                    colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="5" seed="12" result="t" />
                    <feDisplacementMap in="SourceGraphic" in2="t" scale="11"
                        xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </defs>
        </svg>
    );
}

function Animal({ fills, ink }) {
    return (
        <svg className="zoo-svg" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            <g className="zoo-fills" filter="url(#kidFill)">{fills}</g>
            <g className="zoo-ink" filter="url(#kidInk)">{ink}</g>
        </svg>
    );
}

export function Sloth() {
    return (
        <Animal
            fills={
                <>
                    <ellipse className="f-tan" cx="60" cy="64" rx="32" ry="30" />
                    <ellipse className="f-brown" cx="45" cy="58" rx="14" ry="12" transform="rotate(-25 45 58)" />
                    <ellipse className="f-brown" cx="76" cy="58" rx="14" ry="12" transform="rotate(25 76 58)" />
                    <ellipse className="f-white" cx="60" cy="79" rx="17" ry="12" />
                </>
            }
            ink={
                <>
                    <ellipse cx="60" cy="64" rx="32" ry="30" />
                    <ellipse cx="45" cy="58" rx="14" ry="12" transform="rotate(-25 45 58)" />
                    <ellipse cx="76" cy="58" rx="14" ry="12" transform="rotate(25 76 58)" />
                    <circle className="dot" cx="48" cy="60" r="3.6" />
                    <circle className="dot" cx="73" cy="60" r="3.6" />
                    <path className="dot" d="M56 71 C 58 68, 62 68, 64 71 C 63 74, 57 74, 56 71 Z" />
                    <path d="M48 80 C 54 88, 66 88, 72 80" />
                    <path d="M34 42 C 36 34, 42 33, 44 39" />
                    <path d="M54 32 C 56 25, 62 25, 64 32" />
                    <path d="M76 39 C 78 33, 84 34, 86 42" />
                </>
            }
        />
    );
}

export function Bear() {
    return (
        <Animal
            fills={
                <>
                    <circle className="f-brown" cx="33" cy="36" r="15" />
                    <circle className="f-brown" cx="87" cy="36" r="15" />
                    <circle className="f-brown" cx="60" cy="66" r="34" />
                    <ellipse className="f-tan" cx="60" cy="80" rx="20" ry="14" />
                </>
            }
            ink={
                <>
                    <circle cx="33" cy="36" r="15" />
                    <circle cx="87" cy="36" r="15" />
                    <circle cx="60" cy="66" r="34" />
                    <ellipse cx="60" cy="80" rx="20" ry="14" />
                    <circle className="dot" cx="48" cy="60" r="3.6" />
                    <circle className="dot" cx="72" cy="60" r="3.6" />
                    <path className="dot" d="M54 74 C 57 70, 63 70, 66 74 C 64 78, 56 78, 54 74 Z" />
                    <path d="M60 78 L 60 84" />
                    <path d="M60 84 C 56 88, 52 86, 51 83" />
                    <path d="M60 84 C 64 88, 68 86, 69 83" />
                </>
            }
        />
    );
}

export function Cow() {
    return (
        <Animal
            fills={
                <>
                    <ellipse className="f-white" cx="60" cy="62" rx="33" ry="30" />
                    <ellipse className="f-white" cx="22" cy="56" rx="13" ry="8" transform="rotate(-20 22 56)" />
                    <ellipse className="f-white" cx="98" cy="56" rx="13" ry="8" transform="rotate(20 98 56)" />
                    <path className="f-ink" d="M40 42 C 52 36, 58 46, 52 56 C 44 62, 32 56, 34 48 Z" />
                    <ellipse className="f-pink" cx="60" cy="82" rx="22" ry="14" />
                </>
            }
            ink={
                <>
                    <ellipse cx="60" cy="62" rx="33" ry="30" />
                    <ellipse cx="22" cy="56" rx="13" ry="8" transform="rotate(-20 22 56)" />
                    <ellipse cx="98" cy="56" rx="13" ry="8" transform="rotate(20 98 56)" />
                    <path d="M40 36 C 34 26, 42 22, 46 30" />
                    <path d="M80 36 C 86 26, 78 22, 74 30" />
                    <circle className="dot" cx="46" cy="56" r="3.4" />
                    <circle className="dot" cx="76" cy="58" r="3.4" />
                    <ellipse cx="60" cy="82" rx="22" ry="14" />
                    <ellipse className="dot" cx="52" cy="79" rx="3" ry="4" />
                    <ellipse className="dot" cx="68" cy="79" rx="3" ry="4" />
                </>
            }
        />
    );
}

export function Fish() {
    return (
        <Animal
            fills={
                <>
                    <ellipse className="f-orange" cx="62" cy="64" rx="34" ry="24" />
                    <path className="f-orange" d="M28 64 L 10 48 L 12 80 Z" />
                    <path className="f-amber" d="M62 40 L 72 30 L 76 42 Z" />
                </>
            }
            ink={
                <>
                    <ellipse cx="62" cy="64" rx="34" ry="24" />
                    <path d="M28 64 L 10 48 L 12 80 Z" />
                    <path d="M62 40 L 72 30, 76 42" />
                    <circle className="dot" cx="80" cy="57" r="3.6" />
                    <path d="M66 46 C 60 56, 60 72, 66 82" />
                    <path className="faint" d="M78 68 C 82 71, 86 71, 90 68" />
                    <circle cx="104" cy="42" r="4" />
                    <circle cx="96" cy="28" r="2.8" />
                </>
            }
        />
    );
}

export function Fox() {
    return (
        <Animal
            fills={
                <>
                    <path className="f-orange" d="M26 40 L 30 16 L 48 30 Z" />
                    <path className="f-orange" d="M94 40 L 90 16 L 72 30 Z" />
                    <path className="f-orange" d="M60 32 C 88 32, 94 54, 88 66 C 82 82, 68 92, 60 92 C 52 92, 38 82, 32 66 C 26 54, 32 32, 60 32 Z" />
                    <path className="f-white" d="M60 62 C 72 62, 76 76, 60 92 C 44 76, 48 62, 60 62 Z" />
                </>
            }
            ink={
                <>
                    <path d="M26 40 L 30 16 L 48 30" />
                    <path d="M94 40 L 90 16 L 72 30" />
                    <path d="M60 32 C 88 32, 94 54, 88 66 C 82 82, 68 92, 60 92 C 52 92, 38 82, 32 66 C 26 54, 32 32, 60 32 Z" />
                    <circle className="dot" cx="46" cy="58" r="3.6" />
                    <circle className="dot" cx="74" cy="58" r="3.6" />
                    <path className="dot" d="M55 74 C 57 71, 63 71, 65 74 C 63 78, 57 78, 55 74 Z" />
                    <path d="M60 78 C 56 83, 52 82, 50 79" />
                    <path d="M60 78 C 64 83, 68 82, 70 79" />
                </>
            }
        />
    );
}

export function Duck() {
    return (
        <Animal
            fills={
                <>
                    <ellipse className="f-yellow" cx="66" cy="82" rx="32" ry="22" />
                    <circle className="f-yellow" cx="52" cy="48" r="24" />
                    <path className="f-orange" d="M28 50 L 8 55 L 28 62 Z" />
                </>
            }
            ink={
                <>
                    <ellipse cx="66" cy="82" rx="32" ry="22" />
                    <circle cx="52" cy="48" r="24" />
                    <path d="M28 50 L 8 55 L 28 62 Z" />
                    <circle className="dot" cx="46" cy="42" r="3.4" />
                    <path d="M62 76 C 70 70, 84 74, 86 84" />
                    <path d="M58 103 L 56 112" />
                    <path d="M74 103 L 76 112" />
                    <path d="M50 112 L 62 112" />
                    <path d="M70 112 L 82 112" />
                </>
            }
        />
    );
}
