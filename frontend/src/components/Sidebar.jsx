import { LayoutGrid, MessageSquare, BarChart3, FileText, Settings } from "lucide-react";
import "./Sidebar.css";

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutGrid, active: true },
  { label: "Reviews", icon: MessageSquare, active: false },
  { label: "Insights", icon: BarChart3, active: false },
  { label: "Reports", icon: FileText, active: false },
  { label: "Settings", icon: Settings, active: false },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo-mark" aria-hidden="true">
          R
        </span>
        <div className="sidebar__brand-text">
          <span className="sidebar__logo">ReviewIQ</span>
          <span className="sidebar__subtitle">AI Review Monitoring Platform</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        <ul className="sidebar__list">
          {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
            <li key={label}>
              <a
                href="#"
                className={`sidebar__link ${active ? "sidebar__link--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} strokeWidth={1.75} className="sidebar__icon" />
                <span className="sidebar__label">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
