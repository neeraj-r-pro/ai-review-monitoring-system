from ..extensions import db
from ..models import NotificationSettings


def get_settings():
    """
    Return notification settings.
    Create default settings if none exist.
    """

    settings = NotificationSettings.query.first()

    if settings is None:

        settings = NotificationSettings()

        db.session.add(settings)
        db.session.commit()

    return settings


def get_settings_json():

    settings = get_settings()

    return {
        "company_email": settings.company_email,
        "notifications_enabled": settings.notifications_enabled,
        "notify_negative": settings.notify_negative,
        "notify_neutral": settings.notify_neutral,
        "notify_positive": settings.notify_positive,
        "minimum_confidence": settings.minimum_confidence,
        "daily_summary_enabled": settings.daily_summary_enabled,
        "daily_summary_time": settings.daily_summary_time,
    }


def update_settings(data):

    if (
        data["notifications_enabled"]
        and not data["notify_positive"]
        and not data["notify_neutral"]
        and not data["notify_negative"]
    ):

        return {
            "success": False,
            "message": (
                "At least one review notification "
                "type must be enabled."
            ),
        }

    settings = get_settings()

    settings.company_email = data["company_email"]
    settings.notifications_enabled = data["notifications_enabled"]
    settings.notify_negative = data["notify_negative"]
    settings.notify_neutral = data["notify_neutral"]
    settings.notify_positive = data["notify_positive"]
    settings.minimum_confidence = data["minimum_confidence"]

    settings.daily_summary_enabled = data[
        "daily_summary_enabled"
    ]

    settings.daily_summary_time = data[
        "daily_summary_time"
    ]

    db.session.commit()

    return {
        "success": True,
        "message": "Settings updated successfully.",
    }