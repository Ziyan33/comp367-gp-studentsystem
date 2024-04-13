import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center py-1 fixed-bottom">
      <p>&copy; {new Date().getFullYear()} Student Course Management System</p>
    </footer>
  );
};

export default Footer;
