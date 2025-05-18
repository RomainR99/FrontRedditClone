import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const getCurrentUserId = () => {
  const token = localStorage.getItem("jwt");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch {
    return null;
  }
};

const currentUserId = getCurrentUserId();

const HashtagPosts = () => {
  const { id: hashtagId } = useParams();  // <-- récupère le paramètre 'id' de l'URL

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("HashtagId dans useEffect:", hashtagId);

    if (!hashtagId) {
      setPosts([]);
      setError("Aucun hashtag sélectionné.");
      setLoading(false);
      return;
    }

    const fetchPostsByHashtag = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("jwt");
      if (!token) {
        setError("Vous devez être connecté pour voir les articles.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:1337/api/articles?filters[hashtags][id][$eq]=${hashtagId}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Erreur lors du chargement des posts.");

        const data = await response.json();

        setPosts(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByHashtag();
  }, [hashtagId]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwt");
    try {
      const res = await fetch(`http://localhost:1337/api/articles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression.");
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Chargement des posts...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="post-card">
      {posts.length === 0 && <p>Aucun post trouvé pour ce hashtag.</p>}
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-card-item"
          aria-disabled={post.user?.id !== currentUserId}
        >
          <button
            onClick={() => handleDelete(post.id)}
            disabled={post.user?.id !== currentUserId}
            className={`delete-btn ${
              post.user?.id === currentUserId ? "enabled" : "disabled"
            }`}
            title="Supprimer"
          >
            Supprimer
          </button>

          <Link to={`/article/${post.id}`}>
            <h2>{post.Title || "Sans titre"}</h2>
            <p>{post.Description || "Pas de description"}</p>
            <p>Auteur : {post.attributes?.user?.data?.username || "Anonyme"}</p>
            <p>Catégorie : {post.Categorie || "Non renseigné"}</p>
            <p>
              Publié le :{" "}
              {post.attributes?.publishedAt
                ? new Date(post.attributes.publishedAt).toLocaleString("fr-FR")
                : "Non publié"}
            </p>
            {post.attributes?.Image?.data?.length > 0 && (
              <img
                src={`http://localhost:1337${post.attributes.Image.data[0].attributes.formats?.medium?.url || post.attributes.Image.data[0].attributes.url}`}
                alt={post.attributes.Title}
                style={{ maxWidth: "300px" }}
              />
            )}
            {post.hashtags?.data?.length > 0 && (
              <p>
                Hashtags:{" "}
                {post.hashtags.data.map((h) => (
                  <span key={h.id} className="hashtag">
                    {h.Hashtag}{" "}
                  </span>
                ))}
              </p>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HashtagPosts;







