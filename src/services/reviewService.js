import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/reviews";

export const submitReview = async (reviewData) => {
  const response = await axios.post(API_URL, reviewData);
  return response.data;
};