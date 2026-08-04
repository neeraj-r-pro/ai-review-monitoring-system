from datetime import datetime

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

from .services.daily_summary_email_service import (
    send_daily_summary_email,
)
from .services.settings_service import get_settings

scheduler = BackgroundScheduler(
    timezone="Asia/Kolkata",
)


def daily_summary_job(app):

    with app.app_context():

        print(
            f"[Scheduler] Running Daily Summary Job: {datetime.now()}"
        )

        send_daily_summary_email()


def schedule_daily_summary(app):

    settings = get_settings()

    if scheduler.get_job("daily_summary"):
        scheduler.remove_job("daily_summary")

    if not settings.daily_summary_enabled:

        print("Daily Summary Disabled.")

        return

    hour, minute = map(
        int,
        settings.daily_summary_time.split(":"),
    )

    scheduler.add_job(
        func=daily_summary_job,
        trigger=CronTrigger(
            hour=hour,
            minute=minute,
        ),
        args=[app],
        id="daily_summary",
        replace_existing=True,
    )

    print(
        f"Daily Summary scheduled for "
        f"{settings.daily_summary_time}"
    )


def start_scheduler(app):

    if scheduler.running:
        return

    scheduler.start()

    schedule_daily_summary(app)

    print("Scheduler started successfully.")