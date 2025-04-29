// src/components/Posts.jsx
import React, { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/articles');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setPosts(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Chargement des posts...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.attributes.title}</h2>
          <p>{post.attributes.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
