# 🎨 Creator Dashboard

A full-stack **Creator Dashboard** that empowers content creators to manage their profiles, earn credit points, and interact with content through a personalized feed.  
Built using **React**, **Node.js**, **MongoDB**, and deployed on **Google Cloud** and **Firebase**.

---

## 📌 Project Description

Creator Dashboard is a productivity-focused web application designed for content creators.  
It includes **role-based access**, a **credit point system**, and a dynamic **feed aggregator** that pulls content from platforms like Reddit and Twitter.

---

## 🚀 Features

### 🔐 User Authentication
- Register/Login using **JWT**
- Role-based login: `User` and `Admin`

### 💰 Credit Points System
- Earn credits for:
  - Logging in daily
  - Completing profile
  - Saving or interacting with posts
- Track credits on a user-friendly dashboard
- Admin can view and update any user’s credit balance

### 📰 Feed Aggregator
- Fetches content using public APIs (Reddit, Twitter, etc.)
- Scrollable feed interface
- Users can:
  - ✅ Save content
  - 📋 Share (copy link)
  - 🚫 Report inappropriate content

### 📊 Dashboard
- **User Panel**:
  - View earned credits
  - Saved content
  - Recent activity
- **Admin Panel**:
  - View user analytics
  - Feed engagement and moderation tools

---

## 🛠️ Tech Stack

| Frontend      | Backend          | Database      | Deployment            |
|---------------|------------------|---------------|------------------------|
| React.js      | Node.js + Express| MongoDB Atlas | Google Cloud
| Tailwind CSS  | JWT Auth         |               |                        |

---

## 🖥️ Local Setup Instructions

### ✅ Prerequisites
- Node.js
- npm
- MongoDB Atlas URI (for backend)

---

### 🔧 Backend Setup

```bash
cd backend
npm install
npm run dev     # starts backend using nodemon
