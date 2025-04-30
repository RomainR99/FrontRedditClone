import "../Sidebar.css"

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-section">
                <h2>Communautés populaires</h2>
                <ul>
                    <li>
                        <span className="subreddit-rank">1</span>
                        <div className="subreddit-info">
                            <span className="subreddit-icon">r/</span>
                            <div className="subreddit-details">
                                <span className="subreddit-name">programming</span>
                                <span className="subreddit-members">4.2M membres</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span className="subreddit-rank">2</span>
                        <div className="subreddit-info">
                            <span className="subreddit-icon">r/</span>
                            <div className="subreddit-details">
                                <span className="subreddit-name">gaming</span>
                                <span className="subreddit-members">3.8M membres</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span className="subreddit-rank">3</span>
                        <div className="subreddit-info">
                            <span className="subreddit-icon">r/</span>
                            <div className="subreddit-details">
                                <span className="subreddit-name">movies</span>
                                <span className="subreddit-members">3.5M membres</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="sidebar-section">
                <h2>Ressources</h2>
                <ul>
                    <li><i className="bi bi-info-circle"></i> À propos</li>
                    <li><i className="bi bi-shield-check"></i> Règles</li>
                    <li><i className="bi bi-question-circle"></i> FAQ</li>
                    <li><i className="bi bi-envelope"></i> Contact</li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar