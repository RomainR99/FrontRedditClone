import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function HashtagPosts() {
  const { id } = useParams(); // id du hashtag depuis l'URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `http://localhost:1337/api/articles?filters[hashtags][id][$eq]=${id}&populate=*`
        );
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);

        const data = await res.json();
        setPosts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [id]);

  if (loading) return <p>Chargement des posts...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (posts.length === 0) return <p>Aucun post trouvé pour ce hashtag.</p>;

  return (
    <div>
      <h2>Posts pour le hashtag #{id}</h2>
      <ul>
        {posts.map(({ id, attributes }) => (
          <li key={id}>
            <h3>{attributes.Title}</h3>
            <p>{attributes.Description}</p>
            {/* Afficher image(s) si besoin */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HashtagPosts;


