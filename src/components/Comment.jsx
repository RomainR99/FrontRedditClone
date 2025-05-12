import React, { useState } from "react";

const getCurrentUserId = () => {
  const token = localStorage.getItem("jwt");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
};

const Comment = ({ postId, setPosts }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
  
    const token = localStorage.getItem("jwt");
    const userId = getCurrentUserId(); // ta fonction de décodage du JWT
  
    if (!token || !userId) {
      alert("Vous devez être connecté pour commenter.");
      return;
    }
  
    const commentData = {
      data: {
        Content: commentText, // ou Markdown: commentText si tu préfères
        article: postId,
        user: userId
      }
    };
  
    try {
      const res = await fetch("http://localhost:1337/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        console.error("Erreur API complète :", JSON.stringify(result, null, 2));
        throw new Error(result.error?.message || "Erreur serveur");
      }
  
      console.log("Commentaire ajouté :", result.data);
      setCommentText("");
      // Tu peux aussi recharger les commentaires ici si nécessaire
  
    } catch (err) {
      console.error("Erreur lors de l'envoi du commentaire :", err.message);
      alert(err.message);
    }
  };
  

  return (
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
  );
};

export default Comment;





