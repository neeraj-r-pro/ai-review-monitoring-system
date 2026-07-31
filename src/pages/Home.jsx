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

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear previous message whenever user starts typing
    setMessage({
      text: "",
      type: "",
    });

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
      setMessage({
        text: "⚠ Please fill in all fields and select a rating.",
        type: "error",
      });
      return;
    }

    setMessage({
      text: "✅ Review submitted successfully!",
      type: "success",
    });

    console.log(formData);

    setFormData({
      name: "",
      email: "",
      review: "",
      rating: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Customer Feedback</h1>

      {message.text && (
        <p
          style={{
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
            backgroundColor:
              message.type === "success" ? "#d4edda" : "#f8d7da",
            color:
              message.type === "success" ? "#155724" : "#721c24",
            border:
              message.type === "success"
                ? "1px solid #c3e6cb"
                : "1px solid #f5c6cb",
          }}
        >
          {message.text}
        </p>
      )}

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
        setRating={(value) => {
          setMessage({
            text: "",
            type: "",
          });

          setFormData({
            ...formData,
            rating: value,
          });
        }}
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