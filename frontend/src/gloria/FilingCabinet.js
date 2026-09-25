import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./FilingCabinet.css";

/*
 * gloria's archive as a file tree. Folders expand, files open the page.
 *
 * Depth is passed down as a --d custom property rather than by nesting padding,
 * so a row's indent and its guide line are always computed from the same number
 * and can never drift apart.
 */

/* Every date here is the commit that first added the card, checked against
   git rather than guessed. The valentine, the letter and the photos all
   landed together in 569abfe on feb 23, so they are one card, not three.
   The two 2025 cards were overwritten in Gloria.js and restored from history. */
const TREE = [
    {
        type: "folder",
        id: "root",
        name: "gloria",
        children: [
            {
                type: "folder",
                id: "pw",
                name: "passwords",
                children: [
                    { type: "file", id: "pwfile", name: "passwords.txt", meta: "3 keys", to: "/gloria/passwords" },
                ],
            },
            {
                type: "folder",
                id: "y2025",
                name: "2025",
                children: [
                    {
                        type: "folder",
                        id: "aug25",
                        name: "august",
                        children: [
                            { type: "file", id: "gfday", name: "national girlfriend day", meta: "aug 1", to: "/gloria/gfday" },
                        ],
                    },
                    {
                        type: "folder",
                        id: "dec25",
                        name: "december",
                        children: [
                            { type: "file", id: "festive", name: "a festive evening", meta: "dec 18", to: "/gloria/festive" },
                        ],
                    },
                ],
            },
            {
                type: "folder",
                id: "y2026",
                name: "2026",
                children: [
                    {
                        type: "folder",
                        id: "feb26",
                        name: "february",
                        children: [
                            { type: "file", id: "seven", name: "seven months", meta: "feb 2", to: "/gloria/7months" },
                            { type: "file", id: "val", name: "be my valentine?", meta: "feb 23", to: "/gloria/valentine" },
                        ],
                    },
                    {
                        type: "folder",
                        id: "sep26",
                        name: "september",
                        children: [
                            { type: "file", id: "sat", name: "sweet saturday", meta: "sep 3", to: "/gloria/saturday" },
                            { type: "file", id: "remlinger", name: "remlinger farms", meta: "sep 25", to: "/gloria/fall" },
                        ],
                    },
                ],
            },
        ],
    },
];

function countFiles(nodes) {
    return nodes.reduce(
        (n, node) => n + (node.type === "file" ? 1 : countFiles(node.children)),
        0
    );
}

const TOTAL = countFiles(TREE);

function Chevron() {
    return (
        <svg className="tr-chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M6 3.5 L 10.5 8 L 6 12.5" />
        </svg>
    );
}

function FolderIcon({ open }) {
    return (
        <svg className="tr-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            {open ? (
                <path d="M2.5 15.5 L 4.4 9.5 L 17.5 9.5 L 15.6 15.5 Z M2.5 15.5 L 2.5 4.5 L 7.5 4.5 L 9.2 6.6 L 14.5 6.6 L 14.5 9.5" />
            ) : (
                <path d="M2.5 15.5 L 2.5 4.5 L 7.5 4.5 L 9.2 6.6 L 17.5 6.6 L 17.5 15.5 Z" />
            )}
        </svg>
    );
}

function FileIcon() {
    return (
        <svg className="tr-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M5 2.5 L 11.5 2.5 L 15.5 6.5 L 15.5 17.5 L 5 17.5 Z" />
            <path d="M11.5 2.5 L 11.5 6.5 L 15.5 6.5" />
        </svg>
    );
}

function Node({ node, depth, openIds, onToggle, onOpen }) {
    if (node.type === "file") {
        return (
            <button
                type="button"
                className="tr-row tr-file"
                style={{ "--d": depth }}
                onClick={() => onOpen(node.to)}
            >
                <span className="tr-gap" aria-hidden="true" />
                <FileIcon />
                <span className="tr-name">{node.name}</span>
                <span className="tr-meta">{node.meta}</span>
            </button>
        );
    }

    const open = openIds.includes(node.id);

    return (
        <div className="tr-branch">
            <button
                type="button"
                className={`tr-row tr-dir${open ? " is-open" : ""}`}
                style={{ "--d": depth }}
                aria-expanded={open}
                onClick={() => onToggle(node.id)}
            >
                <Chevron />
                <FolderIcon open={open} />
                <span className="tr-name">{node.name}</span>
                <span className="tr-meta">{countFiles(node.children)}</span>
            </button>

            {/* always mounted so the height can animate. the inner wrapper goes
                visibility:hidden once closed, which also drops it out of the tab
                order and off screen readers. */}
            <div
                className={`tr-children${open ? " is-open" : ""}`}
                style={{ "--d": depth }}
            >
                <div className="tr-children-inner">
                    {node.children.map((child) => (
                        <Node
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                            openIds={openIds}
                            onToggle={onToggle}
                            onOpen={onOpen}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function FilingCabinet() {
    const navigate = useNavigate();
    /* only the root is open to start. the year and month folders are hers to
       open, which is the whole point of a drawer */
    const [openIds, setOpenIds] = useState(["root"]);

    useEffect(() => {
        const prev = document.title;
        document.title = "the archive";
        const prevBg = document.body.style.background;
        document.body.style.background = "#ffffff";
        return () => {
            document.title = prev;
            document.body.style.background = prevBg;
        };
    }, []);

    const toggle = useCallback((id) => {
        setOpenIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }, []);

    return (
        <div className="tr-page">
            <header className="tr-header">
                <h1 className="tr-title">the archive</h1>
                <p className="tr-sub">all of the e-cards i&rsquo;ve made for you!</p>
            </header>

            <div className="tr-panel">
                <div className="tr-bar">
                    <span className="tr-bar-name">archive</span>
                    <span className="tr-bar-count">{TOTAL} files</span>
                </div>

                <div className="tr-tree" role="tree">
                    {TREE.map((node) => (
                        <Node
                            key={node.id}
                            node={node}
                            depth={0}
                            openIds={openIds}
                            onToggle={toggle}
                            onOpen={(to) => navigate(to)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FilingCabinet;
