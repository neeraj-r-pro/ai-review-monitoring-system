# 🤖 AI Review Monitoring System

An end-to-end AI-powered review monitoring system that allows customers to submit reviews while automatically analyzing their sentiment using a Transformer-based NLP model.

The application is built with a modern full-stack architecture using **React**, **Flask**, **PostgreSQL**, and **Hugging Face Transformers**.

---

# 🚀 Features

### Customer Module

- Submit customer reviews
- Star rating system
- Form validation
- Responsive React interface

### AI Module

- Automatic sentiment analysis
- RoBERTa Transformer model
- Confidence score prediction
- Hugging Face Transformers integration

### Backend

- REST API using Flask
- SQLAlchemy ORM
- Modular service architecture
- Database migrations using Flask-Migrate

### Database

- PostgreSQL
- Stores:
  - Customer details
  - Review
  - Rating
  - Sentiment
  - Confidence Score
  - Timestamp

---

# 🏗 System Architecture

Customer

↓

React Frontend

↓

Flask REST API

↓

Review Service

↓

RoBERTa AI Model

↓

PostgreSQL Database

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- JavaScript
- CSS
- Axios
- React Router

## Backend

- Python
- Flask
- SQLAlchemy
- Flask-Migrate

## Database

- PostgreSQL

## AI

- Hugging Face Transformers
- RoBERTa
- PyTorch

## Version Control

- Git
- GitHub

---

# 📁 Project Structure

```
AI-Review-Monitoring-System
│
├── backend
│   ├── app
│   │   ├── services
│   │   ├── models.py
│   │   ├── routes.py
│   │   └── extensions.py
│   │
│   ├── migrations
│   ├── requirements.txt
│   └── run.py
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── routes
│   │   └── services
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙ Installation

## Clone the repository

```bash
git clone https://github.com/neeraj-r-pro/ai-review-monitoring-system.git
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python run.py
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🤖 AI Workflow

```
Customer Review

↓

Tokenizer

↓

RoBERTa Model

↓

Softmax

↓

Sentiment Prediction

↓

Confidence Score

↓

Store in PostgreSQL
```

---

# 📊 Current Features

- ✅ Customer Review Form
- ✅ React Components
- ✅ Flask REST API
- ✅ PostgreSQL Integration
- ✅ SQLAlchemy ORM
- ✅ Flask-Migrate
- ✅ AI Sentiment Prediction
- ✅ Confidence Score
- ✅ End-to-End Integration

---

# 🚧 Upcoming Features

- 📊 Admin Dashboard
- 📈 Review Analytics
- 📉 Charts
- 📧 Email Notifications
- 🔍 Search & Filters
- 🐳 Docker Support
- ☁ Deployment

---

# 👨‍💻 Author

**Neeraj R**

GitHub:
https://github.com/neeraj-r-pro

LinkedIn:
https://www.linkedin.com/in/neeraj-rajeev-905083255/