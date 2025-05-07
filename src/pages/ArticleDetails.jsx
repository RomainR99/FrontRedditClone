import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArticleDetails = ({ comment, onClose, onCommentUpdated }) => {
    const [updatedComment, setUpdatedComment] = useState(comment?.commentaire || '');

    
      const handleUpdate = async () => {
        try {
          const token = localStorage.getItem('token');
    
          const response = await fetch(`http://localhost:1337/api/comments/${comment.documentId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              data: {
                commentaire: updatedComment,
              },
            }),
          });
    
          if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
          }
    
          const result = await response.json();
          onCommentUpdated(result.data);
          onClose(); // ferme la modale après mise à jour réussie
        } catch (error) {
          console.error('Erreur lors de la mise à jour du commentaire :', error);
        }
      };
    
      return (
        <div>
          <h2>Modifier le commentaire</h2>
          <textarea
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
          />
          <div>
            <button onClick={onClose}>Annuler</button>
            <button
              onClick={handleUpdate}
              disabled={!updatedComment.trim()}
            >
              Enregistrer
            </button>
          </div>
        </div>
      );
    };
export default ArticleDetails;



