import React from "react";

const PostCard = ({ post }) => {
  const title = post?.attributes?.title || "Titre non disponible";
  const imageUrl = post?.attributes?.image || ""; // Assure-toi que le champ s'appelle bien "image"

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="rounded-lg max-h-96 object-cover w-full"
        />
      ) : (
        <p className="text-gray-400">Aucune image</p>
      )}
    </div>
  );
};

export default PostCard;

