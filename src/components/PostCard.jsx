import React from "react";

export default function PostCard({ post }) {
  const { title, cover } = post;

  const imageUrl = cover?.url
    ? `http://localhost:1337${cover.url}`
    : null;

  return (
    <div className="bg-zinc-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-white">
        {title || "Titre non disponible"}
      </h2>
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="mt-2 rounded" />
      ) : (
        <p className="text-gray-400">Aucune image</p>
      )}
    </div>
  );
}
