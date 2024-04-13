// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import AppRoutes from './routes.jsx';
// src/index.js or src/App.js
import './global.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
