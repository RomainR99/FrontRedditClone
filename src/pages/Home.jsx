import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import CommunityList from "../components/CommunityList";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/posts?populate=*")
      .then((res) => res.json())
      .then((data) => setPosts(data.data))
      .catch((err) => console.error("Erreur en récupérant les posts :", err));
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-900 text-white px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_300px] gap-6 max-w-screen-xl mx-auto">

          {/* Colonne gauche - Sidebar */}
          <aside className="bg-zinc-800 p-4 rounded-xl">
            <Sidebar />
          </aside>

          {/* Colonne centrale - Liste des posts */}
          <section className="space-y-4">
            <h1 className="text-4xl font-bold mb-4">Liste des Posts</h1>
            {posts.length === 0 ? (
              <p>Aucun post pour le moment.</p>
            ) : (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </section>

          {/* Colonne droite - Communautés */}
          <aside className="bg-zinc-800 p-4 rounded-xl">
            <CommunityList />
          </aside>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;






