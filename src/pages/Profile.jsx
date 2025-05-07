import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-900 text-white px-6 py-8">
        <div className="max-w-3xl mx-auto bg-zinc-800 p-6 rounded-xl text-center">
          <h1 className="text-3xl font-bold mb-4">Bienvenue sur ton profil</h1>
          {user ? (
            <>
              <p className="text-xl mb-2">👤 {user.username}</p>
              <p className="text-gray-400">📧 {user.email}</p>
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                }}
                className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <p>Chargement des données...</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
