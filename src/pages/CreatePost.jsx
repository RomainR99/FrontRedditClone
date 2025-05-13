import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/CreatePost.css'; 

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subreddit, setSubreddit] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth(); // Assure-toi que `user` contient l'id

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !subreddit) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:1337/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            title,
            content,
            subreddit,
            author: user?.id,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du post.');
      }

      const data = await response.json();
      console.log('Post créé :', data);
      navigate(`/r/${subreddit}`);
    } catch (err) {
      setError('Une erreur est survenue lors de la publication.');
      console.error(err);
    }
  };

  return (
    <div className="create-post-container">
      <h1>Créer un nouveau post</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre du post"
            required
          />
        </div>

        <div>
          <label>Contenu</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Contenu du post"
            required
          />
        </div>

        <div>
          <label>Nom du Subreddit</label>
          <input
            type="text"
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
            placeholder="ex: programmation"
            required
          />
        </div>

        <button type="submit">Publier</button>
      </form>
    </div>
  );
};

export default CreatePost;
