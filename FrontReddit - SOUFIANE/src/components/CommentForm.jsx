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

    const existing = JSON.parse(localStorage.getItem('comments')) || [];
    const updated = [...existing, newComment];
    localStorage.setItem('comments', JSON.stringify(updated));

    setContent('');
    onCommentAdded(); // pour recharger la liste
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Ajouter un commentaire"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Commenter</button>
    </form>
  );
}
