import { useState } from "react";
import "../PostCard.css";

function PostCard({ title, content, image, onDelete }) {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [shared, setShared] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleLike = () => setLikes((prev) => prev + 1)
    const handleDislike = () => setDislikes((prev) => prev + 1)
    const handleShare = async () => {
      const postText = `${title}\n\n${content}\n\n${image ? image : ''}`
      try {
        await navigator.clipboard.writeText(postText)
        setShared(true)
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.error('Erreur lors du partage: ', err);
        
      }
    }

    const tooggleCommentInput = () => setShowCommentInput(!showCommentInput)
    const handleCommentSubmit = (e) => {
      e.preventDefault()
      if (newComment.trim()) {
        setComments((prev) => prev + 1)
        setNewComment('')
        setShowCommentInput(false)
      }
    }
  
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
                <i className="bi bi-chat"></i> {comments.length}
              </span>
              &nbsp;
              <span onClick={handleShare} style={{ cursor: 'pointer' }}>
                <i className="bi bi-share"></i> {shared ? "Lien copié!" : "Partager"}
              </span>
              &nbsp;
              <span onClick={onDelete} style={{ cursor: 'pointer', color: '#f87171' }}>
                <i className="bi bi-trash"></i> Supprimer
              </span>
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
        </div>
    )
}

export default PostCard