import dotenv from 'dotenv';
dotenv.config();

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

console.log('📁 .env file loaded');
console.log('🔑 MONGO_URI:', process.env.MONGODB_URI ? 'Loaded ✅' : 'Missing ❌');

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';

const app = express();

// ✅ CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Team Task Manager API is running!',
    endpoints: {
      health: '/health',
      api: '/api',
      auth: '/api/auth',
      projects: '/api/projects',
      tasks: '/api/tasks'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!'
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log(`🔧 Allowed CORS methods: GET, POST, PUT, PATCH, DELETE, OPTIONS`);
});

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const authRoutes = require('./routes/auth');
// const projectRoutes = require('./routes/projects');
// const taskRoutes = require('./routes/tasks');
// const userRoutes = require('./routes/users');

// const app = express();

// // ✅ FIXED CORS - Allow all origins for now (temporary)
// app.use(cors({
//   origin: '*', // Allow all origins (for testing)
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // ✅ Handle preflight requests
// app.options('*', cors());

// app.use(express.json());

// // Routes
// app.get('/', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Team Task Manager API is running!',
//     endpoints: {
//       health: '/health',
//       api: '/api',
//       auth: '/api/auth',
//       projects: '/api/projects',
//       tasks: '/api/tasks'
//     }
//   });
// });

// app.get('/health', (req, res) => {
//   res.status(200).json({ 
//     status: 'ok', 
//     timestamp: new Date(),
//     uptime: process.uptime()
//   });
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/users', userRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Something went wrong!'
//   });
// });

// // MongoDB connection
// // Direct MongoDB connection (temporary fix)
// const mongourl = 'mongodb+srv://ahmedshehzad1892_db_user:PITrLn3ERngS3mhA@cluster0.zsfeskj.mongodb.net/task_manager?retryWrites=true&w=majority';
// // Agar Atlas use karna hai toh ye URI use karo:
// // const mongoURI = 'mongodb+srv://ahmedshehzad1892_db_user:PiTrLn3ERngs3m@cluster.mongodb.net/task_manager?retryWrites=true&w=majority';

// // .env se URI read karega
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB Connected Successfully'))
// .catch(err => console.log('❌ MongoDB connection error:', err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📍 API available at http://localhost:${PORT}/api`);
// });


// import dns from 'node:dns';
// dns.setServers(['8.8.8.8', '8.8.4.4']);
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// const MONGODB_URL=process.env.MONGODB_URI;
// mongoose.connect(MONGODB_URL)
//   .then(() => console.log('✅ MongoDB Connected Successfully'))
//   .catch(err => console.log('❌ MongoDB connection error:', err));

// const PORT=process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`API available at http://localhost:${PORT}/api`);
// });