import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('jwt', data.jwt);
        navigate('/profile');
      } else {
        setError(data.error?.message || 'Échec de la connexion');
      }
    } catch (err) {
      console.error('Erreur :', err);
      setError("Une erreur s'est produite.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-zinc-900 text-white px-4">
        <div className="bg-zinc-800 p-8 rounded-xl w-full max-w-md shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Se connecter</h1>

          {error && (
            <div className="bg-red-600 text-white p-2 rounded mb-4 text-sm">{error}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded font-semibold"
            >
              Connexion
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;


