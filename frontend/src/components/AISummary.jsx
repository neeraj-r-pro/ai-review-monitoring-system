import { Brain } from "lucide-react";
import "./AISummary.css";

function AISummary({ summary }) {
  return (
    <div className="summary-card">
      <div className="summary-header">
        <Brain size={22} />
        <h2>AI Summary</h2>
      </div>

      <p>{summary}</p>
    </div>
  );
}

export default AISummary;