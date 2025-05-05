// src/components/Posts.jsx
import React, { useState, useEffect } from 'react';
import "../styles/Post.css";
import { jwt_decode } from 'jwt-decode';


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('jwt');

      console.log("Token utilisé :", token);

      if (!token) {
        setError("Vous devez être connecté pour voir les articles.");
        setLoading(false);
        return;
      }
      
      // Décoder le token JWT pour obtenir les informations de l'utilisateur
      try {
        const decodedToken = jwt_decode(token); // Décodage du token
        console.log('Token décodé:', decodedToken); // Affichage du token décodé dans la console
      } catch (err) {
        console.error('Erreur lors du décodage du token:', err);
        setError('Erreur de décodage du token');
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  if (loading) return <p className="text-blue-500">Chargement des posts...</p>;
  if (error) return <p className="text-red-500">Erreur : {error}</p>;

  return (
    <div className="post space-y-6 px-4 py-6">
      <div className="post-header">
        {posts.length > 0 ? (
          posts.map((post) => {
            try {
              const attrs = post?.attributes;
              if (!attrs) return null; // ignorer les posts sans attributs

              const title = attrs.title ?? "Sans titre";
              const description = attrs.description ?? "";
              const date = attrs.publishedAt || attrs.createdAt;
              const imageUrl = attrs.cover?.data?.attributes?.url;
              

              return (
                <div key={post.id} className="p-4 border border-gray-200 rounded shadow-md bg-white">
                  <p>Auteur : {authorEmail}</p>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
                  <p className="text-gray-700 mb-4">{description}</p>
                  <p className="text-gray-500 text-sm mb-2">{formatDate(date)}</p>
                  {imageUrl && (
                    <img
                      src={`http://localhost:1337${imageUrl}`}
                      alt="cover"
                      className="w-full h-auto rounded"
                    />
                  )}
                </div>
              );
            } catch (err) {
              console.error("Erreur lors du rendu d’un post :", err);
              return null;
            }
          })
        ) : (
          <p className="text-center text-gray-500">Aucun article disponible</p>
        )}
      </div>
    </div>
  );
};

export default Posts;




