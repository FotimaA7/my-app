// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import PostList from './PostList';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in (via token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login logic (when user logs in)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle logout logic (when user logs out)
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <ul>
            {!isLoggedIn ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          {/* Route for Login */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Protected Route for Posts */}
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <PostList />
              </PrivateRoute>
            }
          />

          {/* Home Route */}
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
