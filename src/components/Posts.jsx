import React, { useState, useEffect } from 'react';
import "../styles/Post.css";

const getCurrentUserId = () => {
  const token = localStorage.getItem("jwt");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // décode le JWT
    return payload.id; // Strapi inclut l’id de l'utilisateur ici
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
};

const currentUserId = getCurrentUserId();

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

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwt");
    try {
      const res = await fetch(`http://localhost:1337/api/articles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression de l'article.");

      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      alert(`Erreur : ${err.message}`);
    }
  };

  // Pour formater la date de manière plus lisible
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
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={post.user?.id !== currentUserId}
                  className={`px-2 py-1 rounded text-white ${
                    post.user?.id === currentUserId
                      ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  x
                </button> {/*le bouton est grisé si le user est =! de créateur */}

                <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.Title}</h2>
                <p className="text-gray-700 mb-4">{post.Description}</p>
                <p className="text-gray-700 mb-4">{post.user.username}</p>
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




