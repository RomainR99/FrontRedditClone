import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Connexion.css";

function Connexion() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleConnexion = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            console.log(res.data);
        } catch (error) {
            console.error(error);
            setError('Erreur de connexion. Vérifiez vos identifiants.');
        }
    }

    return (
        <div className="connexion-page">
            <form onSubmit={handleConnexion} className="connexion-form">
                <h2 >Se connecter</h2>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                 <Link to={"/profile/brendan_pidoux"}>
                    <button type="submit">
                        Se connecter
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default Connexion