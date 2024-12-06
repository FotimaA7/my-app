// src/DynamicPostFetcher.js
import React, { useState, useEffect } from 'react';

const DynamicPostFetcher = () => {
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div>
      <h2>Posts for User</h2>
      <input
        type="number"
        placeholder="Enter User ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DynamicPostFetcher;
