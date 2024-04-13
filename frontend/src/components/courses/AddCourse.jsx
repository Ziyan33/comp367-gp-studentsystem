// frontend/src/components/courses/AddCourse.jsx

import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams

const ADD_COURSE_MUTATION = gql`
  mutation AddCourse($courseCode: String!, $courseName: String!, $section: String!, $semester: String!, $studentId: ID!) {
    addCourse(courseCode: $courseCode, courseName: $courseName, section: $section, semester: $semester, studentId: $studentId) {
      id
      courseCode
      courseName

    }
  }
`;

const AddCourse = () => {
  const navigate = useNavigate(); // For navigation after the course is added
  const { studentId } = useParams(); // To get the student ID from the URL
  const [courseDetails, setCourseDetails] = useState({
    courseCode: '',
    courseName: '',
    section: '',
    semester: '',
    studentId: '', // Include studentId in your course details state
  });

  const [addCourse, { data, loading, error }] = useMutation(ADD_COURSE_MUTATION, {
    onCompleted: () => {
      navigate('/courses'); // Navigate to the course list page after successful addition
    },
    onError: (error) => {
      console.error('Error adding course:', error.message);
    },
  });

  // When component mounts, set the studentId in the state
  useState(() => {
    if (studentId) {
      setCourseDetails((prevDetails) => ({
        ...prevDetails,
        studentId,
      }));
    }
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addCourse({ 
      variables: { 
        ...courseDetails,   
        studentId } }); // Include the studentId in the variables
  };


  return (
    <div className="container mt-5" style={{ maxWidth: '400px'}}>
      <h2>Add New Course</h2>
      {error && <div className="alert alert-danger" role="alert">{error.message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Code:</label>
          <input type="text" className="form-control" name="courseCode" placeholder="Course Code" value={courseDetails.courseCode} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Course Name:</label>
          <input type="text" className="form-control" name="courseName" placeholder="Course Name" value={courseDetails.courseName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Section:</label>
          <input type="text" className="form-control" name="section" placeholder="Section" value={courseDetails.section} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Semester:</label>
          <input type="text" className="form-control" name="semester" placeholder="Semester" value={courseDetails.semester} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;