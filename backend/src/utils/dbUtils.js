// backend/src/utils/dbUtils.js

const Student = require('../models/Student');
const Course = require('../models/Course');

const checkStudentExists = async (studentNumber) => {
  return await Student.findOne({ studentNumber });
};

const checkCourseExists = async (courseCode) => {
  return await Course.findOne({ courseCode });
};

module.exports = { checkStudentExists, checkCourseExists };
