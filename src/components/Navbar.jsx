import React from "react";
import "../styles/Navbar.css"; 

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Reddit</h1>
      </div>

      <div className="navbar-center">
        <input type="text" placeholder="Rechercher..." className="search" />
      </div>

       <div className="navbar-right flex gap-4 items-center">
        <button className="login-btn">Connexion</button>
       </div>
       <div className="flex justify-between items-center px-4 py-4">
            <a
                href="/createPost"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
                + Ajouter un post
            </a>
        </div>

    </header>
  );
}

export default Navbar;