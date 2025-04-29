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
        <div className="min-h-screen flex items-center justify-content bg-gray-100">
            <form onSubmit={handleInscription} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2x1 font-bold mb-6 text-center">Créer un compte</h2>
                <input 
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Nom d'utilisateur"
                    className="w-full p-2 mb-4 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full p-2 mb-6 border rounded"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
                    S'inscrire
                </button>

            </form>
        </div>
    )
}

export default Inscription