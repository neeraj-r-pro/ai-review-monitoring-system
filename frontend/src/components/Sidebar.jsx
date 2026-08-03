import {
  LayoutGrid,
  MessageSquare,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";

const NAV_ITEMS = [
  {
    label: "Overview",
    icon: LayoutGrid,
    path: "/dashboard",
  },
  {
    label: "Reviews",
    icon: MessageSquare,
    path: "/reviews",
  },
  {
    label: "Insights",
    icon: BarChart3,
    path: "/insights",
  },
  {
    label: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo-mark">R</span>

        <div className="sidebar__brand-text">
          <span className="sidebar__logo">ReviewIQ</span>

          <span className="sidebar__subtitle">
            AI Review Monitoring Platform
          </span>
        </div>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
            <li key={label}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "sidebar__link sidebar__link--active"
                    : "sidebar__link"
                }
              >
                <Icon
                  size={18}
                  strokeWidth={1.75}
                  className="sidebar__icon"
                />

                <span className="sidebar__label">
                  {label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;