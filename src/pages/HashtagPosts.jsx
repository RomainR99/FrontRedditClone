import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";



const HashtagPosts = () => {
  const { id: hashtagId } = useParams();  // récupère l'id du hashtag depuis l'URL

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

  if (loading) return <p style={{ color: "white" }}>Chargement des posts...</p>;
  if (error) return <p style={{ color: "white" }}>Erreur : {error}</p>;

  return (
    <div className="post-card">
      {posts.length === 0 && <p style={{ color: "white" }}>Aucun post trouvé pour ce hashtag.</p>}
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-card-item"
        >
          <Link to={`/article/${post.id}`}>
            <h2 style={{ color: "white" }}>{post.Title || "Sans titre"}</h2>
            <p style={{ color: "white" }}>{post.Description || "Pas de description"}</p>
            <p style={{ color: "white" }}>Auteur : {post.user?.username || "Anonyme"}</p>
            <p style={{ color: "white" }}>Catégorie : {post.Categorie || "Non renseigné"}</p>
            <p style={{ color: "white" }}>
              Publié le :{" "}
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleString("fr-FR")
                : "Non publié"}
            </p>
            {post.Image && post.Image[0] && (
                  <img
                    src={`http://localhost:1337${post.Image[0].formats?.large?.url || post.Image[0].url}`}
                    alt="cover"
                    className="post-image"
                  />
                )}
            {post.hashtags?.length > 0 && (
                <p style={{ color: "white" }}>
                    Hashtags:{" "}
                    {post.hashtags.map((h) => (
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







