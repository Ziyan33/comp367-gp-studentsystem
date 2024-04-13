// frontend/src/components/courses/StudentCourses.jsx

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_STUDENT_COURSES = gql`
  query GetStudentCourses($studentId: ID!) {
    student(id: $studentId) {
      id
      courses {
        id
        courseCode
        courseName
      }
    }
  }
`;

const StudentCourses = () => {
  const { studentId } = useParams(); // Assumes you're using React Router with a route like "/student-courses/:studentId"
  const { data, loading, error } = useQuery(GET_STUDENT_COURSES, {
    variables: { studentId },
  });

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error loading courses: {error.message}</p>;
  if (!data.student) return <p>Student not found or has no courses.</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: '400px'}}>
      <h2>ALL Courses for Student ID: {studentId}</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Course Name</th>
            <th scope="col">Course Code</th>
          </tr>
        </thead>
        <tbody>
          {data.student.courses.map((course, index) => (
            <tr key={course.id}>
              <th scope="row">{index + 1}</th>
              <td>{course.courseName}</td>
              <td>{course.courseCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentCourses;