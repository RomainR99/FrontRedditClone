import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

export function PostProvider({ children }) {
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('posts')
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts))
    }, [posts])

    const addPost = (newPost) => {
        setPosts((prev) => [newPost, ...prev])
    }

    return (
        <PostContext.Provider value={{ posts, addPost}}>
            {children}
        </PostContext.Provider>
    )
}

export function usePosts() {
    return useContext(PostContext)
}