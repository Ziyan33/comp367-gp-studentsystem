// // frontend/src/components/shared/Header.jsx

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   return (
//     <header>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/courses">Courses</Link>
//         <Link to="/students">Students</Link>
//         <Link to="/login">Login</Link>
//         <Link to="/signup">Signup</Link>
//       </nav>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Student&Course</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/courses">Courses</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/students">Students</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
