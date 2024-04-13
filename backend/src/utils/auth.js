// backend/src/utils/auth.js

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to verify token and protect routes
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  if (!token) {
    return res.status(403).json({ message: 'A token is required for authentication' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  return next();
};

module.exports = {
  authenticate
};
