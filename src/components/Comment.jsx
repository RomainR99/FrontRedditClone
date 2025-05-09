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
      const res = await fetch("http://localhost:1337/api/articles?populate=comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            content: newComment,
            post: postId, // Assurez-vous que le nom de relation est bien `article`
          },
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi du commentaire");

      setNewComment("");
      window.location.reload(); // Recharge pour voir le nouveau commentaire
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


