import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import NotificationSettings from "../components/NotificationSettings";

function Settings() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <main className="dashboard-content">

          <div className="page-header">

            <h1>Settings</h1>

            <p>
              Configure email notification preferences.
            </p>

          </div>

          <NotificationSettings />

        </main>

      </div>

    </div>
  );
}

export default Settings;