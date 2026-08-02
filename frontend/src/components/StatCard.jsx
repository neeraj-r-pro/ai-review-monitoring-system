import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import "./StatCard.css";

const TREND_ICON = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: Minus,
};

/**
 * @param {object} props
 * @param {React.ComponentType} props.icon - lucide-react icon component
 * @param {string} props.label
 * @param {string|number} props.value
 * @param {string} props.trendText - e.g. "+4.2% vs last week"
 * @param {"up"|"down"|"neutral"} props.trendDirection
 */
function StatCard({ icon: Icon, label, value, trendText, trendDirection = "neutral" }) {
  const TrendIcon = TREND_ICON[trendDirection];

  return (
    <div className="stat-card">
      <div className="stat-card__icon">
        <Icon size={18} strokeWidth={1.75} />
      </div>

      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>

      {trendText && (
        <p className={`stat-card__trend stat-card__trend--${trendDirection}`}>
          <TrendIcon size={14} strokeWidth={2} />
          {trendText}
        </p>
      )}
    </div>
  );
}

export default StatCard;
