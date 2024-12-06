// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        email,
        password,
      });

      if (response.status === 200) {
        // Successful login, store token and redirect
        localStorage.setItem('token', 'fake-token');  // Store token in localStorage
        onLogin();  // Notify parent (App.js) that user is logged in
        navigate('/posts');  // Use navigate() to redirect to the '/posts' route
      }
    } catch (error) {
      setError('Login failed. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
