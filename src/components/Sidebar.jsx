import "../styles/Sidebar.css";
import { useState } from "react";

function Sidebard() {
    const [category, setCategory] = useState(null)

    const toggleCategory = (cat) => {
        setCategory(category === cat ? null : cat)
    } 
    return (
        <aside className="sidebar">
            <h2 className="section-title">Catégories</h2>
            <div className="category" onClick={() => toggleCategory('internet')}>
                <i className="bi bi-emoji-smile"></i>
                <span className="category-label">Culture Internet</span>
                <i className={`bi ${category === 'internet' ? 'bi-chevron-up' : 'bi-chevron-down'} arrow`}></i>
            </div>
            {category === 'internet' && (
                <ul className="subcategory">
                    <li>Memes</li>
                    <li>Buzz</li>
                    <li>Animeaux</li>
                    <li>Humour</li>
                    <li>Satisfaisant</li>
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