import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/MainPage.css";

function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [hashtagInput, setHashtagInput] = useState('');
  const navigate = useNavigate();

  const enumCategories = [
    "Memes", "Buzz", "Animaux", "Humour", "Satisfaisant",
    "Action", "Aventure", "E-sports", "Mobile", "Rôle", "Stratégie",
    "Question/Réponse", "Histoire/Confessions",
    "Machine Learning", "Informatique", "Programmation", "Intelligence Artificielle", "Logiciel/Application", "Eléctronique DIY",
    "Célébrités", "Artistes/Influenceurs", "Podcasts", "Streamers",
    "Films", "Séries", "Documentaires", "Critiques", "Bandes Annonces"
  ];

  useEffect(() => {
    if (!cover) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(cover);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [cover]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    if (!token) return setError("Vous devez être connecté pour créer un post.");
    if (!cover) return setError("Veuillez sélectionner une image PNG ou JPEG.");
    if (!categoryId) return setError("Veuillez sélectionner une catégorie.");

    try {
      // Upload image
      const formImage = new FormData();
      formImage.append("files", cover);
      const uploadRes = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formImage,
      });

      if (!uploadRes.ok) throw new Error("Échec de l'upload de l'image.");
      const imageData = await uploadRes.json();
      const imageId = imageData[0].id;

      // Hashtag processing
      let hashtagIds = [];
      const rawTags = hashtagInput
        .split(',')
        .map(tag => tag.trim().replace(/^#/, ''))
        .filter(tag => tag.length > 0);

      for (const tag of rawTags) {
        const check = await fetch(`http://localhost:1337/api/hashtags?filters[Hashtag][$eq]=#${tag}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const checkData = await check.json();
        if (checkData.data.length > 0) {
          hashtagIds.push(checkData.data[0].id);
        } else {
          const create = await fetch("http://localhost:1337/api/hashtags", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: { Hashtag: `#${tag}` },
            }),
          });
          const created = await create.json();
          hashtagIds.push(created.data.id);
        }
      }

      // Créer l'article
      const postRes = await fetch("http://localhost:1337/api/articles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            Title: title,
            Description: description,
            Image: [imageId], // Strapi attend un tableau ici
            Categorie: categoryId,
            hashtags: hashtagIds,
          },
        }),
      });

      if (!postRes.ok) throw new Error(`Erreur HTTP : ${postRes.status}`);
      navigate("/posts");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="center-layout">
          <div className="max-w-xl mx-auto bg-white shadow rounded p-6">
            <h1 className="text-2xl font-bold mb-4">Créer un post</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Titre</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Catégorie</span>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  <option value="">-- Sélectionner une catégorie --</option>
                  {enumCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700">Hashtags (séparés par des virgules)</span>
                <input
                  type="text"
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="#tech, #fun, #AI"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Image (PNG ou JPEG)</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
                      setCover(file);
                      setError(null);
                    } else {
                      setError("Seules les images JPEG et PNG sont autorisées.");
                      setCover(null);
                    }
                  }}
                  className="w-full"
                />
              </label>

              {preview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Aperçu de l'image :</p>
                  <img src={preview} alt="aperçu" className="w-full max-w-xs rounded shadow" />
                </div>
              )}

              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Publier
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreatePost;




