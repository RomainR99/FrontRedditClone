import React, { useState, useEffect } from 'react';

const Comment = ({ postId }) => {
    // Déclarer un état pour les commentaires et un pour le texte du commentaire
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Utiliser useEffect pour appeler l'API et récupérer les commentaires
    useEffect(() => {
        fetch(`https://votre-api.com/posts/${postId}/comments`)
            .then(response => response.json())
            .then(data => {
                setComments(data);
            })
            .catch(error => console.error('Erreur:', error));
    }, [postId]);

    // Fonction pour gérer le changement dans le champ de texte
    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    // Fonction pour envoyer le commentaire à l'API
    const handleCommentSubmit = (event) => {
        event.preventDefault();

        if (!newComment.trim()) {
            // Ne pas envoyer si le commentaire est vide
            return;
        }

        const newCommentData = {
            postId,       // L'ID du post auquel le commentaire appartient
            content: newComment, // Le contenu du commentaire
            author: "Utilisateur connecté", // Remplacez par l'auteur réel
            date: new Date().toLocaleDateString(), // Date actuelle
        };

        // Envoi du commentaire à l'API
        fetch(`https://votre-api.com/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCommentData),
        })
            .then(response => response.json())
            .then(data => {
                // Ajouter le nouveau commentaire à l'état
                setComments(prevComments => [data, ...prevComments]);
                setNewComment(''); // Réinitialiser le champ de texte
            })
            .catch(error => console.error('Erreur:', error));
    };

    return (
        <div className="comments">
            <div className="comment-form">
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Écrivez un commentaire..."
                ></textarea>
                <button onClick={handleCommentSubmit}>Envoyer</button>
            </div>

            <div className="comment-list">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div className="comment" key={comment.id}>
                            <div className="comment-header">
                                <span className="comment-author">{comment.user}</span>
                                <span className="comment-date">{comment.date}</span>
                            </div>
                            <div className="comment-body">
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun commentaire à afficher.</p>
                )}
            </div>
        </div>
    );
};

export default Comment;

