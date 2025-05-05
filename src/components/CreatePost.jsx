import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import "../styles/MainPage.css";

function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Nettoyage de l'aperçu d'image
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

    if (!token) {
      setError("Vous devez être connecté pour créer un post.");
      return;
    }

    if (!cover) {
      setError("Veuillez sélectionner une image au format PNG ou JPEG.");
      return;
    }

    try {
      // Décoder le token pour récupérer l'utilisateur connecté
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id; // L'ID de l'utilisateur connecté

      // Étape 1 : upload image
      const formImage = new FormData();
      formImage.append("files", cover);

      const uploadRes = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formImage,
      });

      if (!uploadRes.ok) throw new Error("Échec de l'upload de l'image.");
      const imageData = await uploadRes.json();
      const imageId = imageData[0].id;

      // Étape 2 : créer article
      const res = await fetch("http://localhost:1337/api/articles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            title,
            description,
            cover: imageId,
            //createdBy: userId, // L'auteur du post
          },
        }),
      });

      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
      navigate("/posts"); //une fois créé on est renvoyé à cette adresse

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="center-layout p-6">
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
                  <img
                    src={preview}
                    alt="aperçu"
                    className="w-full max-w-xs rounded shadow"
                  />
                </div>
              )}

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
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


