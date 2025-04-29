import { useState } from "react";
import axios from "axios";
import "../index.css";

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleConnexion} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Se connecter</h2>
                {error && (
                    <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                        {error}
                    </div>
                )}
                <input 
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full p-2 mb-6 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
                    Se connecter
                </button>
            </form>
        </div>
    )
}

export default Connexion