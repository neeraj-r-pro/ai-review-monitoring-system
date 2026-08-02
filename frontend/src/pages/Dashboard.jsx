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

const STATS = [
  {
    icon: MessageSquare,
    label: "Total Reviews",
    value: "12,480",
    trendText: "+8.1% vs last week",
    trendDirection: "up",
  },
  {
    icon: Smile,
    label: "Positive Reviews",
    value: "9,102",
    trendText: "+5.4% vs last week",
    trendDirection: "up",
  },
  {
    icon: Meh,
    label: "Neutral Reviews",
    value: "2,014",
    trendText: "-1.2% vs last week",
    trendDirection: "down",
  },
  {
    icon: Frown,
    label: "Negative Reviews",
    value: "1,364",
    trendText: "-3.6% vs last week",
    trendDirection: "down",
  },
  {
    icon: Star,
    label: "Average Rating",
    value: "4.6",
    trendText: "No change vs last week",
    trendDirection: "neutral",
  },
];

const RECENT_REVIEWS = [
  { customer: "Ava Thompson", rating: 5, sentiment: "Positive", date: "Aug 1, 2026" },
  { customer: "Daniel Kim", rating: 3, sentiment: "Neutral", date: "Aug 1, 2026" },
  { customer: "Priya Nair", rating: 2, sentiment: "Negative", date: "Jul 31, 2026" },
  { customer: "Marcus Lee", rating: 5, sentiment: "Positive", date: "Jul 31, 2026" },
  { customer: "Sofia Ramirez", rating: 4, sentiment: "Positive", date: "Jul 30, 2026" },
  { customer: "James Carter", rating: 1, sentiment: "Negative", date: "Jul 30, 2026" },
];

const SENTIMENT_BADGE_CLASS = {
  Positive: "badge--positive",
  Neutral: "badge--neutral",
  Negative: "badge--negative",
};

function Dashboard() {
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
                <h2 className="chart-card__title">Sentiment trend</h2>
                <span className="chart-card__period">Last 30 days</span>
              </div>
              <div className="chart-card__placeholder">
                <LineChart size={28} strokeWidth={1.5} />
                <p>Chart will appear here</p>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-card__header">
                <h2 className="chart-card__title">Review volume</h2>
                <span className="chart-card__period">Last 30 days</span>
              </div>
              <div className="chart-card__placeholder">
                <BarChart3 size={28} strokeWidth={1.5} />
                <p>Chart will appear here</p>
              </div>
            </div>
          </section>

          <section className="dashboard-table-section" aria-label="Recent reviews">
            <div className="table-card">
              <div className="table-card__header">
                <h2 className="table-card__title">Recent Reviews</h2>
              </div>

              <div className="table-card__scroll">
                <table className="reviews-table">
                  <thead>
                    <tr>
                      <th scope="col">Customer</th>
                      <th scope="col">Rating</th>
                      <th scope="col">Sentiment</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_REVIEWS.map((row) => (
                      <tr key={`${row.customer}-${row.date}`}>
                        <td>{row.customer}</td>
                        <td>
                          <span className="rating-stars" aria-label={`${row.rating} out of 5 stars`}>
                            {"★".repeat(row.rating)}
                            <span className="rating-stars__muted">
                              {"★".repeat(5 - row.rating)}
                            </span>
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${SENTIMENT_BADGE_CLASS[row.sentiment]}`}>
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
