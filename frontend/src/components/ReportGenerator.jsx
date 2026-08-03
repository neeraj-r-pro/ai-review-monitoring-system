import "./ReportGenerator.css";

function ReportGenerator() {
  return (
    <section className="report-generator">

      <h2>Generate Report</h2>

      <p>
        Export AI review analytics in PDF or Excel format.
      </p>

      <div className="report-form">

        <div className="report-field">
          <label>Start Date</label>
          <input type="date" />
        </div>

        <div className="report-field">
          <label>End Date</label>
          <input type="date" />
        </div>

        <div className="report-field">
          <label>Export Format</label>

          <select>
            <option>PDF</option>
            <option>Excel</option>
          </select>

        </div>

      </div>

      <button className="generate-btn">
        Generate Report
      </button>

    </section>
  );
}

export default ReportGenerator;