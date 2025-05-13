import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Categories.css'; // On va définir les styles CSS dans ce fichier

const Categories = () => {
  // Définir les catégories ici
  const categories = [
    { id: 1, name: 'Culture Internet' },
    { id: 2, name: 'Jeux Vidéo' },
    { id: 3, name: 'Question et Réponse' },
    { id: 4, name: 'Technologie' },
    { id: 5, name: 'Pop Culture' },
    { id: 6, name: 'Films et Séries' }
  ];

  return (
    <div className="categories-container">
      <h1>Catégories</h1>
      <div className="categories-list">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <Link to={`/category/${category.id}`} className="category-link">
              <h2>{category.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
