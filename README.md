# Unified-Mentor-s-Project-1
# 🚗 Vehicle Rental Management System

> A Full Stack MERN Web Application for Online Vehicle Booking and Rental Management

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind-blue)
![License](https://img.shields.io/badge/License-Educational-orange)

---

# 📖 Project Overview

The **Vehicle Rental Management System** is a complete MERN Stack web application developed to simplify and automate the vehicle rental process. The system provides a user-friendly platform where customers can browse available vehicles, view detailed information, and book vehicles online.

The application also provides dedicated dashboards for agencies and administrators to efficiently manage vehicles, bookings, users, reports, and analytics.

This project eliminates the need for manual vehicle rental processes by providing a centralized online platform with secure authentication and role-based authorization.

---

# 🎯 Objectives

The major objectives of this project are:

- Develop a secure online vehicle rental platform.
- Reduce paperwork and manual rental operations.
- Allow customers to book vehicles online.
- Enable agencies to manage their vehicle inventory.
- Allow administrators to monitor the complete system.
- Improve customer experience through a responsive web interface.
- Implement role-based authentication and authorization.
- Maintain accurate booking and vehicle records.

---

# ✨ Key Features

## 👤 Customer Module

- User Registration
- Secure Login
- JWT Authentication
- Browse Vehicles
- Search Vehicles
- Filter Vehicles
- View Vehicle Details
- Book Vehicles
- Booking History
- Customer Dashboard
- Profile Management

---

## 🏢 Agency Module

- Agency Login
- Dashboard
- Add New Vehicle
- Edit Vehicle
- Delete Vehicle
- Manage Vehicle Inventory
- View Customer Bookings
- Update Vehicle Status

---

## 👨‍💼 Admin Module

- Admin Dashboard
- Manage Users
- Manage Vehicles
- Manage Bookings
- Reports
- Analytics
- Admin Profile
- Settings
- Platform Monitoring

---

# 🛠️ Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

---

## Backend

- Node.js
- Express.js
- REST API

---

## Database

- MongoDB
- MongoDB Compass

---

## Authentication

- JWT (JSON Web Token)
- bcryptjs Password Encryption

---

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- MongoDB Compass
- npm

---

# 🏗️ System Architecture

```
Customer / Agency / Admin
            │
            ▼
      React Frontend
            │
        Axios API
            │
            ▼
      Express.js Server
            │
     Authentication Layer
            │
            ▼
        MongoDB Database
```

---

# 📂 Project Structure

```
Vehicle-Rental-Management-System
│
├── frontend
│   │
│   ├── public
│   │
│   ├── src
│   │   │
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   │
│   │   ├── customer
│   │   ├── agency
│   │   ├── admin
│   │
│   ├── routes
│   ├── utils
│   ├── App.jsx
│   ├── main.jsx
│   └── package.json
│
├── backend
│   │
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 📊 Database Collections

## Users

```
Name

Email

Password

Role

Created At

Updated At
```

---

## Vehicles

```
Vehicle Name

Brand

Type

Model Year

Fuel Type

Transmission

Registration Number

Pricing

Status

Vehicle Image

Agency ID
```

---

## Bookings

```
Customer ID

Vehicle ID

Start Date

End Date

Total Cost

Booking Status
```

---

# 🔐 Authentication

The project uses **JWT Authentication** for secure login.

### Roles

- Customer
- Agency
- Admin

Each role has different access permissions using protected routes.

---

# 📱 Pages

## Public Pages

- Home
- Login
- Register
- Vehicle Details
- Not Found

---

## Customer Pages

- Dashboard
- My Bookings
- Profile

---

## Agency Pages

- Dashboard
- Add Vehicle
- Edit Vehicle
- Manage Vehicles
- Bookings

---

## Admin Pages

- Dashboard
- Manage Users
- Manage Vehicles
- Manage Bookings
- Reports
- Analytics
- Profile
- Settings

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/abhibadiger123/UberClone.git
```

---

## Open Project

```bash
cd UberClone
```

---

## Install Backend

```bash
cd backend

npm install
```

---

## Install Frontend

```bash
cd ../frontend

npm install
```

---

# ⚙️ Environment Variables

Backend `.env`

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/projectmanagement

JWT_SECRET=your_secret_key
```

---

# ▶️ Run Backend

```bash
cd backend

npm run dev
```

---

# ▶️ Run Frontend

```bash
cd frontend

npm run dev
```

---

Open

```
http://localhost:5173
```

---

# 📸 Screenshots

Include screenshots such as:

- Home Page
- Login
- Register
- Vehicle Listing
- Vehicle Details
- Customer Dashboard
- Agency Dashboard
- Admin Dashboard
- Add Vehicle
- Manage Vehicles
- Bookings
- Reports
- Analytics

---

# 🧪 Testing

The project has been tested for:

- User Registration
- Login Authentication
- JWT Authorization
- Vehicle CRUD Operations
- Booking Operations
- Protected Routes
- Responsive Design
- Search & Filter
- Admin Management
- Agency Management

---

# 🌟 Advantages

- Easy to Use
- Secure Authentication
- Responsive Design
- Fast Performance
- Role-Based Access
- Online Booking
- Easy Vehicle Management
- Centralized Database
- Scalable Architecture
- User Friendly Interface

---

# 🚀 Future Enhancements

- Online Payment Gateway
- Razorpay Integration
- Google Maps Integration
- Email Verification
- Forgot Password
- Vehicle Reviews & Ratings
- Live Vehicle Tracking
- Push Notifications
- AI Vehicle Recommendation
- Mobile Application
- Multi-language Support
- Dark/Light Theme Switch

---

# 👨‍💻 Developed By

**Abhishek Badiger**

BCA Student

KLE BCA College, Bailhongal

GitHub

https://github.com/abhibadiger123

---

# 📚 References

- React Documentation
- Node.js Documentation
- Express.js Documentation
- MongoDB Documentation
- Tailwind CSS Documentation
- JWT Documentation
- Axios Documentation
- Lucide React Documentation

---

# 📄 License

This project is developed for **educational purposes** as part of a **Unified Mentor Software Development Internship** and BCA academic learning. It demonstrates the implementation of a complete Vehicle Rental Management System using the MERN Stack.
![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
