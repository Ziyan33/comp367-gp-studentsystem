// backend/src/services/authService.js

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your_secret_key'; // Ensure you have a secure secret key

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    secret,
    { expiresIn: '24h' } // Token expires in 24 hours
  );
};

// Verify JWT Token
const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  generateToken,
  verifyToken
};
