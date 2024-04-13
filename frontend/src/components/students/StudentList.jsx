// frontend/src/components/students/StudentList.jsx

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate

const GET_STUDENTS_QUERY = gql`
  query {
    students {
      id
      firstName
      lastName
      email
      address
      phoneNumber
      program
      city
    }
  }
`;

const StudentList = () => {
  const { data, loading, error } = useQuery(GET_STUDENTS_QUERY);
  const navigate = useNavigate();

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error loading students: {error.message}</p>;
  const handleAddCourse = (studentId) => {
    // Redirect to add course page with the student's ID
    navigate(`/add-course/${studentId}`);
  };

  const handleViewCourses = (studentId) => {
    // Redirect to the page that lists all courses taken by the student
    navigate(`/student-courses/${studentId}`);
  };
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8"><h2>Student <b>List</b></h2></div>
              <div className="col-sm-4"></div>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>City</th>
                <th>Phone Number</th>
                <th>Program</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.students.map(student => (
                <tr key={student.id}>
                  <td>{student.firstName} {student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.address}</td>
                  <td>{student.city}</td>
                  <td>{student.phoneNumber}</td>
                  <td>{student.program}</td>
                  <td>
                    <a onClick={() => handleViewCourses(student.id)} className="view" title="View Courses" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></a>
                    <a onClick={() => handleAddCourse(student.id)} className="edit" title="Add Course" data-toggle="tooltip"><i className="material-icons">&#xE147;</i></a>
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
export default StudentList;
