// backend/src/models/Course.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true
  },
  courseName: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  // Assuming you want to reference students who take the course
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

module.exports = mongoose.model('Course', courseSchema);
