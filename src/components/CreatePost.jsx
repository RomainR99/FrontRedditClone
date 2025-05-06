import { useState } from "react";
import "../CreatePost.css";

function CreatePost({onclose}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({title, content, image})
        onclose();
    }

    return (
        <div className="create-form-container">
            <form className="create-form" onSubmit={handleSubmit}>
                <h3>Créer un post</h3>
                <input 
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea 
                    placeholder="Contenu"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="4"
                />
                <input 
                    type="text" 
                    placeholder="Image (URL)"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <button type="submit">Publier</button>
                <button type="button" className="cancel" onClick={onclose}>Annuler</button>
            </form>
        </div>
    )
}

export default CreatePost