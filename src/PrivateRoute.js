// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';  // Import Navigate instead of Redirect

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token');  // Check if token exists in localStorage

  if (!isLoggedIn) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  return children;  // If logged in, render the children (PostList component)
};

export default PrivateRoute;
