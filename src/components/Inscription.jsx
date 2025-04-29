import { useState } from "react";
import axios from "axios";
import "../index.css";

function Inscription() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleInscription = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', {
                email,
                username,
                password,
            });
            console.log(res.data);
        } catch (error) {
            console.error(error);
            
        }
    };

    return (
        <div className="app">
            <form onSubmit={handleInscription} className="form">
                <h2>Créer un compte</h2>
                <input 
                    type="email"
                    placeholder="Email"                   
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Mot de passe"                  
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-200">
                    S'inscrire
                </button>

            </form>
        </div>
    )
}

export default Inscription