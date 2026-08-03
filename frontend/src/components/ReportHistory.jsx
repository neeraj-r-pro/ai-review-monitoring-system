import "./ReportHistory.css";

function ReportHistory({ reports }) {
  return (
    <section className="report-history">
      <h2>Recent Reports</h2>

      <p>
        Previously generated reports available for download.
      </p>

      <table className="history-table">
        <thead>
          <tr>
            <th>Report</th>
            <th>Format</th>
            <th>Generated On</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="empty-row"
              >
                No reports generated yet.
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr key={report.name}>
                <td>{report.name}</td>

                <td>{report.format}</td>

                <td>{report.created_at}</td>

                <td>
                  <a
                    href={`http://127.0.0.1:5000${report.download_url}`}
                    className="download-btn"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

export default ReportHistory;