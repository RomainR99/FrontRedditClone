import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Connexion.css";

const fakeUSer = {
    email: "fake@gmail.com",
    username: "fakeUser",
    id: 1,
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    karmaPost: 1,
    karmaComment: 0,
    cakeDay: "2023-10-01",
    achievements: [' Banana Baby', 'Hometown Hero', 'Feed Finder']
}

const fakejwt = "fake-jwt-token";

const fakeBackLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!email || !password) {
                reject({ message: "Email and password are required" });
                return;
            }
            const isSuccess = Math.random() > 0.5; // Simulate a 50% chance of success
            if (isSuccess) {
                resolve({ jwt: fakejwt, user: fakeUSer, message: "Login successful" });
            } else {
                reject({ message: "Login failed" });
            }
        }, 1000);
    });
}

function Connexion() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleConnexion = async (e) => {
        e.preventDefault()
        try {
            const res = await fakeBackLogin(email, password);
            console.log(res.user);
            console.log(res.jwt);
            setError('')
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
                    <input type="submit" value="Se connecter"/>
            </form>
        </div>
    )
}

export default Connexion