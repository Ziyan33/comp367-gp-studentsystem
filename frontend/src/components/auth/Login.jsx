// frontend/src/components/auth/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { login as saveToken } from '../../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

// In your Login component
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      student {
        id
        email
      }
    }
  }
`;

// Then, use this mutation in your component with useMutation hook from Apollo Client


const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    variables: credentials,
    onCompleted: (data) => {
      saveToken(data.login.token);
      navigate('/');
    },
    onError: (error) => {
      setLoginError(error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px'}}>
      <h2 className="mb-3">Login</h2>
      {loginError && <div className="alert alert-danger" role="alert">{loginError}</div>}
      <form onSubmit={handleSubmit} className="w-100">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>Login</button>
      </form>
    </div>
  );
};


export default Login;
