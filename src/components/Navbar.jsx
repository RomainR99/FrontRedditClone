import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ onSearch }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="navbar flex justify-between items-center px-6 py-4 bg-white shadow">
      {/* Logo */}
      <div className="navbar-left">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Reddit
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="navbar-center w-1/2">
        <input
          type="text"
          placeholder="Rechercher un post, un commentaire..."
          className="w-full p-2 border rounded"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Boutons à droite */}
      <div className="navbar-right flex items-center gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={handleLoginClick}
        >
          Connexion
        </button>

        <Link
          to="/createPost"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Ajouter un post
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
