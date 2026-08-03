from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


def generate_pdf(report_data, file_path):
    """
    Generate AI Review Analytics PDF Report
    """

    doc = SimpleDocTemplate(
        file_path,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
    )

    styles = getSampleStyleSheet()

    title_style = styles["Title"]
    title_style.alignment = TA_CENTER
    title_style.fontSize = 24
    title_style.textColor = colors.HexColor("#2563EB")
    title_style.spaceAfter = 6

    heading_style = styles["Heading2"]
    heading_style.textColor = colors.HexColor("#2563EB")
    heading_style.spaceBefore = 18
    heading_style.spaceAfter = 10

    body_style = styles["BodyText"]
    body_style.leading = 18

    story = []

    # --------------------------------------------------
    # HEADER
    # --------------------------------------------------

    story.append(
        Paragraph(
            "<b>ReviewIQ</b>",
            title_style,
        )
    )

    story.append(
        Paragraph(
            "AI Review Analytics Report",
            heading_style,
        )
    )

    story.append(
        Paragraph(
            f"Generated on: {datetime.now().strftime('%d %b %Y %I:%M %p')}",
            body_style,
        )
    )

    story.append(Spacer(1, 0.35 * inch))

    # --------------------------------------------------
    # KPI TABLE
    # --------------------------------------------------

    stats = [
        ["Metric", "Value"],
        ["Total Reviews", report_data["total_reviews"]],
        ["Positive Reviews", report_data["positive_reviews"]],
        ["Neutral Reviews", report_data["neutral_reviews"]],
        ["Negative Reviews", report_data["negative_reviews"]],
        ["Average Rating", report_data["average_rating"]],
        [
            "Average AI Confidence",
            f"{report_data['average_confidence']}%",
        ],
        [
            "Customer Satisfaction",
            f"{report_data['customer_satisfaction']}%",
        ],
    ]

    table = Table(
        stats,
        colWidths=[3.8 * inch, 2 * inch],
    )

    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2563EB")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 11),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                ("BACKGROUND", (0, 1), (-1, -1), colors.whitesmoke),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )

    story.append(table)

    story.append(Spacer(1, 0.4 * inch))
        # --------------------------------------------------
    # AI SUMMARY
    # --------------------------------------------------

    story.append(
        Paragraph(
            "AI Summary",
            heading_style,
        )
    )

    summary_table = Table(
        [[Paragraph(report_data["summary"], body_style)]],
        colWidths=[5.8 * inch],
    )

    summary_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
                ("BOX", (0, 0), (-1, -1), 1, colors.HexColor("#CBD5E1")),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        )
    )

    story.append(summary_table)

    story.append(Spacer(1, 0.35 * inch))

    # --------------------------------------------------
    # POSITIVE KEYWORDS
    # --------------------------------------------------

    story.append(
        Paragraph(
            "Top Positive Keywords",
            heading_style,
        )
    )

    positive_data = [["Keyword", "AI Score"]]

    for item in report_data["positive_keywords"][:5]:

        positive_data.append(
            [
                item["keyword"].title(),
                f"{item['score']}%",
            ]
        )

    positive_table = Table(
        positive_data,
        colWidths=[4.5 * inch, 1.3 * inch],
    )

    positive_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#16A34A")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#F0FDF4")),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )

    story.append(positive_table)

    story.append(Spacer(1, 0.3 * inch))

    # --------------------------------------------------
    # NEGATIVE KEYWORDS
    # --------------------------------------------------

    story.append(
        Paragraph(
            "Top Negative Keywords",
            heading_style,
        )
    )

    negative_data = [["Keyword", "AI Score"]]

    for item in report_data["negative_keywords"][:5]:

        negative_data.append(
            [
                item["keyword"].title(),
                f"{item['score']}%",
            ]
        )

    negative_table = Table(
        negative_data,
        colWidths=[4.5 * inch, 1.3 * inch],
    )

    negative_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#DC2626")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#FEF2F2")),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )

    story.append(negative_table)

    story.append(Spacer(1, 0.4 * inch))
        # --------------------------------------------------
    # FOOTER
    # --------------------------------------------------

    story.append(
        Paragraph(
            "<font color='#64748B'><b>Generated by ReviewIQ AI Review Monitoring Platform</b></font>",
            body_style,
        )
    )

    story.append(
        Paragraph(
            "<font color='#94A3B8'>This report is generated automatically using AI-powered sentiment analysis.</font>",
            body_style,
        )
    )

    story.append(
        Spacer(1, 0.2 * inch)
    )

    story.append(
        Paragraph(
            f"<font color='#94A3B8'>Generated on {datetime.now().strftime('%d %b %Y at %I:%M %p')}</font>",
            body_style,
        )
    )

    # --------------------------------------------------
    # BUILD PDF
    # --------------------------------------------------

    doc.build(story)