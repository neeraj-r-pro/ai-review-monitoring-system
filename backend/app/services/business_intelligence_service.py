from collections import Counter
from datetime import date, timedelta

from sqlalchemy import func

from ..models import Review


class BusinessIntelligenceService:

    @staticmethod
    def get_business_report():

        today = date.today()
        yesterday = today - timedelta(days=1)

        today_reviews = (
            Review.query.filter(
                func.date(Review.created_at) == today
            ).all()
        )

        yesterday_reviews = (
            Review.query.filter(
                func.date(Review.created_at) == yesterday
            ).all()
        )

        today_data = BusinessIntelligenceService.calculate_metrics(
            today_reviews
        )

        yesterday_data = (
            BusinessIntelligenceService.calculate_metrics(
                yesterday_reviews
            )
        )

        trend = (
            BusinessIntelligenceService.calculate_trends(
                today_data,
                yesterday_data,
            )
        )

        business_summary = (
            BusinessIntelligenceService.generate_summary(
                today_data,
                trend,
            )
        )

        return {
            "today": today_data,
            "yesterday": yesterday_data,
            "trend": trend,
            "business_summary": business_summary,
        }

    @staticmethod
    def calculate_metrics(reviews):

        total = len(reviews)

        positive = [
            r
            for r in reviews
            if r.sentiment.lower() == "positive"
        ]

        neutral = [
            r
            for r in reviews
            if r.sentiment.lower() == "neutral"
        ]

        negative = [
            r
            for r in reviews
            if r.sentiment.lower() == "negative"
        ]

        average_rating = (
            round(
                sum(r.rating for r in reviews) / total,
                2,
            )
            if total
            else 0
        )

        average_confidence = (
            round(
                (
                    sum(
                        r.confidence
                        for r in reviews
                    )
                    / total
                )
                * 100,
                2,
            )
            if total
            else 0
        )

        satisfaction = (
            round(
                len(positive)
                / total
                * 100,
                2,
            )
            if total
            else 0
        )

        highest_review = (
            max(
                reviews,
                key=lambda r: r.rating,
            )
            if reviews
            else None
        )

        lowest_review = (
            min(
                reviews,
                key=lambda r: r.rating,
            )
            if reviews
            else None
        )

        positive_keywords = (
            BusinessIntelligenceService.extract_keywords(
                positive
            )
        )

        negative_keywords = (
            BusinessIntelligenceService.extract_keywords(
                negative
            )
        )

        return {

            "date": date.today().strftime(
                "%d %b %Y"
            ),

            "total_reviews": total,

            "positive": len(
                positive
            ),

            "neutral": len(
                neutral
            ),

            "negative": len(
                negative
            ),

            "average_rating": average_rating,

            "average_confidence": average_confidence,

            "customer_satisfaction": satisfaction,

            "highest_review": highest_review,

            "lowest_review": lowest_review,

            "top_positive_keywords":
                positive_keywords,

            "top_negative_keywords":
                negative_keywords,

        }

    @staticmethod
    def extract_keywords(reviews):

        stop_words = {

            "the",
            "a",
            "an",
            "is",
            "was",
            "are",
            "were",
            "to",
            "of",
            "and",
            "or",
            "in",
            "for",
            "with",
            "this",
            "that",
            "it",
            "very",
            "really",
            "my",
            "our",
            "your",

        }

        words = []

        for review in reviews:

            tokens = (
                review.review
                .lower()
                .replace(".", "")
                .replace(",", "")
                .split()
            )

            for word in tokens:

                if (
                    len(word) > 3
                    and word not in stop_words
                ):
                    words.append(word)

        counter = Counter(words)

        return [
            word
            for word, _
            in counter.most_common(10)
        ]

    @staticmethod
    def calculate_trends(today, yesterday):

        def percentage_change(current, previous):

            if previous == 0:

                if current == 0:
                    return 0

                return 100

            return round(
                ((current - previous) / previous) * 100,
                2,
            )

        return {

            "total_reviews": percentage_change(
                today["total_reviews"],
                yesterday["total_reviews"],
            ),

            "positive": percentage_change(
                today["positive"],
                yesterday["positive"],
            ),

            "neutral": percentage_change(
                today["neutral"],
                yesterday["neutral"],
            ),

            "negative": percentage_change(
                today["negative"],
                yesterday["negative"],
            ),

            "average_rating": percentage_change(
                today["average_rating"],
                yesterday["average_rating"],
            ),

            "average_confidence": percentage_change(
                today["average_confidence"],
                yesterday["average_confidence"],
            ),

            "customer_satisfaction": percentage_change(
                today["customer_satisfaction"],
                yesterday["customer_satisfaction"],
            ),

        }

    @staticmethod
    def generate_summary(today, trend):

        if today["total_reviews"] == 0:

            return (
                "No customer reviews were received today."
            )

        summary = []

        if today["customer_satisfaction"] >= 90:

            summary.append(
                "Customer satisfaction was excellent."
            )

        elif today["customer_satisfaction"] >= 75:

            summary.append(
                "Overall customer sentiment remained positive."
            )

        elif today["customer_satisfaction"] >= 60:

            summary.append(
                "Customer sentiment was mixed and should be monitored."
            )

        else:

            summary.append(
                "Customer satisfaction requires immediate attention."
            )

        if trend["positive"] > 0:

            summary.append(
                f"Positive reviews increased by {trend['positive']}% compared with yesterday."
            )

        elif trend["positive"] < 0:

            summary.append(
                f"Positive reviews decreased by {abs(trend['positive'])}% compared with yesterday."
            )

        if trend["negative"] > 0:

            summary.append(
                f"Negative reviews increased by {trend['negative']}%."
            )

        elif trend["negative"] < 0:

            summary.append(
                f"Negative reviews decreased by {abs(trend['negative'])}%."
            )

        if today["average_rating"] >= 4.5:

            summary.append(
                "Customers continue to rate the product very highly."
            )

        elif today["average_rating"] < 3:

            summary.append(
                "Average customer rating is below expectations."
            )

        if today["top_positive_keywords"]:

            summary.append(
                "Most appreciated topics: "
                + ", ".join(
                    today["top_positive_keywords"][:5]
                )
                + "."
            )

        if today["top_negative_keywords"]:

            summary.append(
                "Most common complaints: "
                + ", ".join(
                    today["top_negative_keywords"][:5]
                )
                + "."
            )

        return " ".join(summary)

    @staticmethod
    def get_sentiment_distribution(report):

        total = report["today"]["total_reviews"]

        if total == 0:

            return {
                "positive": 0,
                "neutral": 0,
                "negative": 0,
            }

        return {

            "positive": round(
                report["today"]["positive"] / total * 100,
                2,
            ),

            "neutral": round(
                report["today"]["neutral"] / total * 100,
                2,
            ),

            "negative": round(
                report["today"]["negative"] / total * 100,
                2,
            ),

        }

    @staticmethod
    def get_dashboard_cards(report):

        return [

            {
                "title": "Total Reviews",
                "value": report["today"]["total_reviews"],
                "trend": report["trend"]["total_reviews"],
            },

            {
                "title": "Positive Reviews",
                "value": report["today"]["positive"],
                "trend": report["trend"]["positive"],
            },

            {
                "title": "Neutral Reviews",
                "value": report["today"]["neutral"],
                "trend": report["trend"]["neutral"],
            },

            {
                "title": "Negative Reviews",
                "value": report["today"]["negative"],
                "trend": report["trend"]["negative"],
            },

            {
                "title": "Average Rating",
                "value": report["today"]["average_rating"],
                "trend": report["trend"]["average_rating"],
            },

            {
                "title": "Customer Satisfaction",
                "value": (
                    f"{report['today']['customer_satisfaction']}%"
                ),
                "trend": report["trend"][
                    "customer_satisfaction"
                ],
            },

        ]

    @staticmethod
    def build_report():

        report = (
            BusinessIntelligenceService
            .get_business_report()
        )

        report["distribution"] = (
            BusinessIntelligenceService
            .get_sentiment_distribution(report)
        )

        report["dashboard_cards"] = (
            BusinessIntelligenceService
            .get_dashboard_cards(report)
        )

        return report    