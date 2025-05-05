import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subreddit, setSubreddit] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !subreddit.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      await axios.post(
        'http://localhost:1337/api/posts',
        {
          title,
          content,
          subreddit,
          author: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate(`/r/${subreddit}`);
    } catch (error) {
      setError('Erreur lors de la création du post');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Créer un nouveau post</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subreddit" className="block text-sm font-medium text-gray-700">
            Subreddit
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
              r/
            </span>
            <input
              type="text"
              id="subreddit"
              value={subreddit}
              onChange={(e) => setSubreddit(e.target.value)}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:outline-none focus:ring-reddit-orange focus:border-reddit-orange"
              placeholder="nom_du_subreddit"
            />
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-reddit-orange focus:ring-reddit-orange"
            placeholder="Titre du post"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Contenu
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-reddit-orange focus:ring-reddit-orange"
            placeholder="Contenu du post"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-reddit-orange text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:ring-offset-2"
          >
            Publier
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost; 