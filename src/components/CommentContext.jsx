import { createContext, useContext, useEffect, useState } from "react";

const CommentContext = createContext();

export function CommentProvider({ children }) {
    const [comments, setComments] = useState(() => {
        const saved = localStorage.getItem('comments')
        try {
            return saved && saved !== "undefined" ? JSON.parse(saved) : [];
        } catch (err) {
            console.error("Erreur JSON dans localStorage:", err);
            return [];
        }
    });

    const addComment = (postId, newComment) => {
        setComments(prev => ({
            ...prev,
            [postId]: [newComment, ...CommentContext(prev[postId] || [])]
        }))
    }

    const deleteComment = (postId, indexToDelete) => {
        setComments(prev => ({
            ...prev,
            [postId]: prev[postId].filter((_, index) => index !== indexToDelete) || []
        }))
    }

    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments))
    }, [comments])

    

    return (
        <CommentContext.Provider value={{ comments, addComment, deleteComment }}>
            {children}
        </CommentContext.Provider>
    )
}

export function useComments() {
    const context = useContext(CommentContext)
    if (!context) {
        throw new Error("useComments must be used within a CommentProvider")
    }
    return context
}