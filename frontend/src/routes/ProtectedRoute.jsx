// // src/routes/ProtectedRoute.jsx

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../src/context/AuthContext'; // Adjust based on your path
// const ProtectedElement = ({ component: Component, ...rest }) => {
//     const { isAuthenticated } = useAuth();
  
//     return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
//   };
  
//   export default ProtectedElement;