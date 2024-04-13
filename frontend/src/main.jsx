// frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; // Make sure you have this file set up for Apollo Client
import './index.css'; // Path to your CSS file to apply global styles
import './global.css'; // Import global styles here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}> {/* Only include ApolloProvider if using Apollo Client */}
      <Router>
        <AppRoutes />
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
