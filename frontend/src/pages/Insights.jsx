import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import InsightHeader from "../components/InsightHeader";
import InsightCards from "../components/InsightCards";
import AISummary from "../components/AISummary";

function Insights() {
  const [insights, setInsights] = useState({
    customer_satisfaction: 0,
    average_confidence: 0,
    average_rating: 0,
    most_common_rating: 0,
    reviews_analyzed: 0,
    summary: "",
  });

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/insights"
        );

        setInsights(response.data);
      } catch (error) {
        console.error("Insights Error:", error);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <main className="dashboard-content">
          <InsightHeader />

          <InsightCards insights={insights} />

          <AISummary summary={insights.summary} />
        </main>
      </div>
    </div>
  );
}

export default Insights;