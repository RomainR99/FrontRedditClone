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

const getUsername = async (userId) => {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`http://localhost:1337/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.username;
};

// Fonction pour extraire les hashtags, uniques et en minuscules
const extractHashtags = (text) => {
  const matches = text.match(/#\w+/g);
  if (!matches) return [];
  return [...new Set(matches.map(tag => tag.toLowerCase()))];
};

const Comment = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const token = localStorage.getItem("jwt");
    const userId = getCurrentUserId();
    if (!token || !userId) {
      alert("Vous devez être connecté pour commenter.");
      return;
    }

    try {
      const username = await getUsername(userId);

      const hashtags = extractHashtags(commentText);
      const hashtagIds = [];

      for (const tag of hashtags) {
        const response = await fetch(
          `http://localhost:1337/api/hashtags?filters[Hashtag][$eq]=${encodeURIComponent(tag)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();

        if (data.data.length > 0) {
          hashtagIds.push(data.data[0].id);
        } else {
          const create = await fetch("http://localhost:1337/api/hashtags", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: { Hashtag: tag },
            }),
          });
          const created = await create.json();
          if (created.data && created.data.id) {
            hashtagIds.push(created.data.id);
          }
        }
      }

      // ✅ Création du commentaire avec association propre aux hashtags
      const commentData = {
        data: {
          Content: `${commentText} - Posté par: ${username}`,
          article: postId,
          ...(hashtagIds.length > 0 ? { hashtags: hashtagIds.map(id => ({ id })) } : {}),
        }
      };

      // 🐛 Affiche les données envoyées pour debug
      console.log("Comment envoyé :", JSON.stringify(commentData, null, 2));

      const res = await fetch("http://localhost:1337/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error?.message || "Erreur serveur");

      setCommentText("");

      // Rechargement des commentaires
      const commentsRes = await fetch(`http://localhost:1337/api/comments?filters[article]=${postId}`);
      const commentsData = await commentsRes.json();
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

      <div className="comments-section mt-6">
        <h3 className="text-xl font-semibold">Commentaires :</h3>
        {comments.length === 0 ? (
          <p>Aucun commentaire pour ce post.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment mt-4 p-2 border rounded">
              <p>{comment.Content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default Comment;






