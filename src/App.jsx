// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Main from './components/Main';
import SignUp from './components/SignUp';
import Posts from './components/Posts';
import FirstLogin from './components/FirstLogin';
import CreatePost from './components/CreatePost';
import GoogleCallback from './components/GoogleCallback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/first-login" element={<FirstLogin />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/google-callback" element={<GoogleCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
