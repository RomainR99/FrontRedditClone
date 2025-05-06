import React, { useState, useEffect } from 'react';
import api from '../api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subredditId, setSubredditId] = useState('');
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    const fetchSubreddits = async () => {
      const res = await api.get('/subreddits');
      setSubreddits(res.data.data);
    };
    fetchSubreddits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/posts', {
        data: {
          title,
          content,
          subreddit: subredditId,
        },
      });
      console.log('Post créé :', res.data);
      setTitle('');
      setContent('');
      setSubredditId('');
    } catch (err) {
      console.error('Erreur lors de la création du post', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer un nouveau post</h2>

      <div>
        <label>Titre :</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <label>Contenu :</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>

      <div>
        <label>Subreddit :</label>
        <select value={subredditId} onChange={(e) => setSubredditId(e.target.value)} required>
          <option value="">Choisir un subreddit</option>
          {subreddits.map((s) => (
            <option key={s.id} value={s.id}>
              {s.attributes.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Publier</button>
    </form>
  );
};

export default CreatePost;
