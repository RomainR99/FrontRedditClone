// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Posts from './components/Posts';
import FirstLogin from './pages/FirstLogin'; // Importer FirstLogin
import Main from './pages/Main';
import CreatePost from './pages/CreatePost';
import CategoryPosts from './pages/CategoryPosts';
import ArticleDetails from "./pages/ArticleDetail";
import 'bootstrap-icons/font/bootstrap-icons.css';
import HashtagPosts from './pages/HashtagPosts';
import HashtagList from './components/HashtagList';





function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/first-login" element={<FirstLogin />} /> 
        <Route path="/main" element={<Main />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/categorie/:nom" element={<CategoryPosts />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/hashtags" element={<HashtagList />} />
        <Route path="/hashtag/:id" element={<HashtagPosts />} />

        
      </Routes>
    </Router>
  );
}

export default App;





