import React from 'react';

const communities = ['devweb', 'reactjs', 'anime'];

export default function CommunityList() {
  return (
    <aside className="bg-zinc-800 p-4 rounded-xl">
      <h2 className="text-gray-400 uppercase text-sm mb-4">Communautés</h2>
      <ul className="space-y-2">
        {communities.map((com, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <span>r/{com}</span>
            <button className="bg-white text-black text-sm px-2 py-1 rounded hover:bg-gray-200">Rejoindre</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
