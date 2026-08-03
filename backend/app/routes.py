from flask import Blueprint, jsonify, request, send_file

from .services.review_service import (
    process_review,
    get_all_reviews,
)
from .services.dashboard_service import get_dashboard_data
from .services.insights_service import get_insights_data
from .services.report_service import generate_report

main = Blueprint("main", __name__)


@main.route("/")
def home():
    return jsonify(
        {
            "message": "AI Review Monitoring Backend is running!"
        }
    )


@main.route("/api/reviews", methods=["POST"])
def submit_review():

    data = request.get_json()

    result = process_review(data)

    return jsonify(result)


@main.route("/api/reviews", methods=["GET"])
def get_reviews():

    reviews = get_all_reviews()

    return jsonify(reviews)


@main.route("/api/dashboard", methods=["GET"])
def dashboard():

    data = get_dashboard_data()

    return jsonify(data)


@main.route("/api/insights", methods=["GET"])
def insights():

    return get_insights_data()


@main.route("/api/reports", methods=["GET"])
def reports():

    report_format = request.args.get(
        "format",
        "pdf",
    )

    file_path = generate_report(report_format)

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