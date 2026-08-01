# 🤖 AI-Powered Review Monitoring System

An end-to-end AI-powered customer review monitoring platform built using **React**, **Flask**, **PostgreSQL**, and **Hugging Face Transformers**. The system allows customers to submit reviews while automatically analyzing their sentiment using a Transformer-based NLP model (RoBERTa) and storing the results in a PostgreSQL database.

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/Flask-3.1-black?logo=flask)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-336791?logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active%20Development-success)
![AI](https://img.shields.io/badge/AI-RoBERTa-orange)
![Transformers](https://img.shields.io/badge/Hugging%20Face-Transformers-yellow?logo=huggingface)


![Stars](https://img.shields.io/github/stars/neeraj-r-pro/ai-review-monitoring-system?style=social)
![Forks](https://img.shields.io/github/forks/neeraj-r-pro/ai-review-monitoring-system?style=social)
![Last Commit](https://img.shields.io/github/last-commit/neeraj-r-pro/ai-review-monitoring-system)
![Repo Size](https://img.shields.io/github/repo-size/neeraj-r-pro/ai-review-monitoring-system)
![Top Language](https://img.shields.io/github/languages/top/neeraj-r-pro/ai-review-monitoring-system)
---

## 🚀 Project Status

🟢 **Active Development**

### Completed
- ✅ Customer Review Module
- ✅ AI Sentiment Analysis
- ✅ PostgreSQL Integration
- ✅ REST API
- ✅ Database Migrations

### Currently Working On
- 🔄 Professional UI Redesign

### Upcoming
- ⏳ Admin Dashboard
- ⏳ Review Analytics
- ⏳ Email Notifications
- ⏳ Docker Support
- ⏳ Cloud Deployment

---

# 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [API Endpoints](#-api-endpoints)
- [AI Workflow](#-ai-workflow)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Future Roadmap](#-future-roadmap)
- [Author](#-author)
- [License](#-license)

---

# 📖 Overview

Customer reviews contain valuable insights for businesses.

This project automatically analyzes customer reviews using an AI-powered sentiment analysis model and stores the prediction results in a PostgreSQL database.

Instead of manually reading hundreds of reviews, companies can quickly understand customer satisfaction using AI.

---

# ✨ Features

## 👤 Customer Module

- Submit customer reviews
- Star rating system
- Form validation
- Responsive React interface
- Instant feedback after submission

---

## 🤖 AI Module

- Automatic sentiment prediction
- Hugging Face Transformers
- RoBERTa sentiment classification
- Confidence score prediction
- Fast inference

---

## ⚙ Backend

- Flask REST API
- SQLAlchemy ORM
- Modular Service Layer
- Flask-Migrate
- Clean architecture

---

## 🗄 Database

Stores:

- Customer Name
- Email
- Review
- Rating
- Sentiment
- Confidence Score
- Timestamp

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- JavaScript
- CSS
- Axios
- React Router

---

## Backend

- Python
- Flask
- SQLAlchemy
- Flask-Migrate

---

## Database

- PostgreSQL

---

## AI

- Hugging Face Transformers
- CardiffNLP RoBERTa
- PyTorch

---

## Version Control

- Git
- GitHub

---

# 🏗 System Architecture

```
                 Customer
                     │
                     ▼
          React Frontend (Vite)
                     │
                 Axios API
                     │
                     ▼
             Flask REST API
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
   Review Service         AI Service
          │                     │
          └──────────┬──────────┘
                     ▼
               PostgreSQL
```

---

# 📂 Project Structure

```text
AI-Review-Monitoring-System
│
├── backend
│   ├── app
│   │   ├── services
│   │   │   ├── ai_service.py
│   │   │   └── review_service.py
│   │   │
│   │   ├── models.py
│   │   ├── routes.py
│   │   ├── extensions.py
│   │   └── __init__.py
│   │
│   ├── migrations
│   ├── requirements.txt
│   └── run.py
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── routes
│   │   └── services
│   │
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/neeraj-r-pro/ai-review-monitoring-system.git

cd ai-review-monitoring-system
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python run.py
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔗 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Backend Health Check |
| POST | `/api/reviews` | Submit Customer Review |

---

# 🤖 AI Workflow

```
Customer Review

        │

        ▼

Tokenizer

        │

        ▼

RoBERTa Transformer

        │

        ▼

Softmax

        │

        ▼

Sentiment Prediction

        │

        ▼

Confidence Score

        │

        ▼

Store in PostgreSQL
```

---

# 🗄 Database Schema

| Column | Type |
|---------|------|
| id | Integer |
| name | String |
| email | String |
| review | Text |
| rating | Integer |
| sentiment | String |
| confidence | Float |
| created_at | DateTime |

---

# 📊 Current Features

- ✅ Customer Review Form
- ✅ React Components
- ✅ React Router
- ✅ Form Validation
- ✅ Flask REST API
- ✅ PostgreSQL Integration
- ✅ SQLAlchemy ORM
- ✅ Flask-Migrate
- ✅ AI Sentiment Prediction
- ✅ Confidence Score
- ✅ End-to-End Integration

---

# 📸 Screenshots

## Customer Review Page

> Coming Soon

---

## Admin Dashboard

> Under Development

---

# 🚀 Future Roadmap

## Phase 2

- Professional UI
- Admin Dashboard
- Review Table

---

## Phase 3

- Analytics Dashboard
- Charts
- Search
- Filters

---

## Phase 4

- Email Notifications
- Weekly Reports

---

## Phase 5

- Docker
- Docker Compose
- Cloud Deployment

---

# 📊 Project Highlights

- Full Stack AI Application
- Transformer-based NLP
- REST API Architecture
- PostgreSQL Database
- AI Sentiment Analysis
- Modular Service Layer
- Reusable React Components

---

# 🙏 Acknowledgements

- Hugging Face
- CardiffNLP
- React
- Flask
- PostgreSQL
- SQLAlchemy

---

# 👨‍💻 Author

**Neeraj R**

GitHub

https://github.com/neeraj-r-pro

LinkedIn

https://www.linkedin.com/in/neeraj-rajeev-905083255/

---

# 📄 License

This project is licensed under the MIT License.