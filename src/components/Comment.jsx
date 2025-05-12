import React, { useState } from "react";

const getCurrentUserId = () => {
  const token = localStorage.getItem("jwt");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Décodage du JWT
    return payload.id; // Retourne l'ID de l'utilisateur contenu dans le JWT
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
};

const getUsername = async (userId) => {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`http://localhost:1337/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.username; // Retourne le nom d'utilisateur
};

const Comment = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]); // État pour stocker les commentaires du post

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const token = localStorage.getItem("jwt");
    const userId = getCurrentUserId(); // Extrait l'ID de l'utilisateur du JWT

    if (!token || !userId) {
      alert("Vous devez être connecté pour commenter.");
      return;
    }

    const username = await getUsername(userId); // Récupère le username de l'utilisateur

    const commentData = {
      data: {
        Content: `${commentText} - Posté par: ${username}`, // Ajouter le username à la fin du commentaire
        article: postId, // L'article auquel ce commentaire est lié
      }
    };

    try {
      const res = await fetch("http://localhost:1337/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // En-tête avec le token
        },
        body: JSON.stringify(commentData),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Erreur API complète :", JSON.stringify(result, null, 2));
        throw new Error(result.error?.message || "Erreur serveur");
      }

      console.log("Commentaire ajouté :", result.data);
      setCommentText(""); // Réinitialise le champ de texte

      // Récupérer à nouveau les commentaires après l'ajout
      const commentsRes = await fetch(`http://localhost:1337/api/comments?filters[article]=${postId}`);
      const commentsData = await commentsRes.json();

      if (!commentsRes.ok) {
        console.error("Erreur lors de la récupération des commentaires :", commentsData);
        throw new Error("Erreur lors de la récupération des commentaires");
      }

      // Mettre à jour l'état des commentaires pour les afficher
      setComments(commentsData.data); 

    } catch (err) {
      console.error("Erreur lors de l'envoi du commentaire :", err.message);
      alert(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Écrivez un commentaire..."
          className="w-full p-2 border rounded"
          rows={3}
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Envoyer
        </button>
      </form>

      {/* Affichage des commentaires associés au post */}
      <div className="comments-section mt-6">
        <h3 className="text-xl font-semibold">Commentaires :</h3>
        {comments.length === 0 ? (
          <p>Aucun commentaire pour ce post.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment mt-4 p-2 border rounded">
              <p>{comment.Content}</p> {/* Affiche le commentaire */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;







