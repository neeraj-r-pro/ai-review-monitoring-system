from flask import Blueprint, jsonify, request

from .services.review_service import process_review
from .services.dashboard_service import get_dashboard_data

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

@main.route("/api/dashboard", methods=["GET"])
def dashboard():
    data = get_dashboard_data()
    return jsonify(data)