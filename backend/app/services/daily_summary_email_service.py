from datetime import datetime

from flask import render_template
from flask_mail import Message

from ..extensions import mail
from .business_intelligence_service import (
    BusinessIntelligenceService,
)
from .settings_service import get_settings


def send_daily_summary_email():

    settings = get_settings()

    if not settings.daily_summary_enabled:
        return

    report = (
        BusinessIntelligenceService.build_report()
    )

    if report["today"]["total_reviews"] == 0:

        print("No reviews today. Daily summary skipped.")

        return

    msg = Message(
        subject=(
            "📊 Daily Business Intelligence Report - "
            f"{report['today']['date']}"
        ),
        recipients=[
            settings.company_email,
        ],
    )

    msg.html = render_template(
        "daily_summary_email.html",
        report=report,
        year=datetime.now().year,
    )

    mail.send(msg)

    print(
        "Daily Business Intelligence Report Sent."
    )