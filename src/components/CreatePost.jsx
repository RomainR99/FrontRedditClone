import React from "react";
import Sidebar from "../components/Sidebar";
import CommunityList from "../components/CommunityList";
import Navbar from "../components/Navbar";

const CreatePost = () => {
  return (
    <div className="min-h-screen bg-[#111113] text-white">
      <Navbar />
      <div className="flex max-w-7xl mx-auto px-4 pt-6 space-x-6">
        {/* Sidebar gauche */}
        <div className="w-1/5">
          <Sidebar />
        </div>

        {/* Formulaire central */}
        <div className="w-3/5 bg-[#1a1a1b] p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Créer un Post</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Titre</label>
              <input
                type="text"
                className="w-full bg-[#272729] p-2 rounded text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Image (URL)</label>
              <input
                type="text"
                className="w-full bg-[#272729] p-2 rounded text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded font-bold"
            >
              Publier
            </button>
          </form>
        </div>

        {/* Colonne droite */}
        <div className="w-1/5">
          <CommunityList />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
