// src/Logout.js
import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    onLogout();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
