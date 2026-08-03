import "./ReviewModal.css";

function ReviewModal({ review, onClose }) {
  if (!review) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="review-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Review Details</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-body">

          <div className="detail">
            <strong>Customer</strong>
            <p>{review.name}</p>
          </div>

          <div className="detail">
            <strong>Email</strong>
            <p>{review.email}</p>
          </div>

          <div className="detail">
            <strong>Rating</strong>
            <p>{"★".repeat(review.rating)}</p>
          </div>

          <div className="detail">
            <strong>Sentiment</strong>
            <p>{review.sentiment}</p>
          </div>

          <div className="detail">
            <strong>Confidence</strong>
            <p>{review.confidence}%</p>
          </div>

          <div className="detail">
            <strong>Submitted</strong>
            <p>{review.created_at}</p>
          </div>

          <div className="detail">
            <strong>Review</strong>

            <div className="review-box">
              {review.review}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ReviewModal;