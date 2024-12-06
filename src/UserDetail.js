// src/UserDetail.js
import React, { useEffect, useState } from 'react';

const UserDetail = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) return;
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userId]);

  if (!user) return null;

  return (
    <div>
      <h3>Details for {user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      {/* You can add more fields here */}
    </div>
  );
};

export default UserDetail;
