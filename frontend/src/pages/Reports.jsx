import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ReportGenerator from "../components/ReportGenerator";
import ReportHistory from "../components/ReportHistory";

import "./Reports.css";

function Reports() {
  const [reports, setReports] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/report-history"
      );

      setReports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

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

          <ReportGenerator
            onReportGenerated={fetchHistory}
          />

          <ReportHistory
            reports={reports}
          />
        </main>
      </div>
    </div>
  );
}

export default Reports;