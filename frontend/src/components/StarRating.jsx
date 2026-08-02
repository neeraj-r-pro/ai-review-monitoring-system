import { useState } from "react";
import { Star } from "lucide-react";
import "./StarRating.css";

const RATING_LABELS = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very good",
  5: "Excellent",
};

/**
 * Accessible 5-star rating control.
 * Exposes the same `value` / `onChange` contract as a native form field
 * so it can be wired into any parent form state without extra glue.
 */
function StarRating({ value, onChange, error }) {
  const [hovered, setHovered] = useState(0);
  const displayValue = hovered || value;

  const handleKeyDown = (e, star) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(star);
    }
    if (e.key === "ArrowRight" && star < 5) {
      onChange(star + 1);
    }
    if (e.key === "ArrowLeft" && star > 1) {
      onChange(star - 1);
    }
  };

  return (
    <div className="star-rating-field">
      <span className="field-label" id="rating-label">
        How would you rate your experience?
      </span>

      <div
        className="star-rating"
        role="radiogroup"
        aria-labelledby="rating-label"
        onMouseLeave={() => setHovered(0)}
      >
        <div className="star-rating__stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              role="radio"
              aria-checked={value === star}
              aria-label={`${star} star${star > 1 ? "s" : ""} — ${RATING_LABELS[star]}`}
              className="star-rating__button"
              onMouseEnter={() => setHovered(star)}
              onFocus={() => setHovered(star)}
              onBlur={() => setHovered(0)}
              onClick={() => onChange(star)}
              onKeyDown={(e) => handleKeyDown(e, star)}
            >
              <Star
                size={26}
                strokeWidth={1.5}
                className="star-rating__icon"
                fill={displayValue >= star ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>

        <span
          className={`star-rating__caption ${displayValue ? "is-visible" : ""}`}
          aria-live="polite"
        >
          {displayValue ? RATING_LABELS[displayValue] : ""}
        </span>
      </div>

      {error && (
        <span className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default StarRating;
