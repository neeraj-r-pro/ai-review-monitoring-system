import { FaStar } from "react-icons/fa";

function Rating({ rating, setRating }) {
  return (
    <div>
      <label>Rating</label>
      <br />

      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={30}
          color={star <= rating ? "gold" : "lightgray"}
          style={{ cursor: "pointer", marginRight: "5px" }}
          onClick={() => setRating(rating === star ? 0 : star)}        />
      ))}
    </div>
  );
}

export default Rating;