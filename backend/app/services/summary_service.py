from ..models import Review


def generate_summary():
    total_reviews = Review.query.count()

    if total_reviews == 0:
        return (
            "No reviews have been submitted yet. "
            "Customer insights will appear once reviews are available."
        )

    positive = Review.query.filter_by(
        sentiment="Positive"
    ).count()

    neutral = Review.query.filter_by(
        sentiment="Neutral"
    ).count()

    negative = Review.query.filter_by(
        sentiment="Negative"
    ).count()

    positive_percent = round(
        (positive / total_reviews) * 100,
        1,
    )

    negative_percent = round(
        (negative / total_reviews) * 100,
        1,
    )

    if positive_percent >= 80:
        overall = (
            "Customers are highly satisfied with the products and services."
        )

    elif positive_percent >= 60:
        overall = (
            "Customers are generally satisfied, with only a few concerns."
        )

    else:
        overall = (
            "Customer satisfaction needs improvement."
        )

    if negative_percent >= 30:
        concern = (
            "A noticeable number of negative reviews require immediate attention."
        )

    elif negative_percent >= 15:
        concern = (
            "Some recurring customer issues should be investigated."
        )

    else:
        concern = (
            "Negative feedback remains relatively low."
        )

    return (
        f"{overall} "
        f"{concern} "
        f"Review distribution: "
        f"{positive} positive, "
        f"{neutral} neutral and "
        f"{negative} negative reviews."
    )