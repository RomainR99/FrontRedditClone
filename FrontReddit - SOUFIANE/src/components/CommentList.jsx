import { useEffect, useState } from 'react';
import './comments.css';

export default function CommentList({ postId, refreshTrigger }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const key = `comments-${postId}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    setComments(stored);
  }, [postId, refreshTrigger]);

  const handleDelete = (id) => {
    const key = `comments-${postId}`;
    const updated = comments.filter((c) => c.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
    setComments(updated);
  };

  return (
    <div className="comment-list">
      <h4>Commentaires :</h4>
      {comments.length === 0 ? (
        <p>Aucun commentaire.</p>
      ) : (
        <ul>
          {comments.map((c) => (
            <li key={c.id} className="comment-item">
              <div className="comment-top">
                <p>{c.content}</p>
                <button onClick={() => handleDelete(c.id)}>🗑 Supprimer</button>
              </div>
              <small>{new Date(c.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

