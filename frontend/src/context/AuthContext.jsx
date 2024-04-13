// // // src/context/AuthContext.js

// // import React, { createContext, useContext, useState, useEffect } from 'react';
// // import { getToken, logout as clearToken } from '../utils/auth';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// //   useEffect(() => {
// //     const token = getToken();
// //     if (token) {
// //       setIsAuthenticated(true);
// //     }
// //   }, []);

// //   const login = (token) => {
// //     setIsAuthenticated(true);
// //     localStorage.setItem('token', token);
// //   };

// //   const logout = () => {
// //     setIsAuthenticated(false);
// //     clearToken();
// //   };

// //   return (
// //     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);
// // src/context/AuthContext.js
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Add logic to check authentication status

//   return (
//     <AuthContext.Provider value={{ isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
