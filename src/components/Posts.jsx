// src/components/Posts.jsx
import React, { useState, useEffect } from 'react';
import "../styles/Post.css";

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
        const response = await fetch('http://localhost:1337/api/articles?populate=*', {
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

  //pour récuperer la date et la transformer pour etre plus stylisé
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Format 24h
    });
  };

  if (loading) return <p className="text-blue-500">Chargement des posts...</p>;
  if (error) return <p className="text-red-500">Erreur : {error}</p>;

  return (
    <div className="post space-y-6 px-4 py-6">
      <div className="post-header">
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <div key={post.id} className="p-4 border border-gray-200 rounded shadow-md bg-white">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.description}</p>
                <p className="text-gray-500 text-sm mb-2">
                  {formatDate(post.publishedAt)}
                </p>
                
                {post.Image && post.Image[0] && (
                  <img
                    src={`http://localhost:1337${post.Image[0].formats?.thumbnail?.url || post.Image[0].url}`}
                    alt="cover"
                    className="w-full h-auto rounded"
                  />
                )}

              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">Aucun article disponible</p>
        )}
      </div>
    </div>
  );
  
};

export default Posts;


