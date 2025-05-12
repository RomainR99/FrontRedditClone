import { useState } from 'react';
import './comments.css';

export default function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      id: Date.now(),
      postId,
      content,
      createdAt: new Date().toISOString(),
    };

    const key = `comments-${postId}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const updated = [...existing, newComment];
    localStorage.setItem(key, JSON.stringify(updated));

    setContent('');
    onCommentAdded(); // pour rafraîchir la liste
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        placeholder="Ajouter un commentaire..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        required
      />
      <button type="submit">💬 Commenter</button>
    </form>
  );
}

