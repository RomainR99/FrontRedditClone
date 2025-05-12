import React, { useState } from "react";

const Comment = ({ postId }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Vous devez être connecté pour commenter.");
      return;
    }

    try {
      const res = await fetch("http://localhost:1337/api/comments", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            Markdown: newComment,        // Assure-toi que le champ s'appelle bien "Content"
            article: postId,            // Ici c’est "article" si c’est le nom de la relation
          },
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi du commentaire");

      setNewComment("");
      window.location.reload(); // Recharge les commentaires
    } catch (err) {
      console.error("Erreur:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Écrivez un commentaire..."
        className="w-full p-2 border rounded"
      ></textarea>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Envoyer
      </button>
    </form>
  );
};

export default Comment;



