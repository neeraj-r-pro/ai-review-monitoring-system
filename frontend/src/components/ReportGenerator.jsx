import { useState } from "react";
import "./ReportGenerator.css";

function ReportGenerator({ onReportGenerated }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [format, setFormat] = useState("pdf");

  const handleGenerate = () => {
    const url =
      `http://127.0.0.1:5000/api/reports?` +
      `format=${format}` +
      `&start_date=${startDate}` +
      `&end_date=${endDate}`;

    window.open(url, "_blank");

    // Refresh history after report generation
    if (onReportGenerated) {
      setTimeout(() => {
        onReportGenerated();
      }, 1000);
    }
  };

  return (
    <section className="report-generator">
      <h2>Generate Report</h2>

      <p>
        Export AI review analytics in PDF or Excel format.
      </p>

      <div className="report-form">
        <div className="report-field">
          <label>Start Date</label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="report-field">
          <label>End Date</label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="report-field">
          <label>Export Format</label>

          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
          </select>
        </div>
      </div>

      <button
        className="generate-btn"
        onClick={handleGenerate}
      >
        Generate Report
      </button>
    </section>
  );
}

export default ReportGenerator;