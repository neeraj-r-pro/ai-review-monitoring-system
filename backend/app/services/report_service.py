import os
from datetime import datetime, timedelta

from sqlalchemy import func

from ..models import Review
from ..extensions import db

from .summary_service import generate_summary
from .keyword_service import (
    extract_positive_keywords,
    extract_negative_keywords,
)

from ..utils.pdf_generator import generate_pdf
from ..utils.excel_generator import generate_excel


def generate_report(
    report_format="pdf",
    start_date=None,
    end_date=None,
):

    query = Review.query

    if start_date:
        start = datetime.strptime(
            start_date,
            "%Y-%m-%d",
        )

        query = query.filter(
            Review.created_at >= start
        )

    if end_date:
        end = datetime.strptime(
            end_date,
            "%Y-%m-%d",
        ) + timedelta(days=1)

        query = query.filter(
            Review.created_at < end
        )

    reviews = query.all()

    total_reviews = len(reviews)

    positive_reviews = query.filter(
        Review.sentiment == "Positive"
    ).count()

    neutral_reviews = query.filter(
        Review.sentiment == "Neutral"
    ).count()

    negative_reviews = query.filter(
        Review.sentiment == "Negative"
    ).count()

    average_rating = (
        query.with_entities(
            func.avg(Review.rating)
        ).scalar()
        or 0
    )

    average_confidence = (
        query.with_entities(
            func.avg(Review.confidence)
        ).scalar()
        or 0
    )

    customer_satisfaction = (
        (positive_reviews / total_reviews) * 100
        if total_reviews
        else 0
    )

    report_data = {
        "total_reviews": total_reviews,
        "positive_reviews": positive_reviews,
        "neutral_reviews": neutral_reviews,
        "negative_reviews": negative_reviews,
        "average_rating": round(
            average_rating,
            2,
        ),
        "average_confidence": round(
            average_confidence * 100,
            2,
        ),
        "customer_satisfaction": round(
            customer_satisfaction,
            2,
        ),

        # We'll improve these next
        "summary": generate_summary(),
        "positive_keywords": extract_positive_keywords(),
        "negative_keywords": extract_negative_keywords(),
    }

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

    os.makedirs(
        reports_folder,
        exist_ok=True,
    )

    if report_format == "excel":

        timestamp = datetime.now().strftime(
            "%Y%m%d_%H%M%S"
        )

        file_path = os.path.join(
            reports_folder,
            f"AI_Review_Report_{timestamp}.xlsx",
        )

        generate_excel(
            report_data,
            file_path,
        )

    else:

        timestamp = datetime.now().strftime(
            "%Y%m%d_%H%M%S"
        )

        file_path = os.path.join(
            reports_folder,
            f"AI_Review_Report_{timestamp}.pdf",
        )

        generate_pdf(
            report_data,
            file_path,
        )

    return file_path