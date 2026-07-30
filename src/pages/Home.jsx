import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import Rating from "../components/Rating";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.review ||
      formData.rating === 0
    ) {
      alert("Please fill in all fields and select a rating.");
      return;
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Customer Feedback</h1>

      <InputField
        label="Name"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <Rating
        rating={formData.rating}
        setRating={(value) =>
          setFormData({
            ...formData,
            rating: value,
          })
        }
      />

      <TextArea
        label="Review"
        name="review"
        placeholder="Write your review"
        value={formData.review}
        onChange={handleChange}
      />

      <Button
        text="Submit Review"
        type="submit"
      />
    </form>
  );
}

export default Home;