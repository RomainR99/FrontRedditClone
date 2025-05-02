// src/components/Posts.jsx
import React, { useState, useEffect } from 'react';
import "../styles/PostCard.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('jwt'); // Utilisation du token stocké dans le localStorage

      console.log("Token utilisé :", token); // ← Affiche le token dans la console du navigateur
      
      if (!token) {
        setError("Vous devez être connecté pour voir les articles.");
        setLoading(false);
        return;
      }

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
        setPosts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-blue-500">Chargement des posts...</p>;
  if (error) return <p className="text-red-500">Erreur : {error}</p>;

  return (
    
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border border-gray-200 rounded shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
          <p className="text-gray-700 mt-2">{post.description}</p>
        </div>
      ))}
    </div>
    
  );
};

export default Posts;


