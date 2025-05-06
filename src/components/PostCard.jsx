import React from "react";

const PostCard = ({ post }) => {
  const cover = post?.attributes?.cover?.data;
  const imageUrl = cover
    ? `http://localhost:1337${cover.attributes.url}`
    : "https://upload.wikimedia.org/wikipedia/en/8/82/Reddit_logo_and_wordmark.svg"; // image plus lisible

  return (
    <div className="bg-zinc-800 p-4 rounded-md text-white shadow hover:shadow-lg transition">
      <div className="flex items-start">
        {/* Votes */}
        <div className="flex flex-col items-center mr-4 text-gray-400">
          <button className="hover:text-orange-500">▲</button>
          <span className="font-semibold">123</span>
          <button className="hover:text-blue-500">▼</button>
        </div>

        {/* Post content */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">{post.attributes?.title}</h2>
          <img
            src={imageUrl}
            alt="cover"
            className="w-full max-h-80 object-cover rounded-md mb-3"
          />
          <div className="text-sm text-gray-400 flex space-x-4">
            <span>💬 15 commentaires</span>
            <span>⏱️ il y a 1h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
