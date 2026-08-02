import { FaStar } from "react-icons/fa";
import "./Rating.css";

function Rating({ rating, setRating }) {
  return (
    <div className="form-group">
      <label className="form-label">Rating</label>

      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`rating-star ${
              star <= rating ? "rating-star-active" : ""
            }`}
            onClick={() => setRating(rating === star ? 0 : star)}
          />
        ))}
      </div>

      <small className="rating-text">
        {rating === 0
          ? "Select a rating"
          : `${rating} ${rating === 1 ? "Star" : "Stars"}`}
      </small>
    </div>
  );
}

export default Rating;