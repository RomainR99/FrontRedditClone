// composants/CommunityList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const communities = [
  { name: 'culture-internet' },
  { name: 'jeux-video' },
  { name: 'questions-reponses' },
  { name: 'technologie' },
  { name: 'pop-culture' },
  { name: 'films-series' },
];

export default function CommunityList() {
  return (
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">Communautés</h2>
      <ul className="space-y-2">
        {communities.map((community, index) => (
          <li key={index} className="flex justify-between items-center">
            <Link
              to={`/community/${community.name}`}
              className="text-orange-400 hover:underline"
            >
              r/{community.name}
            </Link>
            <button className="ml-2 px-2 py-0.5 bg-orange-500 text-sm text-white rounded hover:bg-orange-600">
              Rejoindre
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

