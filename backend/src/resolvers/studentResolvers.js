// backend/src/resolvers/studentResolvers.js

const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../services/authService'); // Import the generateToken function
require('dotenv').config();

const studentResolvers = {
  Query: {
    // Get all students
    students: async () => {
      try {
        const students = await Student.find();
        return students;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch students');
      }
    },
    // Get a single student by ID
    student: async (_, { id }) => {
      try {
        const student = await Student.findById(id).populate('courses');
        if (!student) {
          throw new Error('Student not found');
        }
        return student;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch student');
      }
    }
    
  },
  Mutation: {
    signup: async (_, { studentNumber, password, firstName, lastName, address, city, phoneNumber, email, program }) => {
      try {
        const existingStudent = await Student.findOne({ $or: [{ studentNumber }, { email }] });
        if (existingStudent) {
          throw new Error('Student already exists with this student number or email');
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newStudent = new Student({
          studentNumber,
          password: hashedPassword,
          firstName,
          lastName,
          address,
          city,
          phoneNumber,
          email,
          program
        });

        const savedStudent = await newStudent.save();

        // Generate a JWT token for the new student
        const token = generateToken({
          id: savedStudent.id,
          email: savedStudent.email
        });

        // Return the token and student info
        return {
          token,
          student: savedStudent
        };
      } catch (error) {
        console.log(error);
        throw new Error('Failed to signup student');
      }
    },
    // Add this to your Mutation resolvers
login: async (_, { email, password }) => {
  const student = await Student.findOne({ email });
  if (!student) {
    throw new Error('No user found with this email');
  }

  const isValid = await bcrypt.compare(password, student.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  const token = generateToken({
    id: student.id,
    email: student.email
  });

  return {
    token,
    student
  };
},
    // Register a new student
    registerStudent: async (_, { studentNumber, password, firstName, lastName, address, city, phoneNumber, email, program }) => {
      try {
        const existingStudent = await Student.findOne({ studentNumber });
        if (existingStudent) {
          throw new Error('Student already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const student = new Student({
          studentNumber,
          password: hashedPassword,
          firstName,
          lastName,
          address,
          city,
          phoneNumber,
          email,
          program
        });

        await student.save();
        return student;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to register student');
      }
    },
    // Update an existing student's details
    updateStudent: async (_, { studentNumber, firstName, lastName, address, city, phoneNumber, email, program }) => {
      try {
        const student = await Student.findOneAndUpdate(
          { studentNumber },
          { firstName, lastName, address, city, phoneNumber, email, program },
          { new: true }
        );
        if (!student) {
          throw new Error('Student not found');
        }
        return student;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to update student');
      }
    }
  }
};

module.exports = studentResolvers;
