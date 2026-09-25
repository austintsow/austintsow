import { Link } from "react-router-dom";
import "./ArchiveBack.css";

/* small fixed link home, so nothing in the archive is a dead end */
function ArchiveBack({ tone = "light" }) {
    return (
        <Link to="/gloria/archive" className={`arc-back arc-back--${tone}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M15 5 L 8 12 L 15 19" />
            </svg>
            <span>the drawer</span>
        </Link>
    );
}

export default ArchiveBack;
