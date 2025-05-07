// composants/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Culture Internet', emoji: '🌐', path: 'culture-internet' },
  { name: 'Jeux Vidéo', emoji: '🎮', path: 'jeux-video' },
  { name: 'Questions/Réponses', emoji: '💬', path: 'questions-reponses' },
  { name: 'Technologie', emoji: '💻', path: 'technologie' },
  { name: 'Pop Culture', emoji: '⭐', path: 'pop-culture' },
  { name: 'Films & Séries', emoji: '🎬', path: 'films-series' },
];

export default function Sidebar() {
  return (
    <aside className="bg-zinc-800 p-4 rounded-xl">
      <h2 className="text-gray-400 uppercase text-sm mb-4">Catégories</h2>
      <ul className="space-y-2">
        {categories.map((cat, index) => (
          <li key={index}>
            <Link
              to={`/category/${cat.path}`}
              className="flex items-center gap-2 hover:underline text-white"
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

