import "../styles/Sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";


function Sidebar() {
    const [category, setCategory] = useState(null)

    const toggleCategory = (cat) => {
        setCategory(category === cat ? null : cat)
    } 
    const subcategory = {
        culture: ['Memes', 'Buzz', 'Animeaux', 'Humour', 'Satisfaisant'],
        jeux: ['Action', 'Aventure', 'E-sports', 'Mobile', 'Rôle', 'Stratégie'],
        questions: ['Question/Réponse', 'Histoire/Confessions'],
        tech: ['Machine Learning', 'Informatique', 'Programmation', 'Intelligence Artificielle', 'Logiciel/Application', 'Eléctronique DIY'],
        pop: ['Célébrités', 'Artistes/Influenceurs', 'Podcasts', 'Streamers'],
        films: ['Films', 'Séries', 'Documentaires', 'Critiques', 'Bandes Annonces']
    };
    
    return (
        <aside className="sidebar">
          <h2 className="section-title">Catégories</h2>
    
          <div className="category" onClick={() => toggleCategory("culture")}>
            <i className="bi bi-emoji-smile"></i>
            <span className="category-label">Culture Internet</span>
            <i className={`bi ${category === "culture" ? "bi-chevron-up" : "bi-chevron-down"} arrow`}></i>
          </div>
          {category === "culture" && (
            <ul className="subcategory">
              {subcategory.culture.map((item) => (
                <li key={item}>
                  <Link to={`/categorie/${item}`} className="subcategory-link">{item}</Link>
                </li>
              ))}
            </ul>
          )}
    
          <div className="category" onClick={() => toggleCategory("jeux")}>
            <i className="bi bi-controller"></i>
            <span className="category-label">Jeux Vidéo</span>
            <i className={`bi ${category === "jeux" ? "bi-chevron-up" : "bi-chevron-down"} arrow`}></i>
          </div>
          {category === "jeux" && (
            <ul className="subcategory">
              {subcategory.jeux.map((item) => (
                <li key={item}>
                  <Link to={`/categorie/${item}`} className="subcategory-link">{item}</Link>
                </li>
              ))}
            </ul>
          )}
    
          <div className="category" onClick={() => toggleCategory("questions")}>
            <i className="bi bi-patch-question"></i>
            <span className="category-label">Questions et réponses</span>
            <i className={`bi ${category === "questions" ? "bi-chevron-up" : "bi-chevron-down"} arrow`}></i>
          </div>
          {category === "questions" && (
            <ul className="subcategory">
              {subcategory.questions.map((item) => (
                <li key={item}>
                  <Link to={`/categorie/${item}`} className="subcategory-link">{item}</Link>
                </li>
              ))}
            </ul>
          )}
    
          <div className="category" onClick={() => toggleCategory("tech")}>
            <i className="bi bi-laptop"></i>
            <span className="category-label">Technologie</span>
            <i className={`bi ${category === "tech" ? "bi-chevron-up" : "bi-chevron-down"} arrow`}></i>
          </div>
          {category === "tech" && (
            <ul className="subcategory">
              {subcategory.tech.map((item) => (
                <li key={item}>
                  <Link to={`/categorie/${item}`} className="subcategory-link">{item}</Link>
                </li>
              ))}
            </ul>
          )}
    
          <div className="category" onClick={() => toggleCategory("pop")}>
            <i className="bi bi-star-fill"></i>
            <span className="category-label">Pop Culture</span>
            <i className={`bi ${category === "pop" ? "bi-chevron-up" : "bi-chevron-down"} arrow`}></i>
          </div>
          {category === "pop" && (
            <ul className="subcategory">
              {subcategory.pop.map((item) => (
                <li key={item}>
                  <Link to={`/categorie/${item}`} className="subcategory-link">{item}</Link>
                </li>
              ))}
            </ul>
          )}
    
          <div className="category" onClick={() => toggleCategory("films")}>
            <i className="bi bi-film"></i>
            <span className="category-label">Films et Séries</span>
            <i className={`bi ${category === "films" ? "bi-chevron-up" : "bi-chevron-down"} arrow`}></i>
          </div>
          {category === "films" && (
            <ul className="subcategory">
              {subcategory.films.map((item) => (
                <li key={item}>
                  <Link to={`/categorie/${item}`} className="subcategory-link">{item}</Link>
                </li>
              ))}
            </ul>
          )}
        </aside>
      );
    }
    
export default Sidebar;