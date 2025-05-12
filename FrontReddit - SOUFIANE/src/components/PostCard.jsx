import { useState, useEffect } from "react";
import "../PostCard.css";

// Liste des réactions (émoticônes)
const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '😡'];

function PostCard({ title, content, image }) {
  const postId = title.replace(/\s+/g, "-").toLowerCase(); // ID basé sur le titre

  // État pour les "likes", "dislikes", commentaires, et réactions
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [shared, setShared] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  
  // Réactions
  const [reactions, setReactions] = useState(() => {
    const saved = localStorage.getItem(`reactions-${postId}`);
    return saved ? JSON.parse(saved) : {};
  });

  // 🔁 Charger les commentaires à partir de localStorage
  useEffect(() => {
    const allComments = JSON.parse(localStorage.getItem('comments')) || [];
    const filtered = allComments.filter(c => c.postId === postId);
    setCommentList(filtered);
  }, [postId]);

  const handleLike = () => setLikes((prev) => prev + 1);
  const handleDislike = () => setDislikes((prev) => prev + 1);
  const handleShare = () => {
    setShared(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setShared(false), 2000);
  };

  const tooggleCommentInput = () => setShowCommentInput(!showCommentInput);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        postId,
        content: newComment,
        createdAt: new Date().toISOString()
      };

      const allComments = JSON.parse(localStorage.getItem('comments')) || [];
      const updatedComments = [...allComments, newCommentObj];
      localStorage.setItem('comments', JSON.stringify(updatedComments));

      setCommentList(prev => [...prev, newCommentObj]);
      setNewComment('');
      setShowCommentInput(false);
    }
  };

  // Fonction pour gérer les réactions (réaction avec emoji)
  const handleReaction = (emoji) => {
    const updated = {
      ...reactions,
      [emoji]: (reactions[emoji] || 0) + 1,
    };
    setReactions(updated);
    localStorage.setItem(`reactions-${postId}`, JSON.stringify(updated));
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img src="https://i.etsystatic.com/20335141/r/il/eb2b91/3883806172/il_570xN.3883806172_mk03.jpg" alt="avatar" className="avatar" />
        <div className="meta">
          <span className="subreddit">r/linux</span>
          <span className="dot">•</span>
          <span className="time">il y a 3 h</span>
        </div>
        <button className="join-btn">Rejoindre</button>
      </div>

      <h3 className="post-title">{title}</h3>

      {image && (
        <div className="post-image">
          <img src={image} alt="content" />
        </div>
      )}
      <p className="post-content">{content}</p>

      <div className="post-footer">
        <span onClick={handleLike} style={{ cursor: 'pointer' }}>
          <i className="bi bi-hand-thumbs-up"></i> {likes}
        </span>
        &nbsp;
        <span onClick={handleDislike} style={{ cursor: 'pointer' }}>
          <i className="bi bi-hand-thumbs-down"></i> {dislikes}
        </span>
        &nbsp;
        <span onClick={tooggleCommentInput} style={{ cursor: 'pointer' }}>
          <i className="bi bi-chat"></i> {commentList.length}
        </span>
        &nbsp;
        <span onClick={handleShare} style={{ cursor: 'pointer' }}>
          <i className="bi bi-share"></i> {shared ? "Lien copié!" : "Partager"}
        </span>
      </div>

      {/* Affichage des réactions */}
      <div className="reactions-bar">
        {REACTIONS.map((emoji) => (
          <button
            key={emoji}
            className="reaction-btn"
            onClick={() => handleReaction(emoji)}
          >
            {emoji} {reactions[emoji] || 0}
          </button>
        ))}
      </div>

      {showCommentInput && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
          />
          <button type="submit">Envoyer</button>
        </form>
      )}

      {commentList.length > 0 && (
        <div className="comment-list">
          <h4>Commentaires :</h4>
          <ul>
            {commentList.map((comment) => (
              <li key={comment.id}>
                <p>{comment.content}</p>
                <small>{new Date(comment.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PostCard;
