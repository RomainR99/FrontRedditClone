import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        setError("Vous devez être connecté pour voir les articles.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:1337/api/articles?populate=*', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        
        //probleme pour fetch  avec `http://localhost:1337/api/articles/${id}` come dans post donc je récpére tout et filtre vvia le usseeffect
        const data = await response.json();
        const found = data.data.find((item) => item.id.toString() === id);
        setArticle(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return <p>Article introuvable</p>;

  const { Title, Description, Categorie, publishedAt, comments, user, Image } = article;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{Title}</h2>
      <p className="text-gray-700 mb-2">{Description}</p>
      <p className="text-sm text-gray-600">Auteur : {user?.data?.username || "Inconnu"}</p>
      <p className="text-sm text-gray-600">Catégorie : {Categorie}</p>
      <p className="text-sm text-gray-500">{formatDate(publishedAt)}</p>

      {Image?.data && (
        <img
          src={`http://localhost:1337${Image.data.formats?.thumbnail?.url || Image.data.attributes?.url}`}
          alt="cover"
          className="w-full h-48 object-cover rounded mt-2"
        />
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Commentaires</h3>
        {comments?.data?.length > 0 ? (
          comments.data.map((comment) => (
            <div key={comment.id} className="mb-3 p-3 bg-gray-100 rounded">
              <p className="font-semibold">
                {comment.user?.data?.username || "Anonyme"}
              </p>
              <p>{comment.attributes?.Markdown}</p>
            </div>
          ))
        ) : (
          <p>Aucun commentaire</p>
        )}

        {/* Afficher le formulaire dans tous les cas */}
        <Comment postId={id} />
      </div>
    </div> 
  );
};

export default ArticleDetails;





