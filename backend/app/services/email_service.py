from datetime import datetime

from flask import render_template
from flask_mail import Message

from ..extensions import mail
from ..utils.datetime_helper import format_datetime
from .settings_service import get_settings

def send_review_notification_email(review):

    settings = get_settings()

    sentiment = review.sentiment.lower()

    # ---------------------------------------
    # Notification Rules
    # ---------------------------------------

    if not settings.notifications_enabled:
        return

    if review.confidence < settings.minimum_confidence:
        return

    if sentiment == "negative" and not settings.notify_negative:
        return

    if sentiment == "neutral" and not settings.notify_neutral:
        return

    if sentiment == "positive" and not settings.notify_positive:
        return

    # ---------------------------------------
    # Email Colors
    # ---------------------------------------

    if sentiment == "positive":
        badge_color = "#16a34a"
        badge_background = "#dcfce7"

    elif sentiment == "neutral":
        badge_color = "#ca8a04"
        badge_background = "#fef9c3"

    else:
        badge_color = "#dc2626"
        badge_background = "#fee2e2"

    stars = "★" * review.rating + "☆" * (5 - review.rating)

    confidence = round(
        review.confidence * 100,
        2,
    )

    msg = Message(
        subject=f"🚨 {review.sentiment} Review - ReviewIQ",
        recipients=[
            settings.company_email,
        ],
    )

    msg.html = render_template(
        "negative_review_email.html",
        review=review,
        stars=stars,
        confidence=confidence,
        badge_color=badge_color,
        badge_background=badge_background,
        submitted_on=format_datetime(
            review.created_at,
            include_timezone=True,
        ),
        dashboard_url="http://localhost:5173/dashboard",
        year=datetime.now().year,
    )

    mail.send(msg)