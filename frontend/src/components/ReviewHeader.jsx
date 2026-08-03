import "./ReviewHeader.css";

function ReviewHeader({ totalReviews }) {
  return (
    <div className="review-header">
      <div>
        <h1 className="review-header__title">
          Reviews Management
        </h1>

        <p className="review-header__subtitle">
          Monitor and manage customer feedback from one place.
        </p>
      </div>

      <div className="review-header__stats">
        <span>Total Reviews</span>
        <h2>{totalReviews}</h2>
      </div>
    </div>
  );
}

export default ReviewHeader;