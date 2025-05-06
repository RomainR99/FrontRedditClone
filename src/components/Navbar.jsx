import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-zinc-800 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Reddit Clone</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Accueil</Link>
        <Link to="/create-post" className="hover:underline">Créer un Post</Link>
        <Link to="/login" className="hover:underline">Se connecter</Link>
      </div>
    </nav>
  );
};

export default Navbar;
