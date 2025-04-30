import "../Sidebar.css"

function Sidebard() {
    return (
        <aside className="sidebar">
            <h2>Catégories</h2>
            <ul>
                <li><i class="bi bi-chat-fill"></i> Discussions</li>
                <li><i class="bi bi-controller"></i> Jeux</li>
                <li><i class="bi bi-book-half"></i> Mangas</li>
                <li><i class="bi bi-star"></i> Pop Culture</li>
                <li><i class="bi bi-film"></i> Film et Séries</li>
            </ul>
        </aside>
    )
}

export default Sidebard