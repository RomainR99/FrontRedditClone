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
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Créer un compte</h2>
                <input 
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Nom d'utilisateur"
                    className="w-full p-2 mb-4 border border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
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