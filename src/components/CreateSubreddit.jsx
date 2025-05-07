import React, { useState } from 'react';
import axios from 'axios';

const CreateSubreddit = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1337/api/subreddits', {
        data: { name }
      });
      setSuccess(true);
      setName('');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la création');
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded">
      <h2 className="text-xl font-bold mb-2">Créer un Subreddit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du subreddit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 mb-2 w-full rounded text-black"
          required
        />
        <button type="submit" className="bg-orange-500 px-4 py-2 rounded text-white">
          Créer
        </button>
      </form>
      {success && <p className="text-green-500 mt-2">Subreddit créé !</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CreateSubreddit;
