import React, { useState } from 'react';
import './Login.css';
import loginImage from '../assets/loginImage.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://culture-webapp.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // add this if your server uses cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Show alert and redirect
        window.alert('Login successful!');
        window.location.href = '/dashboard'; // or use `navigate('/dashboard')`
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-content">
          <h2>
            Welcome to <span className="utech-brand">Login </span>
          </h2>
          <p>Sign into your account</p>
          {error && <div className="error-message">{error}</div>}
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Phone or Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
            <a href="#" className="forgot-password">Forgot password?</a>
            <div className="register-link">
              Don't have an account? <a href="/register"><span className="register-link-text">Register</span></a>
            </div>
          </form>
        </div>
      </div>
      <div className="login-right">
        <img src={loginImage} alt="Login Illustration" />
      </div>
    </div>
  );
};

export default Login;
