# 📊 Smart Feedback Collection and Analysis System

## 📌 Project Overview

The **Smart Feedback Collection and Analysis System** is a full-stack web application designed to collect user feedback (both anonymous and registered), securely store it in a database, and provide insightful analytics through interactive charts. The system enables organizations to make **data-driven decisions** by visualizing feedback trends in real time.

This project is developed as part of the **TCS iON Placement Success Program – Industry Project**, fulfilling the requirement to build a practical, scalable, and industry-aligned solution.

---

## 🎯 Objectives

- Enable users to submit feedback **anonymously or after login**
- Allow registered users to view their feedback history
- Provide admins with a centralized **analytics dashboard**
- Store feedback in a **JSON-style MongoDB database**
- Perform feedback analysis using **charts (Pie & Bar)**
- Ensure secure authentication and role-based access

---

## 🧩 Key Features

### 👤 User Features
- User registration and login
- Submit feedback with ratings and comments
- View personal feedback history

### 🕵️ Guest Features
- Submit feedback anonymously without registration

### 🛠 Admin Features
- Admin login (one-time manual creation)
- View all feedback submissions
- Analyze feedback using visual charts
- Manage users and feedback data

---

## 🏗 System Architecture

```
Frontend (React.js)
        |
        | REST APIs (JSON)
        |
Backend (Flask)
        |
MongoDB (NoSQL Database)
```

---

## 🔄 Workflow

1. User/Guest submits feedback via frontend
2. Data is validated and sent to Flask backend
3. Feedback is stored in MongoDB as JSON documents
4. Admin accesses analytics dashboard
5. Charts display rating distribution and trends

---

## 🛠 Tools & Technologies Used

### Frontend
- React.js
- Tailwind CSS
- Lucide Icons
- Chart.js / Recharts

### Backend
- Python Flask
- Flask-CORS
- Flask-Bcrypt
- JWT Authentication

### Database
- MongoDB (JSON-based NoSQL)

### Others
- Postman (API testing)
- VS Code
- Git & GitHub

---

## 📊 Analytics & Visualization

- **Pie Chart** – Rating distribution
- **Bar Chart** – Feedback count per category
- Real-time updates from MongoDB
- Admin-only access to analytics

---

## 🔐 Authentication & Security

- Password hashing using **Flask-Bcrypt**
- JWT-based session handling
- Role-based access (User / Admin)
- Secure API endpoints

---

## 📁 Project Structure

```
Smart-Feedback-System/
│
├── frontend/
│   ├── src/
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── feedback/
│   │   └── App.jsx
│
├── backend/
│   ├── app.py
│   ├── models/
│   ├── routes/
│   └── config.py
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Backend Setup
```bash
cd backend
pip install flask flask-cors flask-bcrypt pyjwt pymongo
python app.py
```

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ MongoDB
- Create a MongoDB database
- Update connection string in `app.py`

---

## 🔑 Admin Access

- Admin account is created **manually (one-time)** in backend
- Admin can log in via `/admin/login`
- Admin credentials are **not exposed** in frontend

---

## 📈 Outcomes

- Successfully collected and analyzed feedback
- Improved data accessibility and visualization
- Reduced manual analysis effort
- Provided a scalable and secure feedback system

---

## 🚀 Future Enhancements

- AI-based sentiment analysis
- Export analytics as PDF/Excel
- Email notifications
- Multi-language support
- Cloud deployment (AWS/GCP)

---

## 🔗 Project Links

- **Source Code:** *(Add GitHub URL here)*
- **Demo Video:** *(Optional)*

---

## 📚 References

- Flask Documentation  
  https://flask.palletsprojects.com/
- MongoDB Documentation  
  https://www.mongodb.com/docs/
- React Documentation  
  https://react.dev/
- JWT Authentication  
  https://jwt.io/
- Chart.js  
  https://www.chartjs.org/

---

## 👨‍🎓 Acknowledgment

This project was developed as part of the **TCS iON Placement Success Program**, aimed at enhancing practical skills and preparing aspirers for real-world industry challenges.
