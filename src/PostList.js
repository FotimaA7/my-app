// src/PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    
    // If there's a token, make the API call with the token included in the headers
    if (token) {
      axios
        .get('https://jsonplaceholder.typicode.com/posts', {
          headers: {
            Authorization: `Bearer ${token}`  // Include token in the request header
          }
        })
        .then((response) => {
          setPosts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
          setLoading(false);
        });
    } else {
      console.error('No token found. User is not authenticated.');
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
