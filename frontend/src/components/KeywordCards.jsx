import { useState } from "react";

import "./KeywordCards.css";
import KeywordModal from "./KeywordModal";

function KeywordCards({
  positiveKeywords = [],
  negativeKeywords = [],
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState([]);

  const handleOpen = (heading, data) => {
    setTitle(heading);
    setKeywords(data);
    setOpen(true);
  };

  console.log("Positive Keywords:", positiveKeywords);
  console.log("Negative Keywords:", negativeKeywords);

  return (
    <>
      <div className="keyword-grid">
        {/* Positive Card */}
        <div className="keyword-card">
          <div className="keyword-header">
            <h3 className="keyword-title positive">
              🟢 Positive Keywords
            </h3>

            <button
              className="view-all-btn"
              onClick={() =>
                handleOpen(
                  "Positive Keywords",
                  positiveKeywords
                )
              }
            >
              View All →
            </button>
          </div>

          <div className="keyword-tags">
            {positiveKeywords.slice(0, 5).map((item, index) => {
              console.log("Positive Item:", item);

              return (
                <span
                  key={item.keyword || index}
                  className="keyword-tag positive-tag"
                >
                  {item.keyword}
                </span>
              );
            })}
          </div>
        </div>

        {/* Negative Card */}
        <div className="keyword-card">
          <div className="keyword-header">
            <h3 className="keyword-title negative">
              🔴 Negative Keywords
            </h3>

            <button
              className="view-all-btn"
              onClick={() =>
                handleOpen(
                  "Negative Keywords",
                  negativeKeywords
                )
              }
            >
              View All →
            </button>
          </div>

          <div className="keyword-tags">
            {negativeKeywords.slice(0, 5).map((item, index) => {
              console.log("Negative Item:", item);

              return (
                <span
                  key={item.keyword || index}
                  className="keyword-tag negative-tag"
                >
                  {item.keyword}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {open && (
        <KeywordModal
          title={title}
          keywords={keywords}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default KeywordCards;