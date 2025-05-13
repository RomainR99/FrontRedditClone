// src/components/GoogleCallback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoogleUser = async () => {
      try {
        // Appelle ton back ici si tu veux récupérer des infos
        // const response = await fetch(...);
        // const data = await response.json();

        // Simule une redirection
        navigate('/main'); // Redirige après authentification réussie
      } catch (err) {
        console.error("Erreur de callback Google :", err);
      }
    };

    fetchGoogleUser();
  }, [navigate]);

  return <p>Connexion en cours avec Google...</p>;
};

export default GoogleCallback;