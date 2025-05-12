import { useEffect, useState } from 'react';

export default function CommentList({ postId, refreshTrigger }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const allComments = JSON.parse(localStorage.getItem('comments')) || [];
    const filtered = allComments.filter((c) => c.postId === postId);
    setComments(filtered);
  }, [postId, refreshTrigger]);

  return (
    <div>
      <h4>Commentaires :</h4>
      {comments.length === 0 ? (
        <p>Aucun commentaire.</p>
      ) : (
        <ul>
          {comments.map((c) => (
            <li key={c.id}>
              <p>{c.content}</p>
              <small>{new Date(c.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
