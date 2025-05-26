import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import './Register.css';
import loginImage from '../assets/loginImage.png';

const Register = () => {
  const navigate = useNavigate(); // <-- Initialize the navigate function
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setrole] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('https://culture-webapp.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (data.success) { // <-- Check for success in the response
        setSuccess('Registration successful. Redirecting to login...');
        setName('');
        setEmail('');
        setPassword('');
        setrole('');
        setTimeout(() => {
          navigate('/login'); // <-- Redirect after 2 seconds
        }, 2000);
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Server error. Try again later. ' + err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-section">
        <div className="logo">Register yourself with us</div>
        <h2>Create an Account</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="What will be your role"
            value={role}
            onChange={(e) => setrole(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>

      <div className="register-image-section">
        <img src={loginImage} alt="Register" />
      </div>
    </div>
  );
};

export default Register;
