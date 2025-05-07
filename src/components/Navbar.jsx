import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-white text-2xl font-bold">
        Reddit Clone
      </Link>

      {/* Barre de recherche */}
      <div className="flex-1 mx-6">
        <input
          type="text"
          placeholder="Rechercher un post, une communauté..."
          className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Liens */}
      <div className="space-x-4 text-white">
        <Link to="/">Accueil</Link>
        <Link to="/create-post">Créer un Post</Link>
        <Link to="/login">Se connecter</Link>
      </div>
    </nav>
  );
};

export default Navbar;
