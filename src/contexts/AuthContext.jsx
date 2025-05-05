import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Vérifier la validité du token et récupérer les informations utilisateur
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:1337/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
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