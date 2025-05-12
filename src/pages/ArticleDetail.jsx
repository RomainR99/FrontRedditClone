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
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        setError("Vous devez être connecté pour voir les articles.");
        setLoading(false);
        return;
      }

      try {
        // 1. Récupérer tous les articles avec leurs relations
        const res = await fetch("http://localhost:1337/api/articles?populate=*", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);

        const data = await res.json();
        const found = data.data.find((item) => item.id.toString() === id);

        if (!found) throw new Error("Article introuvable");
        setArticle(found);
        console.log("Article trouvé :", found);

        const articleDocumentId = found.documentId?.trim().toLowerCase();
        console.log("Article documentId :", articleDocumentId);

        // 2. Récupérer tous les commentaires (sans user pour l’instant)
        const comRes = await fetch("http://localhost:1337/api/comments?populate=*", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const comData = await comRes.json();
        console.log("Tous les commentaires :", comData.data);

        // Debug : afficher les commentaires sans documentId
        const invalid = comData.data.filter(c => !c.documentId);
        console.log("Commentaires sans documentId :", invalid);

        // Debug : afficher tous les documentId des commentaires
        comData.data.forEach(c => {
          console.log("Comment docId:", c.documentId);
        });

        // 3. Filtrer les commentaires liés à cet article (par documentId)
        const filteredComments = comData.data.filter((comment) => {
          const commentDocId = comment.documentId?.trim().toLowerCase();
          return commentDocId === articleDocumentId;
        });

        console.log("Commentaires filtrés :", filteredComments);
        setComments(filteredComments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return <p>Article introuvable</p>;

  const { Title, Description, Categorie, publishedAt, user, Image } = article;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{Title}</h2>
      <p className="text-gray-700 mb-2">{Description}</p>
      <p className="text-sm text-gray-600">Auteur : {user?.username}</p>
      <p className="subreddit">Catégorie : {Categorie}</p>
      <p className="text-sm text-gray-500">{formatDate(publishedAt)}</p>

      {Image?.data && (
        <img
          src={`http://localhost:1337${Image.data.formats?.thumbnail?.url || Image.data.url}`}
          alt="cover"
          className="w-full h-48 object-cover rounded mt-2"
        />
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Commentaires</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mb-3 p-3 bg-gray-100 rounded">
              <p className="font-semibold">Anonyme</p>
              <p>{comment.Markdown || comment.Content}</p>
            </div>
          ))
        ) : (
          <p>Aucun commentaire</p>
        )}

        <Comment postId={article.id} />
      </div>
    </div>
  );
};

export default ArticleDetails;






