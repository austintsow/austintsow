import { useNavigate } from "react-router-dom";
import "./Gloria.css";

/*
 * The old post-passcode selection screen, kept around at /gloria/archive.
 * /gloria itself now opens straight onto the saturday plan.
 */
function GloriaArchive() {
    const navigate = useNavigate();

    return (
        <div className="gloria-page">
            <div className="selection-screen">
                <div className="boxes-container">
                    <div className="selection-box archived">
                        <span className="box-title">7 months</span>
                        <svg
                            className="lock-icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>

                    <div
                        className="selection-box active"
                        onClick={() => navigate("/gloria/valentine")}
                    >
                        <span className="box-title">important question</span>
                    </div>

                    <div
                        className="selection-box active"
                        onClick={() => navigate("/gloria/saturday")}
                    >
                        <span className="box-title">sweet saturday</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GloriaArchive;
