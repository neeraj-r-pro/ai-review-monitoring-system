from ..extensions import db
from ..models import Review
from .ai_service import predict_sentiment


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