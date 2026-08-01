from datetime import datetime

from .extensions import db


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(120), nullable=False)

    review = db.Column(db.Text, nullable=False)

    rating = db.Column(db.Integer, nullable=False)

    sentiment = db.Column(db.String(20), nullable=True)

    confidence = db.Column(db.Float, nullable=True)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )