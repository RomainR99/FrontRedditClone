import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    // Redirection si besoin...
  }, []);

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
      <div className="connexion-form">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-4">
          <button onClick={() => navigate('/first-login')}>
            FirstLogin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

