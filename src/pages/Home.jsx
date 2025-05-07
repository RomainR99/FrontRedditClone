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
      .then((data) => {
        if (Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.warn("Structure inattendue des données :", data);
        }
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des posts :", err)
      );
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-900 text-white px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_300px] gap-6 max-w-screen-xl mx-auto">
          <aside className="bg-zinc-800 p-4 rounded-xl">
            <Sidebar />
          </aside>

          <section className="space-y-4">
            <h1 className="text-4xl font-bold mb-4 text-orange-500 flex items-center gap-2">
              <span>🔥</span> Posts populaires
            </h1>

            {posts.length === 0 ? (
              <p className="text-gray-400">Aucun post pour le moment.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-zinc-800 p-4 rounded-lg shadow hover:shadow-orange-400/20 transition"
                >
                  <PostCard post={post} />
                </div>
              ))
            )}
          </section>

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



