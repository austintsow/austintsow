import { useNavigate } from "react-router-dom";
import FinderBrowser from "./FinderBrowser";
import ArchiveBack from "./ArchiveBack";

/* the finder as its own page, so the archive can open the real thing
   instead of re-rendering its contents as plain text */
function FinderPage({ initialView = null }) {
    const navigate = useNavigate();
    return (
        <>
            <ArchiveBack tone="light" />
            <FinderBrowser initialView={initialView} onClose={() => navigate("/gloria/archive")} />
        </>
    );
}

export default FinderPage;
