// frontend/src/components/courses/CourseList.jsx

import React, { useState } from 'react';
import { useQuery,useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const GET_STUDENTS_IN_COURSE = gql`
  query StudentsInCourse($courseCode: String!) {
    studentsInCourse(courseCode: $courseCode) {
      id
      firstName
      lastName
      email
    }
  }
`;

const COURSES_QUERY = gql`
  query {
    courses {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;
const DELETE_COURSE_MUTATION = gql`
mutation DeleteCourse($id: ID!) {
  deleteCourse(id: $id)
}
`;

const CourseList = () => {

  const navigate = useNavigate(); // Initialize useNavigate

  const { data, loading, error } = useQuery(COURSES_QUERY);
  const [deleteCourse] = useMutation(DELETE_COURSE_MUTATION, {
    refetchQueries: [{ query: COURSES_QUERY }], // Refetch courses after deletion
  });

  const [viewStudentsFor, setViewStudentsFor] = useState(null); // State to hold the current courseCode whose students are being viewed

  const { data: studentsData, loading: studentsLoading } = useQuery(GET_STUDENTS_IN_COURSE, {
    variables: { courseCode: viewStudentsFor },
    skip: !viewStudentsFor, // Skip the query unless a courseCode is set
  });

  const handleViewStudents = (courseCode) => {
    setViewStudentsFor(courseCode); // Set the current courseCode to view students for
  };
  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error loading courses: {error.message}</p>;
  
  
  const handleDelete = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse({ variables: { id:courseId } });
    }
  };

  const handleUpdate = (courseId) => {
    navigate('/update-course/${courseId}'); // Navigate to the update page with the course ID
  };
  
  return (
    <div className="container-xl" >
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8"><h2>Course <b>List</b></h2></div>
            
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Section</th>
                <th>Semester</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.courses.map(course => (
                <tr key={course.id}>
                  <td>{course.courseName}</td>
                  <td>{course.courseCode}</td>
                  <td>{course.section}</td>
                  <td>{course.semester}</td>
                  <td>
                    {/* <a onClick={() => handleViewStudents(course.courseCode)} className="view" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></a> */}
                    <a onClick={() => handleUpdate(course.id)} className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                    <a onClick={() => handleDelete(course.id)} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>        
    </div>  
  );
};


export default CourseList;