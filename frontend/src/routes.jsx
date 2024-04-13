// frontend/src/routes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AddCourse from './components/courses/AddCourse';
import CourseList from './components/courses/CourseList';
import UpdateCourse from './components/courses/UpdateCourse';
import StudentList from './components/students/StudentList';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Home from './components/Home'; // Assuming you've created a simple Home component
import StudentCourses from './components/courses/StudentCourses';

const AppRoutes = () => {
  return (
    <>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-course/:studentId" element={<AddCourse />} />
          <Route path="/student-courses/:studentId" element={<StudentCourses />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/update-course/:id" element={<UpdateCourse />} />
          <Route path="/students" element={<StudentList />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;
