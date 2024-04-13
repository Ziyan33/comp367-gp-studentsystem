// frontend/src/components/auth/Signup.jsx
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const SIGNUP_MUTATION = gql`
  mutation Signup($studentNumber: String!, $password: String!, $firstName: String!, $lastName: String!, $address: String!, $city: String!, $phoneNumber: String!, $email: String!, $program: String!) {
    signup(studentNumber: $studentNumber, password: $password, firstName: $firstName, lastName: $lastName, address: $address, city: $city, phoneNumber: $phoneNumber, email: $email, program: $program) {
      token
    }
  }
`;

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: '',
    program: '',
  });
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      console.log('Signup successful, token:', data.signup.token);
      navigate('/login'); // Redirect to login page or home page as needed
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ variables: { ...formData } });
  };

  return (
    <div className="container mt-5 " style={{ maxWidth: '400px', paddingBottom: '100px' }}>
    <h2 className="text-center mb-4">Sign Up</h2>
    {error && <div className="alert alert-danger" role="alert">{error.message}</div>}
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="studentNumber" className="form-label">Student Number:</label>
        <input
          id="studentNumber"
          name="studentNumber"
          type="text"
          className="form-control"
          value={formData.studentNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
        <div className="mb-3">
          <label  className="form-label">First Name:</label>
          <input
            name="firstName"
            type="text"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label  className="form-label">Last Name:</label>
          <input
            name="lastName"
            type="text"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label  className="form-label">Address:</label>
          <input
            name="address"
            type="text"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label  className="form-label">City:</label>
          <input
            name="city"
            type="text"
            className="form-control"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          className="form-control"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
         {/* Email field */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
       {/* Program field */}
       <div className="mb-3">
        <label htmlFor="program" className="form-label">Program:</label>
        <input
          id="program"
          name="program"
          type="text"
          className="form-control"
          value={formData.program}
          onChange={handleChange}
          required
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary" disabled={loading}>Sign Up</button>
      </div>
            </form>
    </div>
  );
}

export default Signup;
