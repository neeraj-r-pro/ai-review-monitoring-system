import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import Rating from "../components/Rating";
import { submitReview } from "../services/reviewService";
import "./Home.css";

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

    setMessage({
      text: "",
      type: "",
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setMessage({
        text: "⚠ Please enter a valid email address.",
        type: "error",
      });
      return;
    }

    try {
      const response = await submitReview(formData);

      setMessage({
        text: `${response.message} Sentiment: ${
          response.sentiment
        } (${(response.confidence * 100).toFixed(2)}%)`,
        type: "success",
      });

      console.log(response);

      setFormData({
        name: "",
        email: "",
        review: "",
        rating: 0,
      });
    } catch (error) {
      setMessage({
        text: "❌ Something went wrong! Please try again.",
        type: "error",
      });

      console.error(error);
    }
  };

  return (
    <div className="home-page">
      <div className="review-card">
        <form onSubmit={handleSubmit} className="review-form">
          <div className="review-card__header">
            <h1 className="review-card__heading">
              We Value Your Feedback
            </h1>

            <p className="review-card__subtext">
              We appreciate every review. Your feedback helps us improve our
              products, services, and overall customer experience.
            </p>
          </div>

          {message.text && (
            <div
              className={`alert ${
                message.type === "success"
                  ? "alert--success"
                  : "alert--error"
              }`}
              role={message.type === "error" ? "alert" : "status"}
            >
              {message.text}
            </div>
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

        <div className="review-footer">
          Your information is kept private and is used only to improve our
          services.
        </div>
      </div>
    </div>
  );
}

export default Home;