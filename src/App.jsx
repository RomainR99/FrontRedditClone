import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import Subreddit from './pages/Subreddit';
import CategoryPage from './pages/CategoryPage'; // à créer
import Profile from './pages/Profile';
import CommunityPage from './pages/CommunityPage';


// Composants
import CreatePost from './components/CreatePost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/subreddit/:slug" element={<Subreddit />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/community/:name" element={<CommunityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
