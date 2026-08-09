# 🤖 ReviewIQ – AI-Powered Review Monitoring System

<p align="center">

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-3.1-black?logo=flask)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Hugging Face](https://img.shields.io/badge/Hugging%20Face-Transformers-yellow?logo=huggingface)
![spaCy](https://img.shields.io/badge/spaCy-NLP-09A3D5?logo=spacy)
![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?logo=git)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

<p align="center">
  AI-powered customer review analysis, business intelligence, automated reporting, and email monitoring platform.
</p>

The system allows businesses to collect customer reviews, automatically analyze sentiment using a Transformer-based NLP model, extract keywords, monitor review trends, generate business intelligence reports, send email notifications, and receive scheduled daily summary reports.

---

## 🚀 Project Status

🟢 **Completed**

ReviewIQ is a complete full-stack AI application with:

- Customer review submission
- AI-powered sentiment analysis
- Confidence scoring
- PostgreSQL database integration
- Business intelligence dashboard
- Sentiment and review analytics
- Keyword extraction
- Automated email notifications
- Scheduled daily business intelligence summaries
- PDF report generation
- Excel report generation
- Report history
- REST API
- Database migrations

---

# 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [AI Workflow](#-ai-workflow)
- [Business Intelligence](#-business-intelligence)
- [Email Automation](#-email-automation)
- [Report Generation](#-report-generation)
- [Database](#-database)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [API](#-api)
- [Screenshots](#-screenshots)
- [Project Highlights](#-project-highlights)
- [Future Improvements](#-future-improvements)
- [Author](#-author)
- [License](#-license)

---

# 📖 Overview

Customer reviews contain valuable information about customer satisfaction and business performance.

ReviewIQ automatically processes customer reviews using AI and converts raw review data into useful business insights.

The platform analyzes each review using a Transformer-based sentiment analysis model and stores the results along with the original review data.

The collected data is then used to provide:

- Sentiment analytics
- Review trends
- Keyword insights
- Business intelligence
- Automated notifications
- Daily summary reports
- Downloadable PDF and Excel reports

This allows businesses to monitor customer feedback without manually analyzing large numbers of reviews.

---

# ✨ Features

## 👤 Customer Review Module

- Submit customer reviews
- Customer name and email
- Star rating system
- Review validation
- Automatic AI analysis after submission
- Instant feedback after submission

---

## 🤖 AI Sentiment Analysis

ReviewIQ uses a Transformer-based NLP model to automatically classify customer reviews.

### Capabilities

- Sentiment classification
- Positive / Neutral / Negative prediction
- Confidence score
- Transformer-based inference

### Model

**CardiffNLP Twitter-RoBERTa sentiment model**

Powered through:

- Hugging Face Transformers
- PyTorch

---

## 📊 Business Intelligence Dashboard

The dashboard provides an overview of customer feedback and business performance.

### Dashboard insights include:

- Total reviews
- Average rating
- Sentiment distribution
- Sentiment trends
- AI confidence
- Review statistics
- Customer satisfaction insights
- Positive and negative review information

---

## 🔑 Keyword Extraction

ReviewIQ extracts important keywords from customer reviews to help identify recurring topics and customer concerns.

**KeyBERT** is used for keyword extraction.

The system also uses **spaCy** for NLP processing.

---

## 📈 Review Analytics

The system analyzes collected reviews to identify:

- Positive sentiment trends
- Negative sentiment trends
- Rating patterns
- Customer satisfaction
- Review volume
- Important review topics

---

# 📧 Email Automation

ReviewIQ includes automated email functionality using **Flask-Mail**.

### Email capabilities

- Automated review notifications
- Configurable email settings
- Company email configuration
- Sentiment-based notifications
- HTML email templates

The application can send business intelligence information directly through email.

---

# ⏰ Scheduled Daily Summary

ReviewIQ includes an automated daily business intelligence summary system using **APScheduler**.

The scheduled job:

1. Retrieves the configured settings
2. Generates the latest business intelligence report
3. Checks the day's review activity
4. Creates an HTML email
5. Sends the summary to the configured company email

The scheduled time can be configured through the application settings.

The scheduler uses the **Asia/Kolkata** timezone.

---

# 📄 Report Generation

ReviewIQ can generate downloadable business intelligence reports.

## PDF Reports

**ReportLab** is used to generate PDF reports containing business and review analytics.

## Excel Reports

**OpenPyXL** is used to generate Excel reports containing review and analytical data.

### Report capabilities

- PDF report generation
- Excel report generation
- Business intelligence summaries
- Review statistics
- Sentiment information
- Report history
- Downloadable reports

---

# 🗄 Database

ReviewIQ uses **PostgreSQL** as the primary relational database.

**SQLAlchemy** is used as the ORM and **Alembic / Flask-Migrate** is used for database migrations.

### Review data includes:

| Column | Description |
|---|---|
| `id` | Unique review ID |
| `name` | Customer name |
| `email` | Customer email |
| `review` | Customer review |
| `rating` | Customer rating |
| `sentiment` | AI-predicted sentiment |
| `confidence` | AI prediction confidence |
| `created_at` | Review creation timestamp |

---

# 🛠 Tech Stack

## Frontend

- **React.js**
- **Vite**
- **JavaScript**
- **HTML**
- **CSS**
- **Axios**
- **React Router**

---

## Backend

- **Python**
- **Flask**
- **SQLAlchemy**
- **Flask-Migrate**
- **Alembic**
- **Flask-CORS**
- **REST API**

---

## Database

- **PostgreSQL**
- **psycopg2-binary**

---

## AI / NLP

- **Hugging Face Transformers**
- **CardiffNLP RoBERTa**
- **PyTorch**
- **spaCy**
- **KeyBERT**
- **scikit-learn**
- **Sentence Transformers**

---

## Automation & Email

- **APScheduler**
- **Flask-Mail**

---

## Reporting

- **ReportLab**
- **OpenPyXL**

---

## Development & Version Control

- **Python Virtual Environment**
- **python-dotenv**
- **Git**
- **GitHub**

---

# 🏗 System Architecture

```text
                         Customer
                            │
                            ▼
                  ┌───────────────────┐
                  │   React Frontend  │
                  │       + Vite      │
                  └─────────┬─────────┘
                            │
                         Axios
                            │
                            ▼
                  ┌───────────────────┐
                  │    Flask REST API │
                  └─────────┬─────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
       Review Service   AI Service   BI Services
              │             │             │
              │             ▼             │
              │     Hugging Face          │
              │       RoBERTa             │
              │             │             │
              └─────────────┼─────────────┘
                            │
                            ▼
                     PostgreSQL
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          Dashboard     Reports      Email System
                            │             │
                    ┌───────┴───────┐     │
                    ▼               ▼     ▼
                 ReportLab       OpenPyXL
                    │               │
                    ▼               ▼
                   PDF            Excel

                            │
                            ▼
                       APScheduler
                            │
                            ▼
                  Daily BI Summary Email