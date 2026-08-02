import { Bell } from "lucide-react";
import "./Topbar.css";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar__greeting">
        <h1 className="topbar__title">Good Morning, Admin</h1>
        <p className="topbar__subtitle">Here's what's happening today.</p>
      </div>

      <div className="topbar__actions">
        <button type="button" className="topbar__icon-button" aria-label="Notifications">
          <Bell size={19} strokeWidth={1.75} />
          <span className="topbar__notification-dot" aria-hidden="true" />
        </button>

        <div className="topbar__avatar" aria-hidden="true">
          A
        </div>
      </div>
    </header>
  );
}

export default Topbar;
