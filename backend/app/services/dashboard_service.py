from sqlalchemy import func

from ..extensions import db
from ..models import Review


def get_dashboard_data():
    # Overall statistics
    total_reviews = Review.query.count()

    positive_reviews = Review.query.filter_by(
        sentiment="Positive"
    ).count()

    neutral_reviews = Review.query.filter_by(
        sentiment="Neutral"
    ).count()

    negative_reviews = Review.query.filter_by(
        sentiment="Negative"
    ).count()

    average_rating = (
        db.session.query(func.avg(Review.rating)).scalar() or 0
    )

    # Recent reviews
    recent_reviews = (
        Review.query
        .order_by(Review.created_at.desc())
        .limit(5)
        .all()
    )

    reviews = []

    for review in recent_reviews:
        reviews.append(
            {
                "name": review.name,
                "rating": review.rating,
                "sentiment": review.sentiment,
                "date": review.created_at.strftime("%d %b %Y"),
            }
        )

    # Rating distribution
    ratings = (
        db.session.query(
            Review.rating,
            func.count(Review.id)
        )
        .group_by(Review.rating)
        .order_by(Review.rating)
        .all()
    )

    rating_distribution = []

    for rating, count in ratings:
        rating_distribution.append(
            {
                "rating": rating,
                "count": count,
            }
        )

    # Sentiment distribution
    sentiment_distribution = [
        {
            "name": "Positive",
            "value": positive_reviews,
        },
        {
            "name": "Neutral",
            "value": neutral_reviews,
        },
        {
            "name": "Negative",
            "value": negative_reviews,
        },
    ]

    return {
        "total_reviews": total_reviews,
        "positive_reviews": positive_reviews,
        "neutral_reviews": neutral_reviews,
        "negative_reviews": negative_reviews,
        "average_rating": round(float(average_rating), 1),
        "recent_reviews": reviews,
        "rating_distribution": rating_distribution,
        "sentiment_distribution": sentiment_distribution,
    }