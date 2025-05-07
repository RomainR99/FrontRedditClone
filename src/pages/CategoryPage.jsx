import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CategoryPage = () => {
  const { name } = useParams(); // le paramètre d'URL :category/:name
  const navigate = useNavigate();

  const formatTitle = (slug) =>
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen bg-[#111113] text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-orange-500">
            r/{formatTitle(name)}
          </h1>
          <p className="text-gray-400 mt-2">
            Bienvenue sur la communauté {formatTitle(name)} !
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded text-sm"
          >
            ← Retour à l’accueil
          </button>

          <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded font-semibold text-sm">
            🔥 Rejoindre cette communauté
          </button>
        </div>

        <div className="bg-zinc-800 p-6 rounded-lg shadow">
          <p className="text-gray-400">Aucun post ici pour l’instant...</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
