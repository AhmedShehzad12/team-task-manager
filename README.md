# Team Task Manager - Full Stack MERN App

A complete task management application with role-based access control (Admin/Member), project management, and task tracking.

---

## Features

### Authentication
- JWT-based Signup and Login
- Secure password hashing with bcryptjs
- Protected routes with authentication middleware

### Role-Based Access Control
- **Admin:** Full access - Create, Update, Delete any project/task
- **Member:** Limited access - View assigned projects, update task status

### Project Management
- Create new projects with name and description
- View all projects
- Edit project details
- Delete projects (Admin only)
- Project status: Active, On Hold, Completed

### Task Management
- Create tasks with title, description, due date
- Assign tasks to team members
- Set priority levels: Low, Medium, High, Urgent
- Task status: Pending, In Progress, Completed
- Update task status in real-time
- Delete tasks

### Dashboard
- Overview statistics (Total Projects, Tasks, Completed, Overdue)
- Tasks grouped by status
- Recent projects list

---

## Technology Stack

### Frontend
- React.js 18
- React Router DOM v6
- Axios for API calls
- React Hot Toast for notifications
- date-fns for date formatting
- Vite as build tool

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## Installation Guide

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/AhmedShehzad12/team-task-manager.git
cd team-task-manager