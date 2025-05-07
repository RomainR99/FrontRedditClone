import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryPosts = () => {
  const { nom } = useParams();
  console.log("Nom de la catégorie:", nom); // Pour vérifier la valeur de nom
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        setError("Vous devez être connecté pour voir les articles.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:1337/api/articles?filters[Categorie][$eq]=${encodeURIComponent(nom)}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
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

    fetchPostsByCategory();
  }, [nom]);

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

  if (loading) return <p>Chargement des posts...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="category-posts">
      <h1 className="text-3xl font-bold mb-4">Posts dans la catégorie "{nom}"</h1>
      
      {posts.length === 0 ? (
        <p>Aucun post dans cette catégorie.</p>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card p-4 border border-gray-300 rounded mb-6 bg-white">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.Title}</h2>
                <p className="text-gray-700 mb-4">{post.Description}</p>
                <p className="text-gray-700 mb-4">{post.user.username}</p>
                <p className="text-gray-700 mb-4">{post.Categorie}</p>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPosts;

