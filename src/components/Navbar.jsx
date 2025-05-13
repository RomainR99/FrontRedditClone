import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const unreadNotificationsCount = 3; // Nombre fictif de notifications non lues

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo du site */}
        <Link to="/" className="navbar-logo">
          Reddit Clone
        </Link>

        {/* Liens de navigation */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Accueil</Link>
          <Link to="/subreddits" className="navbar-link">Subreddits</Link>

          {/* Si l'utilisateur est connecté */}
          {user ? (
            <>
              <Link to="/create-post" className="navbar-link">Créer un post</Link>
              <button onClick={handleLogout} className="navbar-button">Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Connexion</Link>
              <Link to="/register" className="navbar-button">Inscription</Link>
            </>
          )}
        </div>

        {/* Barre de recherche */}
        <form onSubmit={handleSearch} className="navbar-search-form">
          <input
            type="text"
            className="navbar-search-input"
            placeholder="🔍 Rechercher un post..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Notifications */}
        <div className="notif-container">
          <button onClick={() => setShowNotifs(!showNotifs)} className="notif-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`notif-icon ${unreadNotificationsCount > 0 ? "has-notif" : ""}`}
            >
              <path
                fill="none"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.99 2.99 0 0019 13V7a7 7 0 10-14 0v6a2.99 2.99 0 00-1.595 2.595L4 17h5m6 0v2a2 2 0 11-4 0v-2m4 0H9"
              />
            </svg>
            {unreadNotificationsCount > 0 && (
              <span className="notif-badge">{unreadNotificationsCount}</span>
            )}
          </button>
          {showNotifs && (
            <div className="notif-list">
              {/* Ici tu peux afficher les notifications de manière dynamique */}
              Notifications ici...
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
