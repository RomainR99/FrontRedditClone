import { Link } from "react-router-dom"
import "../Navbar.css"

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
                <Link to={"/connexion"}>
                <button className="login-btn">Connexion</button>
                </Link>
            </div>
        </header>
    )
}

export default Navbar