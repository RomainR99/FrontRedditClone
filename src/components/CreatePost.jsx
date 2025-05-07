import { useState } from "react";
import { usePosts } from "./PostContext.jsx";
import "../CreatePost.css";

function CreatePost({onClose}) {
    const { addPost } = usePosts();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = { title, content, image }
        addPost(newPost)
        console.log({title, content, image})
        onClose();
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
                    type="file" 
                    accept="image/*"
                    placeholder="Image (URL)"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        const reader = new FileReader()
                        reader.onloadend = () => {
                            setImage(reader.result)
                        }
                        if (file) reader.readAsDataURL(file)
                    }}
                />
                <button type="submit">Publier</button>
                <button type="button" className="cancel" onClick={onClose}>Annuler</button>
            </form>
        </div>
    )
}

export default CreatePost