import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CommunityList = () => {
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/subreddits')
      .then((res) => {
        setSubreddits(res.data.data || []); // sécurité si data est undefined
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des subreddits :", err);
      });
  }, []);

  return (
    <div className="bg-gray-800 p-4 text-white rounded">
      <h3 className="text-lg font-bold mb-2">Communautés</h3>
      <ul>
        {subreddits.map((sub) => {
          const name = sub?.attributes?.name;
          if (!name) return null; // éviter de crasher si name n'existe pas

          return (
            <li key={sub.id}>
              <Link to={`/subreddit/${sub.id}`} className="text-orange-400 hover:underline">
                r/{name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommunityList;
