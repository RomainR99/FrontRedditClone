import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryPosts = () => {
  const { name } = useParams();
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
          `http://localhost:1337/api/posts?filters[Categorie][$eq]=${name}&populate=*`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
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
  }, [name]);

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
      <h1 className="text-3xl font-bold mb-4">Posts dans la catégorie "{name}"</h1>

      {posts.length === 0 ? (
        <p>Aucun post dans cette catégorie.</p>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card p-4 border border-gray-300 rounded mb-6 bg-white">
              <h2 className="text-xl font-semibold">{post.Title}</h2>
              <p className="text-gray-700">{post.Description}</p>
              <p className="text-gray-500 text-sm">Publié le {formatDate(post.attributes.publishedAt)}</p>

              {post.attributes.Image?.data && (
                <img
                  src={`http://localhost:1337${post.attributes.Image.data.attributes.url}`}
                  alt={post.attributes.Title}
                  className="w-full h-auto rounded mt-4"
                />
              )}

              <p className="text-gray-500 mt-2">
                {post.attributes.user?.data?.attributes?.username}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPosts;

