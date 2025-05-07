import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !image) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // 1. Upload de l’image
      const formData = new FormData();
      formData.append("files", image);

      const uploadRes = await axios.post("http://localhost:1337/api/upload", formData);
      const imageId = uploadRes.data[0]?.id;

      if (!imageId) throw new Error("Échec de l'upload de l'image.");

      // 2. Création du post
      const postRes = await axios.post("http://localhost:1337/api/posts", {
        data: {
          title: title,
          cover: imageId, // "cover" doit correspondre au nom du champ media dans ton modèle Strapi
        },
      });

      alert("Post créé avec succès !");
      setTitle("");
      setImage(null);
    } catch (err) {
      console.error("Erreur lors de la création :", err);
      setError(err.response?.data?.error?.message || "Erreur serveur");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-900 text-white px-6 py-8">
        <div className="grid grid-cols-[250px_1fr] max-w-5xl mx-auto gap-6">
          <Sidebar />

          <div className="bg-zinc-800 p-8 rounded-xl">
            <h1 className="text-3xl font-bold text-orange-500 mb-6">Créer un Post</h1>

            {error && <p className="text-red-500 mb-4">Erreur : {error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Titre</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-zinc-700 text-white p-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Image</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full bg-zinc-700 text-white p-2 rounded"
                />
              </div>

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
              >
                Publier
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}




