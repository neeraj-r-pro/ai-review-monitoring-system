import { useEffect, useState } from "react";
import axios from "axios";
import {
  MessageSquare,
  Smile,
  Meh,
  Frown,
  Star,
  BarChart3,
  LineChart,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

import "./Dashboard.css";

import SentimentPieChart from "../components/charts/SentimentPieChart";
import RatingBarChart from "../components/charts/RatingBarChart";

const SENTIMENT_BADGE_CLASS = {
  Positive: "badge--positive",
  Neutral: "badge--neutral",
  Negative: "badge--negative",
};

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    total_reviews: 0,
    positive_reviews: 0,
    neutral_reviews: 0,
    negative_reviews: 0,
    average_rating: 0,
    recent_reviews: [],
    rating_distribution: [],
    sentiment_distribution: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/dashboard"
        );

        setDashboardData(response.data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    fetchDashboard();
  }, []);

  const STATS = [
    {
      icon: MessageSquare,
      label: "Total Reviews",
      value: dashboardData.total_reviews,
      trendText: "Updated just now",
      trendDirection: "neutral",
    },
    {
      icon: Smile,
      label: "Positive Reviews",
      value: dashboardData.positive_reviews,
      trendText: "Updated just now",
      trendDirection: "neutral",
    },
    {
      icon: Meh,
      label: "Neutral Reviews",
      value: dashboardData.neutral_reviews,
      trendText: "Updated just now",
      trendDirection: "neutral",
    },
    {
      icon: Frown,
      label: "Negative Reviews",
      value: dashboardData.negative_reviews,
      trendText: "Updated just now",
      trendDirection: "neutral",
    },
    {
      icon: Star,
      label: "Average Rating",
      value: dashboardData.average_rating,
      trendText: "Updated just now",
      trendDirection: "neutral",
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <main className="dashboard-content">
          <section className="dashboard-stats" aria-label="Key statistics">
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </section>

          <section className="dashboard-charts" aria-label="Analytics">
            <div className="chart-card">
              <div className="chart-card__header">
                <h2 className="chart-card__title">
                  Sentiment Distribution
                </h2>

                <span className="chart-card__period">
                  Live Data
                </span>
              </div>

              <SentimentPieChart
                data={dashboardData.sentiment_distribution}
              />
            </div>

            <div className="chart-card">
              <div className="chart-card__header">
                <h2 className="chart-card__title">
                  Rating Distribution
                </h2>

                <span className="chart-card__period">
                  Live Data
                </span>
              </div>

              <RatingBarChart
                data={dashboardData.rating_distribution}
              />
            </div>
          </section>

          <section
            className="dashboard-table-section"
            aria-label="Recent reviews"
          >
            <div className="table-card">
              <div className="table-card__header">
                <h2 className="table-card__title">Recent Reviews</h2>
              </div>

              <div className="table-card__scroll">
                <table className="reviews-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Rating</th>
                      <th>Sentiment</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dashboardData.recent_reviews.map((row, index) => (
                      <tr key={index}>
                        <td>{row.name}</td>

                        <td>
                          <span
                            className="rating-stars"
                            aria-label={`${row.rating} out of 5 stars`}
                          >
                            {"★".repeat(row.rating)}
                            <span className="rating-stars__muted">
                              {"★".repeat(5 - row.rating)}
                            </span>
                          </span>
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              SENTIMENT_BADGE_CLASS[row.sentiment]
                            }`}
                          >
                            {row.sentiment}
                          </span>
                        </td>

                        <td className="reviews-table__date">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;