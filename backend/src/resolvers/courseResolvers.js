// backend/src/resolvers/courseResolvers.js

const Course = require('../models/Course');
const Student = require('../models/Student');

const courseResolvers = {
  Query: {
    // Get all courses
    courses: async () => {
      try {
        const courses = await Course.find();
        return courses;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch courses');
      }
    },
    // Get a single course by courseCode
    course: async (_, { id }) => {
      try {
        const course = await Course.findById(id);
        if (!course) {
          throw new Error('Course not found');
        }
        return course;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching course');
      }
    },
    studentsInCourse: async (_, { courseCode }) => {
      // This approach assumes you have a way to link students and courses. Adjust according to your data model.
      const students = await Student.find({ 'courses.courseCode': courseCode });
      return students;
    }    
    
  },
  Mutation: {
    // Add a new course
    addCourse: async (_, { courseCode, courseName, section, semester, studentId }) => {
      try {
        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
          throw new Error('Student not found');
        }
  
        const isDuplicate = student.courses.some(course => course.courseCode === courseCode);
        if (isDuplicate) throw new Error('Duplicate course for student');
      
        // Create and save the new course
        let newCourse = new Course({ courseCode, courseName, section, semester, students: [studentId] });
        // const savedCourse = await newCourse.save();
      
        // // Associate the course with the student
        // student.courses.push(savedCourse);
        // await student.save();
  
        // return savedCourse;
        await newCourse.save();

        student.courses.push(newCourse._id); // Assuming 'courses' field exists and is an array
        await student.save();
    
        newCourse.id = newCourse._id.toString();

        return newCourse;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to add course');
      }
    },
  
    // Update an existing course's details
    updateCourse: async (_, { id, courseCode, courseName, section, semester }) => {
      const updateData = {};
      if (courseName) updateData.courseName = courseName;
      if (courseCode) updateData.courseCode = courseCode;
      if (section) updateData.section = section;
      if (semester) updateData.semester = semester;
    
      try {
        const course = await Course.findByIdAndUpdate(id, updateData, { new: true });
        if (!course) throw new Error('Course not found');
        return course;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to update course');
      }
    },
    
    // Adjust the deleteCourse resolver to match the change in the schema
    deleteCourse: async (_, { id }) => {
      try {
          const course = await Course.findByIdAndDelete(id);
          if (!course) {
              throw new Error('Course not found');
          }
          return `Course with id ${id} was deleted.`;
      } catch (error) {
          console.log(error);
          throw new Error('Failed to delete course');
      }
  }
}}
;

module.exports = courseResolvers;
