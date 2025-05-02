import "../styles/Navbar.css";

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <h1 className="logo">Reddit</h1>
            </div>

            <div className="navbar-center">
                <input type="text" placeholder="Rechercher..." className="search"/>
            </div>

            <div className="navbar-right">
                <button className="login-btn">Connexion</button>
            </div>
        </header>
    )
}

export default Navbar