import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/reviews";

/**
 * Submit a new customer review
 */
export const submitReview = async (reviewData) => {
  const response = await axios.post(API_URL, reviewData);
  return response.data;
};

/**
 * Fetch all reviews
 */
export const getAllReviews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};