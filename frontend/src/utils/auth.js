// frontend/src/utils/auth.js

export const getToken = () => localStorage.getItem('token');

export const login = (token) => {
  localStorage.setItem('token', token);
};

export const logout = () => {
  localStorage.removeItem('token');
  // Redirect to login or home page as needed
};
