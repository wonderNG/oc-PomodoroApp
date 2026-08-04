import { ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { loadData } from "./services/storage";

function MetricCard({ title, value, suffix }) {
  return (
    <div className="metric-card">
      <div className="mc-header"><Info className="mc-icon"/>{title}</div>
      <div className="mc-content">
        <span className="mc-value">{value}</span>
        <span className="mc-suffix">{suffix}</span>
      </div>
    </div>
  );
}

export default function Stats() {
  const stats = loadData();

  // Calculate dynamic average duration (rounded to nearest integer)
  const average =
    stats.totalCompleted > 0
      ? Math.round(stats.totalFocusMinutes / stats.totalCompleted)
      : 0;

  const metrics = [
    {
      title: "Total of Completed Sessions",
      value: stats.totalCompleted,
      suffix: "sessions",
    },
    {
      title: "Average Session Duration",
      value: average,
      suffix: "min",
    },
    {
      title: "Total Started Sessions",
      value: stats.totalStarted,
      suffix: "sessions",
    },
  ];

  return (
    <div className="main-container">
      <div className="floating-menu stats-info">
        <Link to="/">
          <Button text="" iconLeft={<ArrowLeft />} variant="outline" />
        </Link>
      </div>

      <div className="calendar">
        <p className="calendar-placeholder">
          Calendar...
          <br />Coming soon
        </p>
      </div>

      <div>
        <div className="metric-cards">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>
      </div>
    </div>
  );
}
