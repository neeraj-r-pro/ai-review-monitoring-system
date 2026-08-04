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

class NotificationSettings(db.Model):
    __tablename__ = "notification_settings"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    company_email = db.Column(
        db.String(120),
        nullable=False,
        default="reviewiq.notifications@gmail.com",
    )

    notifications_enabled = db.Column(
        db.Boolean,
        default=True,
        nullable=False,
    )

    notify_negative = db.Column(
        db.Boolean,
        default=True,
        nullable=False,
    )

    notify_neutral = db.Column(
        db.Boolean,
        default=False,
        nullable=False,
    )

    notify_positive = db.Column(
        db.Boolean,
        default=False,
        nullable=False,
    )

    minimum_confidence = db.Column(
        db.Float,
        default=0.80,
        nullable=False,
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )