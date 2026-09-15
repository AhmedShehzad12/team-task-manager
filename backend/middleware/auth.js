import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Support both userId and id formats
    const userId = decoded.userId || decoded.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Please authenticate', success: false });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.', success: false });
  }
  next();
};

export { auth, isAdmin };