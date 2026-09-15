import express from 'express';
import User from '../models/Users.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      users: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get users for project assignment (excluding current user)
router.get('/available', auth, async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id }
    }).select('name email role');

    res.json({
      success: true,
      users: users
    });
  } catch (error) {
    console.error('Error fetching available users:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;