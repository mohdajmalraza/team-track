![React](https://img.shields.io/badge/React-19-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

# TeamTrack

**TeamTrack** is a full-stack task management application built using the **MERN Stack** that helps teams manage **Projects, Teams, Tasks, Reports, and User Settings** from a single dashboard.

The application focuses on clean architecture, reusable components, JWT authentication, backend-driven business rules, and responsive UI.

---

## 🚀 Live Demo

### Frontend

🔗 [https://team-track-project.vercel.app](https://team-track-project.vercel.app)

### Backend API

🔗 [https://team-track-backend-eac27.vercel.app](https://team-track-backend-eac27.vercel.app)

## <!--

## 🎥 Project Walkthrough

Watch the complete 5-minute walkthrough of TeamTrack:

https://youtu.be/your-video-link
-->

---

## 🔐 Demo Credentials

You can explore the application using the following demo account.

**Email**

```text
demo@teamtrack.com
```

**Password**

```text
TeamTrack@123
```

> **Note**
>
> - This account is intended for recruiters and reviewers.
> - Feel free to explore all modules.
> - Please avoid changing the password or deleting existing demo data.

---

## ⭐ Project Highlights

✔ JWT Authentication

✔ Protected Routes

✔ Context API State Management

✔ Status Transition Validation

✔ Charts using Chart.js

✔ Responsive Dashboard

✔ Clean Folder Structure

✔ RESTful APIs

✔ Toast Notifications

✔ Loading Skeletons

✔ Error Handling

---

# 📸 Application Screenshots

## Login

<img width="1366" height="640" alt="Login" src="https://github.com/user-attachments/assets/c22dc5ee-8bb5-498d-8fad-0d1474fb21a9" />

---

## Dashboard

<img width="1366" height="641" alt="Dashboard" src="https://github.com/user-attachments/assets/b68efe32-1792-41dc-a7e4-07c8659a41fd" />

---

## Projects

<img width="1366" height="639" alt="Projects" src="https://github.com/user-attachments/assets/adab87b5-ec71-46ff-bfa1-93327a1c92c7" />

---

## Tasks

<img width="1366" height="642" alt="Tasks" src="https://github.com/user-attachments/assets/de5d338e-3fd1-41ec-aab9-4599e2290cab" />

---

## Reports

<img width="1366" height="644" alt="Reports" src="https://github.com/user-attachments/assets/945c4624-8c91-445a-a5c6-c001a2741758" />

---

## Settings

<img width="1366" height="644" alt="Settings" src="https://github.com/user-attachments/assets/0bac3c80-a4c5-4e7a-a6bd-3f87ce4d5b16" />

---

## Why TeamTrack?

I built TeamTrack to strengthen my understanding of building scalable full-stack applications. The project focuses on authentication, CRUD operations, business logic validation, reporting dashboards, reusable React architecture, and REST API design while following clean code practices.

---

# ✨ Features

## 🔐 Authentication

- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Persistent Login
- Logout

---

## 📊 Dashboard

- Overview of Projects and Tasks
<!--
- Overview of Projects, Teams and Tasks
- Quick Statistics
- Recent Activity
  -->

---

## 📁 Project Management

- Create Projects
- View All Projects
- Project Details Page
- Update Project Information
- Project Progress Overview

---

## 👥 Team Management

- Create Teams
- View Teams
- Team Details Page
- Team Member Overview

---

## ✅ Task Management

- Create Tasks
- View All Tasks
- Task Details Page
- Edit Task Information
- Task Filtering
- Update Task Status
- Backend Status Transition Validation

---

## 📈 Reports

- Tasks Completed in Last 7 Days
<!-- * Pending Tasks by Project -->
- Pending Work across Projects
- Closed Tasks by Team
- Interactive Charts (Chart.js)

---

## ⚙️ Settings

- Update Profile
- Change Password
- Account Summary
- Loading Skeletons
- Error Handling
- Toast Notifications

---

## 🎯 What to Explore

After logging in, you can try the following features:

- ✅ Authentication (Login & Protected Routes)
- ✅ Dashboard Overview
- ✅ Create and Manage Projects
- ✅ Create Teams and Assign Members
- ✅ Create Tasks with Owners, Status and Priority
- ✅ Task Details & Status Transition Validation
- ✅ Reports Dashboard (Charts & Analytics)
- ✅ Update Profile & Change Password
- ✅ Responsive Layout for Desktop and Mobile

---

# 🛠 Tech Stack

### Frontend

- React 19
- React Router DOM
- Context API
- Bootstrap 5
- Axios
- Chart.js
- React ChartJS 2
- React Icons
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- CORS
- dotenv

### Deployment

- Frontend → Vercel
- Backend → Vercel
- Database → MongoDB Atlas

---

# 📂 Project Structure

```
team-track
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── services
│   ├── validations
│   ├── middlewares
│   ├── db
│   └── package.json
│
└── README.md
```

---

## Repositories

[Frontend](https://github.com/mohdajmalraza/team-track.git)

[Backend](https://github.com/mohdajmalraza/team-track-backend.git)

---

# ⚡ Installation

Clone the repository

```bash
git clone https://github.com/mohdajmalraza/team-track.git
```

Navigate to project

```bash
cd team-track
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_API_BASE_URL=http://localhost:3000
```

Start development server

```bash
npm run dev
```

---

# 🏗 Project Architecture

```
Client (React)
       │
       ▼
Context API
       │
       ▼
Axios
       │
       ▼
Express REST API
       │
       ▼
JWT Authentication
       │
       ▼
MongoDB Atlas
```

---

# 🔄 Authentication Flow

1. User logs in.
2. Backend validates credentials.
3. JWT token is generated.
4. Token is stored in Local Storage.
5. AuthContext validates the token through `/api/auth/me`.
6. User details become globally available.
7. Protected routes are accessible only to authenticated users.

---

# 📊 Reports

The Reports module visualizes project data using **Chart.js**.

- Bar Chart
- Doughnut Chart
- Dynamic Backend APIs
- Responsive Charts

---

# 🎨 UI Features

- Responsive Design
- Bootstrap 5
- Reusable Components
- Loading Skeletons
- Error States
- Toast Notifications
- Clean Dashboard Layout

---

# 📚 What I Learned

This project helped me gain practical experience with:

- React Context API
- JWT Authentication
- Protected Routing
- REST API Design
- MongoDB & Mongoose
- Backend Validation
- Business Logic Implementation
- Status Transition Validation
- Chart.js Integration
- Reusable Component Design
- Error Handling
- Loading & Skeleton UI
- Toast Notifications
- Responsive UI Development
- Clean Project Architecture
- API Integration using Axios

---

# 🔮 Future Improvements

- Role Based Access Control (RBAC)
- Task Comments
- File Attachments
- Notifications
- Activity Timeline
- Search & Sorting
- Pagination
- Email Notifications
- Real-time Updates using Socket.io
- Dark Mode

---

# 🚧 Challenges Solved

During development, I solved several real-world challenges such as:

- Designing JWT Authentication with protected routes.
- Persisting login state after browser refresh.
- Building reusable Context APIs for multiple modules.
- Implementing backend-driven task status transition validation.
- Synchronizing frontend state after CRUD operations.
- Creating reusable loading, error, and empty states.
- Building analytics APIs for the Reports dashboard.
- Managing global state without Redux.
- Structuring the project for scalability and maintainability.

---

# 👨‍💻 Author

**Mohd Ajmal Raza**

- GitHub: [https://github.com/ajmalbly27](https://github.com/ajmalbly27)
- LinkedIn: [https://www.linkedin.com/in/mohdajmalraza](https://www.linkedin.com/in/mohdajmalraza/)

---

# 📄 License

This project is licensed under the **MIT License**.
