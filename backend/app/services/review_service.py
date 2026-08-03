from ..extensions import db
from ..models import Review
from .ai_service import predict_sentiment
from ..utils.datetime_helper import format_datetime

def process_review(data):

    prediction = predict_sentiment(data["review"])

    review = Review(
        name=data["name"],
        email=data["email"],
        review=data["review"],
        rating=data["rating"],
        sentiment=prediction["sentiment"],
        confidence=prediction["confidence"]
    )

    db.session.add(review)
    db.session.commit()

    return {
        "success": True,
        "message": "Review saved successfully!",
        "sentiment": prediction["sentiment"],
        "confidence": prediction["confidence"]
    }


def get_all_reviews():
    reviews = (
        Review.query
        .order_by(Review.created_at.desc())
        .all()
    )

    result = []

    for review in reviews:
        result.append(
            {
                "id": review.id,
                "name": review.name,
                "email": review.email,
                "review": review.review,
                "rating": review.rating,
                "sentiment": review.sentiment,
                "confidence": round(review.confidence * 100, 2),
                "created_at": format_datetime(review.created_at),
            }
        )

    return result