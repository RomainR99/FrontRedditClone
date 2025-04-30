// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Posts from './components/Posts';
import FirstLogin from './components/FirstLogin'; // Importer FirstLogin

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/first-login" element={<FirstLogin />} /> {/* Ajouter la route pour FirstLogin */}
      </Routes>
    </Router>
  );
}

export default App;





