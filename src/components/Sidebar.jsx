// composants/Sidebar.jsx
import React from 'react';

const categories = [
  { name: 'Culture Internet', emoji: '🌐' },
  { name: 'Jeux Vidéo', emoji: '🎮' },
  { name: 'Questions/Réponses', emoji: '💬' },
  { name: 'Technologie', emoji: '💻' },
  { name: 'Pop Culture', emoji: '⭐' },
  { name: 'Films & Séries', emoji: '🎬' },
];

export default function Sidebar() {
  return (
    <aside className="bg-zinc-800 p-4 rounded-xl">
      <h2 className="text-gray-400 uppercase text-sm mb-4">Catégories</h2>
      <ul className="space-y-2">
        {categories.map((cat, index) => (
          <li key={index} className="flex items-center gap-2 hover:underline cursor-pointer">
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
