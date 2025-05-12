import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, password }),
      });

      if (!response.ok) throw new Error('Identifiants incorrects');

      const data = await response.json();
      localStorage.setItem('jwt', data.jwt);
      window.location.href = '/main';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connexion-page">
      <form onSubmit={handleSubmit} className="connexion-form">
        <h2>Connexion</h2>

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Mot de passe:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {error && <p className="error">{error}</p>}

        <button type="submit">{loading ? 'Connexion...' : 'Se connecter'}</button>

        {/* 🔽 Ajoute ton bouton Google ici */}
        <GoogleLoginButton />
      </form>
    </div>
  );
};

export default Login;


