import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ReviewTable from "../components/ReviewTable";
import ReviewHeader from "../components/ReviewHeader";
import SearchBar from "../components/SearchBar";
import ReviewModal from "../components/ReviewModal";

import { getAllReviews } from "../services/reviewService";

import "./Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleViewReview = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(search.toLowerCase()) ||
      review.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2>Loading Reviews...</h2>;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <main className="dashboard-content">
          <div className="reviews-page">
            <ReviewHeader totalReviews={reviews.length} />

            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <ReviewTable
              reviews={filteredReviews}
              onViewReview={handleViewReview}
            />

            {showModal && (
              <ReviewModal
                review={selectedReview}
                onClose={() => setShowModal(false)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Reviews;