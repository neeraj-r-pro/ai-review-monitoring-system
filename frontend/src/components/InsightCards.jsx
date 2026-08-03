import {
  Smile,
  Brain,
  Star,
  MessageSquare,
} from "lucide-react";

import StatCard from "./StatCard";
import KeywordCards from "./KeywordCards";

function InsightCards({ insights }) {
  const cards = [
    {
      icon: Smile,
      label: "Customer Satisfaction",
      value: `${insights.customer_satisfaction}%`,
      trendText: "Based on sentiment analysis",
      trendDirection: "neutral",
    },
    {
      icon: Brain,
      label: "Average AI Confidence",
      value: `${insights.average_confidence}%`,
      trendText: "Model prediction confidence",
      trendDirection: "neutral",
    },
    {
      icon: Star,
      label: "Most Common Rating",
      value:
        insights.most_common_rating > 0
          ? "★".repeat(insights.most_common_rating)
          : "-",
      trendText: "Highest frequency",
      trendDirection: "neutral",
    },
    {
      icon: MessageSquare,
      label: "Reviews Analysed",
      value: insights.reviews_analyzed,
      trendText: "Live database",
      trendDirection: "neutral",
    },
  ];

  return (
    <>
      <section className="dashboard-stats">
        {cards.map((card) => (
          <StatCard
            key={card.label}
            {...card}
          />
        ))}
      </section>

      <KeywordCards
        positiveKeywords={insights.positive_keywords}
        negativeKeywords={insights.negative_keywords}
      />
    </>
  );
}

export default InsightCards;