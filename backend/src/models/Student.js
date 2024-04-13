// backend/src/models/Student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: { // Consider hashing this password before storing
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  program: {
    type: String,
    required: true
  },
  courses: [{ // Courses that the student is taking
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

module.exports = mongoose.model('Student', studentSchema);
