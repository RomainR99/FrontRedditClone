import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token dans le useEffect:', token); // Débogage
    if (token) {
      // Si un token existe, on vérifie sa validité et on charge l'utilisateur
      checkAuth(token);
    }
  }, []);

  const checkAuth = async (token) => {
    try {
      const response = await axios.get('http://localhost:1337/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Utilisateur récupéré:', response.data); // Débogage
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erreur d\'authentification:', error); // Débogage
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:1337/auth/local', {
        identifier: email,
        password,
      });
      localStorage.setItem('token', response.data.jwt);
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Échec de la connexion');
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:1337/auth/local/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', response.data.jwt);
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Échec de l\'inscription');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
