import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password');
      return;
    }
    
    // Check for demo account first
    if (credentials.email === 'demo@brinspector.com' && credentials.password === 'password') {
      // Store login state
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify({
        id: 'demo',
        fullName: 'Demo User',
        email: credentials.email,
        role: 'admin'
      }));
      
      // Redirect to projects page
      navigate('/projects');
      return;
    }
    
    // Check registered users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (user) {
      // Store login state
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }));
      
      // Redirect to projects page
      navigate('/projects');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <Link to="/" className="login-logo">
          <img src="/images/BRInspector.jpg" alt="BRInspector Logo" />
        </Link>
      </div>
      
      <div className="login-form-container">
        <h2>Login to Your Account</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
          <p><Link to="/forgot-password">Forgot Password?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 