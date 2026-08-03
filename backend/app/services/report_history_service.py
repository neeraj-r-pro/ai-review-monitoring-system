import os
from datetime import datetime


def get_report_history():

    BASE_DIR = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "..",
            "..",
        )
    )

    reports_folder = os.path.join(
        BASE_DIR,
        "reports",
    )

    if not os.path.exists(reports_folder):
        return []

    reports = []

    for filename in os.listdir(reports_folder):

        filepath = os.path.join(
            reports_folder,
            filename,
        )

        if not os.path.isfile(filepath):
            continue

        created = datetime.fromtimestamp(
            os.path.getctime(filepath)
        )

        reports.append(
            {
                "name": filename,
                "format": (
                    "PDF"
                    if filename.endswith(".pdf")
                    else "Excel"
                ),
                "created_at": created.strftime(
                    "%d %b %Y %I:%M %p"
                ),
                "download_url": f"/api/reports/download/{filename}",
                "timestamp": created.timestamp(),
            }
        )

    reports.sort(
        key=lambda x: x["timestamp"],
        reverse=True,
    )
    for report in reports:
        report.pop("timestamp")

    return reports