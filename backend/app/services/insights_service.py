from sqlalchemy import func

from ..extensions import db
from ..models import Review
from .summary_service import generate_summary

def get_insights_data():

    total_reviews = Review.query.count()

    positive_reviews = Review.query.filter_by(
        sentiment="Positive"
    ).count()

    average_confidence = (
        db.session.query(func.avg(Review.confidence)).scalar() or 0
    )

    average_rating = (
        db.session.query(func.avg(Review.rating)).scalar() or 0
    )

    most_common_rating = (
        db.session.query(
            Review.rating,
            func.count(Review.rating)
        )
        .group_by(Review.rating)
        .order_by(func.count(Review.rating).desc())
        .first()
    )

    if total_reviews == 0:
        customer_satisfaction = 0
    else:
        customer_satisfaction = round(
            (positive_reviews / total_reviews) * 100,
            1,
        )

    return {
        "customer_satisfaction": customer_satisfaction,
        "average_confidence": round(
            average_confidence * 100,
            2,
        ),
        "average_rating": round(
            average_rating,
            1,
        ),
        "most_common_rating": (
            most_common_rating[0]
            if most_common_rating
            else 0
        ),
        "reviews_analyzed": total_reviews,
        "summary": generate_summary(),
    }