import { createContext, useContext, useEffect, useState } from "react";

// Création du contexte pour partager les données des posts dans toute l'application
const PostContext = createContext();

export function PostProvider({ children }) {
    // Initialisation de l'état `posts` à partir du localStorage si disponible
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('posts')
        return saved ? JSON.parse(saved) : [];
    });

    // Supprime un post en filtrant selon son index
    const deletePost = (indexToDelete) => {
        setPosts((prev) => prev.filter((_, index) => index !== indexToDelete))
    }

    // Sauvegarde automatique des posts dans le localStorage à chaque mise à jour
    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts))
    }, [posts])

    // Ajoute un nouveau post au début de la liste
    const addPost = (newPost) => {
        setPosts((prev) => [newPost, ...prev])
    }

    // Fournit les données et actions via le Provider
    return (
        <PostContext.Provider value={{ posts, addPost, deletePost}}>
            {children}
        </PostContext.Provider>
    )
}

// Hook personnalisé pour accéder facilement au contexte des posts
export function usePosts() {
    return useContext(PostContext)
}

