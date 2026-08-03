import "./KeywordModal.css";

function KeywordModal({ title, keywords, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal keyword-modal">

        <div className="modal-header">
          <h2>{title}</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="keyword-list">

          {keywords.map((item, index) => (
            <div
              key={index}
              className="keyword-row"
            >
              <span className="keyword-name">
                {item.keyword}
              </span>

              <span className="keyword-score">
                {item.score}%
              </span>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default KeywordModal;