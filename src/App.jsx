// src/components/Posts.jsx
import React, { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = 'fad6775b61513438da17ea889835baa61bc6a0e7a499f1502fd99446f253dff4448094d0965eb2891fc5217a5972aa497a913c6a4d381dbd0196240b2c336593f57dc73f94de341abdc798d9b95e6f8e66fcaef244093944d94d1f061f608d0f975ba910116cd338f7cd9237612ff835b0a855a197acfb2b4e4fd792a12c9b0f'; // Remplace par ton vrai token

      try {
        const response = await fetch('http://localhost:1337/api/articles', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        setPosts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Gestion des états
  if (loading) return <p className="text-blue-500">Chargement des posts...</p>;
  if (error) return <p className="text-red-500">Erreur : {error}</p>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border border-gray-200 rounded shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
          <p className="text-gray-600">{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;



