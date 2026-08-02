import { useState } from "react";
import axios from "axios";
import { User, Mail, MessageSquare, Loader2, Check } from "lucide-react";
import StarRating from "./StarRating";
import "./ReviewForm.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_STATE = {
  name: "",
  email: "",
  rating: 0,
  review: "",
};

/**
 * FloatingField
 * Small internal helper so every text input shares identical
 * label / icon / error markup instead of repeating it three times.
 */
function FloatingField({
  id,
  label,
  icon: Icon,
  error,
  as = "input",
  ...inputProps
}) {
  const Tag = as;
  return (
    <div className="field">
      <div className={`field__control ${error ? "field__control--error" : ""}`}>
        <Icon size={18} strokeWidth={1.75} className="field__icon" aria-hidden="true" />
        <Tag id={id} className="field__input" placeholder=" " {...inputProps} />
        <label htmlFor={id} className="field__label">
          {label}
        </label>
      </div>
      {error && (
        <span className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function ReviewForm() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const setRating = (value) => {
    setForm((prev) => ({ ...prev, rating: value }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your full name.";
    if (!form.email.trim()) {
      next.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.rating) next.rating = "Select a rating.";
    if (!form.review.trim()) next.review = "Share a few words about your experience.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      // NOTE: endpoint, payload shape, and backend integration are placeholders —
      // wire this up to the project's existing API client / axios instance
      // and sentiment-analysis endpoint. No business logic is implied here.
      await axios.post("/api/reviews", {
        name: form.name.trim(),
        email: form.email.trim(),
        rating: form.rating,
        review: form.review.trim(),
      });
      setStatus("success");
      setForm(INITIAL_STATE);
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="review-page">
        <div className="review-card review-card--success" role="status">
          <div className="success-icon">
            <Check size={22} strokeWidth={2} />
          </div>
          <h2 className="success-title">Thank you for your feedback</h2>
          <p className="success-copy">
            Your review has been received. We read every submission and use it to
            shape what we build next.
          </p>
          <button
            type="button"
            className="button button--ghost"
            onClick={() => setStatus("idle")}
          >
            Share another review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="review-page">
      <header className="review-nav">
        <span className="review-nav__mark" aria-hidden="true">
          ◆
        </span>
        <span className="review-nav__name">Customer Feedback</span>
      </header>

      <main className="review-card">
        <h1 className="review-heading">Share your experience</h1>
        <p className="review-subtext">
          Your feedback helps us improve our products and services. We read every
          review we receive.
        </p>

        <form className="review-form" onSubmit={handleSubmit} noValidate>
          <FloatingField
            id="name"
            label="Full name"
            icon={User}
            value={form.name}
            onChange={updateField("name")}
            error={errors.name}
            autoComplete="name"
          />

          <FloatingField
            id="email"
            label="Email address"
            icon={Mail}
            type="email"
            value={form.email}
            onChange={updateField("email")}
            error={errors.email}
            autoComplete="email"
          />

          <StarRating value={form.rating} onChange={setRating} error={errors.rating} />

          <FloatingField
            id="review"
            label="Your review"
            icon={MessageSquare}
            as="textarea"
            rows={4}
            value={form.review}
            onChange={updateField("review")}
            error={errors.review}
          />

          {status === "error" && (
            <p className="form-banner form-banner--error" role="alert">
              Something went wrong on our end. Please try submitting again.
            </p>
          )}

          <button type="submit" className="button button--primary" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="spin" />
                Submitting
              </>
            ) : (
              "Submit review"
            )}
          </button>
        </form>
      </main>

      <footer className="review-footer">
        <p>Your information is kept private and never shared with third parties.</p>
      </footer>
    </div>
  );
}

export default ReviewForm;
