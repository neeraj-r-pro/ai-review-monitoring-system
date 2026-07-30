import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import Rating from "../components/Rating";

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <div>
      <h1>Customer Feedback</h1>

      <InputField
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputField
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Rating
         rating={rating}
        setRating={setRating}
      />

      <TextArea
        label="Review"
        placeholder="Write your review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <Button text="Submit Review" />
    </div>
  );
}

export default Home;