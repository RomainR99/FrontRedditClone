import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";

const CommunityPage = () => {
  const { name } = useParams();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    // Récupère les données de la communauté
    fetch(`http://localhost:1337/api/subreddits?filters[name][$eq]=${name}&populate=*`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.length > 0) {
          const subreddit = data.data[0];
          setCommunity(subreddit);
          setPosts(subreddit.attributes.posts?.data || []);
        }
      })
      .catch((err) => console.error("Erreur communauté :", err));
  }, [name]);

  const handleJoin = () => {
    setJoined(!joined); // À remplacer plus tard par un appel API
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-900 text-white px-6 py-8">
        <div className="max-w-screen-lg mx-auto space-y-6">
          {community ? (
            <>
              <div className="flex items-center justify-between bg-zinc-800 p-6 rounded-xl">
                <div>
                  <h1 className="text-3xl font-bold text-orange-500">r/{community.attributes.name}</h1>
                  <p className="text-gray-300 mt-1">{community.attributes.description}</p>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    joined ? "bg-red-500" : "bg-orange-500"
                  } hover:opacity-90 transition`}
                  onClick={handleJoin}
                >
                  {joined ? "Quitter" : "Rejoindre"}
                </button>
              </div>

              {/* Liste des posts */}
              <div className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-zinc-800 p-4 rounded-lg shadow hover:shadow-orange-400/20 transition"
                    >
                      <PostCard post={post} />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Aucun post dans cette communauté.</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-400">Chargement...</p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CommunityPage;
