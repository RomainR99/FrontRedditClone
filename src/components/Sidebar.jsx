import "../styles/Sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";


function Sidebard() {
    const [category, setCategory] = useState(null)

    const toggleCategory = (cat) => {
        setCategory(category === cat ? null : cat)
    } 
    const subcategory = {
        internet: ['Memes', 'Buzz', 'Animeaux', 'Humour', 'Satisfaisant'],
        jeux: ['Action', 'Aventure', 'E-sports', 'Mobiles', 'Rôle', 'Stratégie'],
        questions: ['Question/Réponse', 'Histoire/Confessions'],
        tech: ['Machine Learning', 'Informatique', 'Programmation', 'Intelligence Artificielle', 'Logiciel/Application', 'Eléctronique DIY'],
        pop: ['Célébrités', 'Artistes/Influenceurs', 'Podcasts', 'Streamers'],
        films: ['Films', 'Séries', 'Documentaires', 'Critiques', 'Bandes Annonces']
    };
    
    return (
        <aside className="sidebar">
            <h2 className="section-title">Catégories</h2>
            <div className="category" onClick={() => toggleCategory('internet')}>
                <i className="bi bi-emoji-smile"></i>
                <span className="category-label">Culture Internet</span>
                <i className={`bi ${category === 'internet' ? 'bi-chevron-up' : 'bi-chevron-down'} arrow`}></i>
            </div>
            {subcategory === 'internet' && (
            <ul className="subcategory">
                <li><Link to={`/categorie/categoriec`} className="subcategory-link">Meme</Link></li>
                <li><Link to={`/categorie/categoriec`} className="subcategory-link">Buzz</Link></li>
                <li><Link to={`/categorie/categoriec`} className="subcategory-link">Animeaux</Link></li>
                <li><Link to={`/categorie/categoriec`} className="subcategory-link">Humour</Link></li>
                <li><Link to={`/categorie/categoriec`} className="subcategory-link">Satisfaisant</Link></li>
            </ul>
            )}


            <div className="category" onClick={() => toggleCategory('jeux')}>
                <i className="bi bi-controller"></i>
                <span className="category-label">Jeux Vidéo</span>
                <i className={`bi ${category === 'jeux' ? 'bi-chevron-up' : 'bi-chevron-down'} arrow`}></i>
            </div>
            {category === 'jeux' && (
                <ul className="subcategory">
                    <li>Action</li>
                    <li>Aventure</li>
                    <li>E-sports</li>
                    <li>Mobiles</li>
                    <li>Rôle</li>
                    <li>Stratégie</li>
                </ul>
            )}

            <div className="category" onClick={() => toggleCategory('questions')}>
                <i className="bi bi-patch-question"></i>
                <span className="category-label">Questions et réponses</span>
                <i className={`bi ${category === 'questions' ? 'bi-chevron-up' : 'bi-chevron-down'} arrow`}></i>
            </div>
            {category === 'questions' && (
                <ul className="subcategory">
                    <li>Question/Réponse</li>
                    <li>Histoire/Confessions</li>
                </ul>
            )}

            <div className="category" onClick={() => toggleCategory('tech')}>
                <i className="bi bi-laptop"></i>
                <span className="category-label">Technologie</span>
                <i className={`bi ${category === 'tech' ? 'bi-chevron-up' : 'bi-chevron-down'} arrow`}></i>
            </div>
            {category === 'tech' && (
                <ul className="subcategory">
                    <li>Machine Learning</li>
                    <li>Informatique</li>
                    <li>Programmation</li>
                    <li>Intelligence Artificielle</li>
                    <li>Logiciel/Application</li>
                    <li>Eléctronique DIY</li>
                </ul>
            )}
            <div className="category" onClick={() => toggleCategory('pop')}>
                <i className="bi bi-star-fill"></i>
                <span className="category-label">Pop Culture</span>
                <i className={`bi ${category === 'pop' ? 'bi-chevron-up' : 'bi-chevron-down'} arrow`}></i>
            </div>
            {category === 'pop' && (
                <ul className="subcategory">
                    <li>Célébrités</li>
                    <li>Artistes/Influenceurs</li>
                    <li>Podcasts</li>
                    <li>Streamers</li>
                </ul>
            )}

            <div className="category" onClick={() => toggleCategory('films')}>
                <i className="bi bi-film"></i>
                <span className="category-label">Films et Séries</span>
                <i className={`bi ${category === 'films' ? 'bi-chevron-up' : 'bi-chevron-down'} arrow`}></i>
            </div>
            {category === 'films' && (
                <ul className="subcategory">
                    <li>Films</li>
                    <li>Séries</li>
                    <li>Documentaires</li>
                    <li>Critiques</li>
                    <li>Bandes Annonces</li>
                </ul>
            )}
        </aside>
    )
}

export default Sidebard