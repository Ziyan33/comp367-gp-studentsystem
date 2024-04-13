import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';

// GraphQL query to fetch the course details by ID
// Adjusted to use courseCode
const GET_COURSE_QUERY = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;


// GraphQL mutation for updating the course
const UPDATE_COURSE_MUTATION = gql`
mutation UpdateCourse($id: ID!, $courseCode: String, $courseName: String, $section: String, $semester: String) {
  updateCourse(id: $id, courseCode: $courseCode, courseName: $courseName, section: $section, semester: $semester) {
    id
    courseCode
    courseName
    section
    semester
  }
}

`;

const UpdateCourse = () => {
  const { id } = useParams(); // Get the course ID from URL params
  const navigate = useNavigate();
  // State for the course form
  const [courseDetails, setCourseDetails] = useState({
    courseCode: '',
    courseName: '',
    section: '',
    semester: '',
  });

  // Fetch the current course details
  const { data, loading: queryLoading, error: queryError } = useQuery(GET_COURSE_QUERY, { variables: { id } });

  // Mutation hook for updating the course
  const [updateCourse, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_COURSE_MUTATION, {
    onCompleted: () => navigate('/courses'), // Redirect to the courses list upon successful update
  });

  // Update form state with fetched course data
  useEffect(() => {
    if (data && data.course) {
      setCourseDetails({
        courseCode: data.course.courseCode,
        courseName: data.course.courseName,
        section: data.course.section,
        semester: data.course.semester,
      });
    }
  }, [data]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse({
      variables: {
        id,
        ...courseDetails
      }
    });
  };

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error loading course: {queryError.message}</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: '400px'}}>
      <h2>Update Course</h2>
      {mutationError && <div className="alert alert-danger" role="alert">Error updating course: {mutationError.message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Code:</label>
          <input className="form-control" name="courseCode" type="text" value={courseDetails.courseCode} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Course Name:</label>
          <input className="form-control" name="courseName" type="text" value={courseDetails.courseName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Section:</label>
          <input className="form-control" name="section" type="text" value={courseDetails.section} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Semester:</label>
          <input className="form-control" name="semester" type="text" value={courseDetails.semester} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit" disabled={mutationLoading}>Update Course</button>
      </form>
    </div>
  );
};

export default UpdateCourse;