from datetime import timezone, timedelta

IST = timezone(timedelta(hours=5, minutes=30))


def format_datetime(
    dt,
    include_timezone=False,
):
    """
    Convert UTC datetime to Indian Standard Time (IST)
    and return a formatted string.
    """

    if dt.tzinfo is None:
        dt = dt.replace(
            tzinfo=timezone.utc
        )

    ist = dt.astimezone(IST)

    if include_timezone:
        return ist.strftime(
            "%d %b %Y %I:%M %p IST"
        )

    return ist.strftime(
        "%d %b %Y %I:%M %p"
    )