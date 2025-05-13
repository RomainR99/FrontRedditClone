// src/components/FirstLogin.jsx
import React, { useState } from 'react';
import "../styles/FirstLogin.css";
import { Link } from 'react-router-dom';


const FirstLogin = () => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: `${prenom} ${nom}`,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }

      const data = await response.json();
      localStorage.setItem('jwt', data.jwt);
      window.location.href = '/main'; //une fois le compte créé on est redirigé vers main main
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 

  return (
    
        <div className="firstlogin-page">
      <div className="firstlogin-form">
        <h2>Première connexion</h2>

        <div className="form-container">
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div>
              <input
                type="text"
                placeholder="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirmation du mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? "Création du compte..." : "Créer mon compte"}
            </button>
            <p className="signup-redirect">
              Déjà inscrit ? <Link to="/login">Se connecter</Link>
            </p>
          </form>
        </div>
      </div>
    </div>

    
  );  
};

export default FirstLogin;
