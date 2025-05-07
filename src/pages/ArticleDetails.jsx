import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment.jsx"; 
import "../styles/ArticleDetails.css"; 


const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem("jwt");

      try {
        const res = await fetch(`http://localhost:1337/api/articles/${id}?populate=*`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        const data = await res.json();
        setArticle(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchArticle();
  }, [id]);

  if (error) return <p className="text-red-500">Erreur : {error}</p>;
  if (!article) return <p className="text-blue-500">Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h1 className="text-2xl font-bold mb-4">{article.Title}</h1>
      <p className="text-gray-700 mb-2">{article.Description}</p>
      <p className="text-sm text-gray-600 mb-2">
        Publié le : {new Date(article.publishedAt).toLocaleString('fr-FR')}
      </p>
      {article.attributes.Image && article.Image.data && (
        <img
          src={`http://localhost:1337${article.Image.data.attributes.url}`}
          alt="illustration"
          className="w-full h-auto rounded mb-4"
        />
      )}
      <hr className="my-4" />

      {/* Composant commentaire */}
      <Comment articleId={article.id} />
    </div>
  );
};

export default ArticleDetails;

