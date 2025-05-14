import { useParams } from "react-router-dom";
import { usePosts } from "./PostContext.jsx";
import { useComments } from "./CommentContext.jsx";
import Navbar from "./Navbar.jsx";
import "../CommentPage.css";


function CommentPage() {
    const {postId} = useParams();
    const { posts } = usePosts();
    const { comments } = useComments();
    

    const post = posts[postId];

    if (!post) {
        return <p>Post not found</p>;
    }

    const postComments = comments.filter(c => c.postId === Number(postId))
    
    return (
        <>
            <Navbar/>
            <div className="comment-page">
                <h2>{post.title}</h2>
                {post.image && <img src={post.image} alt="post" style={{maxWidth: "100%"}}/>}
                <p>{post.content}</p>

                <h3>Commentaires: </h3>
                <ul>
                    {postComments.length === 0 ? (
                        <li>Aucun commentaire pour ce post.</li>
                    ) : (
                        postComments.map((comment, index) => (
                            <li key={index}>{comment.text}</li>
                        ))
                    )}
                </ul>
            </div>
        </>
    )
}

export default CommentPage