from openpyxl import Workbook
from openpyxl.styles import Font


def generate_excel(report_data, file_path):

    workbook = Workbook()

    sheet = workbook.active
    sheet.title = "AI Review Report"

    sheet["A1"] = "ReviewIQ AI Review Analytics Report"
    sheet["A1"].font = Font(
        bold=True,
        size=16,
    )

    row = 3

    metrics = [
        ("Total Reviews", report_data["total_reviews"]),
        ("Positive Reviews", report_data["positive_reviews"]),
        ("Neutral Reviews", report_data["neutral_reviews"]),
        ("Negative Reviews", report_data["negative_reviews"]),
        ("Average Rating", report_data["average_rating"]),
        (
            "Average AI Confidence",
            f"{report_data['average_confidence']}%",
        ),
        (
            "Customer Satisfaction",
            f"{report_data['customer_satisfaction']}%",
        ),
    ]

    for metric, value in metrics:

        sheet[f"A{row}"] = metric
        sheet[f"B{row}"] = value

        row += 1

    row += 2

    sheet[f"A{row}"] = "AI Summary"
    sheet[f"A{row}"].font = Font(
        bold=True,
    )

    row += 1

    sheet[f"A{row}"] = report_data["summary"]

    row += 3

    sheet[f"A{row}"] = "Top Positive Keywords"
    sheet[f"A{row}"].font = Font(
        bold=True,
    )

    row += 1

    for item in report_data["positive_keywords"][:5]:

        sheet[f"A{row}"] = item["keyword"]
        sheet[f"B{row}"] = item["score"]

        row += 1

    row += 2

    sheet[f"A{row}"] = "Top Negative Keywords"
    sheet[f"A{row}"].font = Font(
        bold=True,
    )

    row += 1

    for item in report_data["negative_keywords"][:5]:

        sheet[f"A{row}"] = item["keyword"]
        sheet[f"B{row}"] = item["score"]

        row += 1

    workbook.save(file_path)