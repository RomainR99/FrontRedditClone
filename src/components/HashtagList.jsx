import "../styles/HashtagList.css";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HashtagList() {
  const [hashtags, setHashtags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:1337/api/hashtags")
      .then(res => res.json())
      .then(data => setHashtags(data.data))
      .catch(err => console.error("Erreur lors de la récupération des hashtags :", err));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Découvrir des communautés</h2>
      <ul className="space-y-4">
        {hashtags.map(tag => (
          <li key={tag.id} className="flex justify-between items-center p-4 bg-gray-100 rounded shadow">
            <span className="text-lg font-medium">{tag.Hashtag}</span>
            <button
              onClick={() => navigate(`/hashtag/${tag.id}`)}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Rejoindre
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HashtagList;
