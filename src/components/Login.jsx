// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialisation du hook de navigation

  // Redirection automatique si l'utilisateur est déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('jwt');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Identifiants incorrects');
      }

      const data = await response.json();
      const token = data.jwt;
      console.log(data.user)

      localStorage.setItem('jwt', token);
      /*window.location.href = '/posts';*/
      window.location.href = '/main';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de redirection vers la page FirstLogin
  const handleRedirectToFirstLogin = () => {
    navigate('/first-login'); // Redirige vers la page FirstLogin
  };

  return (
    <div className="connexion-page">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="connexion-form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      {/* Ajout du bouton pour rediriger vers la page FirstLogin */}
      <div className="mt-4">
        <button
          onClick={handleRedirectToFirstLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          FirstLogin
        </button>
      </div>
    </div>
  );
};

export default Login;


