import os
from .scheduler import schedule_daily_summary
from flask import (
    Blueprint,
    jsonify,
    request,
    send_file,
    abort,
)

from .services.review_service import (
    process_review,
    get_all_reviews,
)
from .services.dashboard_service import get_dashboard_data
from .services.insights_service import get_insights_data
from .services.report_service import generate_report
from .services.report_history_service import get_report_history
from .services.settings_service import (
    get_settings_json,
    update_settings,
)

main = Blueprint("main", __name__)


@main.route("/")
def home():
    return jsonify(
        {
            "message": "AI Review Monitoring Backend is running!"
        }
    )


# ---------------------------------------------------------
# Reviews
# ---------------------------------------------------------

@main.route("/api/reviews", methods=["POST"])
def submit_review():

    data = request.get_json()

    result = process_review(data)

    return jsonify(result)


@main.route("/api/reviews", methods=["GET"])
def get_reviews():

    reviews = get_all_reviews()

    return jsonify(reviews)


# ---------------------------------------------------------
# Dashboard
# ---------------------------------------------------------

@main.route("/api/dashboard", methods=["GET"])
def dashboard():

    data = get_dashboard_data()

    return jsonify(data)


# ---------------------------------------------------------
# Insights
# ---------------------------------------------------------

@main.route("/api/insights", methods=["GET"])
def insights():

    return get_insights_data()


# ---------------------------------------------------------
# Generate Reports
# ---------------------------------------------------------

@main.route("/api/reports", methods=["GET"])
def reports():

    report_format = request.args.get(
        "format",
        "pdf",
    )

    start_date = request.args.get(
        "start_date"
    )

    end_date = request.args.get(
        "end_date"
    )

    file_path = generate_report(
        report_format,
        start_date,
        end_date,
    )

    if report_format == "excel":

        return send_file(
            file_path,
            as_attachment=True,
            download_name="AI_Review_Report.xlsx",
            mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )

    return send_file(
        file_path,
        as_attachment=True,
        download_name="AI_Review_Report.pdf",
        mimetype="application/pdf",
    )


# ---------------------------------------------------------
# Report History
# ---------------------------------------------------------

@main.route("/api/report-history", methods=["GET"])
def report_history():

    history = get_report_history()

    return jsonify(history)

# ---------------------------------------------------------
# Notification Settings
# ---------------------------------------------------------

@main.route("/api/settings", methods=["GET"])
def settings():

    return jsonify(
        get_settings_json()
    )


@main.route("/api/settings", methods=["PUT"])
def save_settings():

    data = request.get_json()

    result = update_settings(data)

    if not result["success"]:
        return jsonify(result), 400

    # Refresh scheduler with the newly saved settings
    from flask import current_app

    schedule_daily_summary(current_app._get_current_object())

    return jsonify(result)

# ---------------------------------------------------------
# Download Existing Report
# ---------------------------------------------------------

@main.route("/api/reports/download/<filename>", methods=["GET"])
def download_report(filename):

    BASE_DIR = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "..",
        )
    )

    reports_folder = os.path.join(
        BASE_DIR,
        "reports",
    )

    file_path = os.path.join(
        reports_folder,
        filename,
    )

    print("DOWNLOAD ROUTE HIT")
    print("BASE_DIR:", BASE_DIR)
    print("REPORTS FOLDER:", reports_folder)
    print("FILE PATH:", file_path)
    print("EXISTS:", os.path.exists(file_path))

    if not os.path.exists(file_path):
        abort(404)

    return send_file(
        file_path,
        as_attachment=True,
    )
