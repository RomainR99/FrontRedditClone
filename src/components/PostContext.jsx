import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

export function PostProvider({ children }) {
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('posts')
        return saved ? JSON.parse(saved) : [];
    });

    const deletePost = (indexToDelete) => {
        setPosts((prev) => prev.filter((_, index) => index !== indexToDelete))
    }

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts))
    }, [posts])

    const addPost = (newPost) => {
        setPosts((prev) => [newPost, ...prev])
    }

    return (
        <PostContext.Provider value={{ posts, addPost, deletePost}}>
            {children}
        </PostContext.Provider>
    )
}

export function usePosts() {
    return useContext(PostContext)
}

