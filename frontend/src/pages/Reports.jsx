import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ReportGenerator from "../components/ReportGenerator";
import ReportHistory from "../components/ReportHistory";

import "./Reports.css";

function Reports() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <main className="dashboard-content">
          <div className="page-header">
            <h1>Reports</h1>
            <p>
              Generate and download AI review reports for analysis.
            </p>
          </div>

          <ReportGenerator />

          <ReportHistory />
        </main>
      </div>
    </div>
  );
}

export default Reports;