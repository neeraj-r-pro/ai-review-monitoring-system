import { Eye } from "lucide-react";
import "./ReviewTable.css";

function ReviewTable({ reviews, onViewReview }) {
  return (
    <div className="table-card">
      <div className="table-card__scroll">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Sentiment</th>
              <th>Confidence</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.name}</td>

                <td>{review.email}</td>

                <td>
                  <span className="rating">
                    {"★".repeat(review.rating)}
                  </span>

                  <span className="rating-empty">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge badge-${review.sentiment.toLowerCase()}`}
                  >
                    {review.sentiment}
                  </span>
                </td>

                <td>{review.confidence}%</td>

                <td>{review.created_at}</td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() => onViewReview(review)}
                  >
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewTable;