// src/pages/Home.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/Postcard';
import CreatePost from '../components/Createpost';

const Home = () => {
  const posts = [
    { title: "Mon premier post", content: "Salut tout le monde !", author: "Alice" },
    { title: "React c’est top", content: "J’adore faire des composants", author: "Bob" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <CreatePost />
          {posts.map((post, i) => (
            <PostCard key={i} {...post} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Home;

