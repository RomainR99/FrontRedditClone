import PostCard from "./PostCard";
import "../Profile.css";
import { useParams } from "react-router-dom";

const fakeUsers = {
    brendan_pidoux: {
        avatar: "https://i.etsystatic.com/20335141/r/il/eb2b91/3883806172/il_570xN.3883806172_mk03.jpg",
        banner: "https://preview.redd.it/i-think-i-like-posting-selfies-on-reddit-too-much-v0-0b32spbi41ob1.jpg?width=640&crop=smart&auto=webp&s=7f60363157bc6721b69c511de368b31473cbefc8",
        bio: "Étudiant en dev web, passionné de React & IA",
        stats: { posts: 10, followers: 1500, karma: 4200},
        posts: [
            {
                title: "Mon premier post",
                content: "Bienvenue sur mon profil !",
            },
            {
                title: "Je teste les profils dynamiques",
                content: "C’est trop bien.",
            },
        ],
    },
    julie_dev: {
        avatar: "https://i.etsystatic.com/20335141/r/il/eb2b91/3883806172/il_570xN.3883806172_mk03.jpg",
        banner: "https://preview.redd.it/i-think-i-like-posting-selfies-on-reddit-too-much-v0-0b32spbi41ob1.jpg?width=640&crop=smart&auto=webp&s=7f60363157bc6721b69c511de368b31473cbefc8",
        bio: "Développeuse front-end, passionnée de design et d'UX.",
        stats: { posts: 8, followers: 800, karma: 2100 },
        posts: [
            {
                title: "Mon dernier projet",
                content: "J'ai créé un site web pour un client.",
            },
            {
                title: "Conseils de design",
                content: "Comment améliorer l'UX de votre site ?",
            },
        ],
    }
}


function Profile() {
    const { username } = useParams()
    const user = fakeUsers[username]

    if (!user) return <h2 style={{ color: 'white', padding: '2rem' }}>Utilisateur introuvable</h2>
    return (
        <div className="profile-page">
            <div className="profile-header">
                <img className="profile-banner" src="https://preview.redd.it/i-think-i-like-posting-selfies-on-reddit-too-much-v0-0b32spbi41ob1.jpg?width=640&crop=smart&auto=webp&s=7f60363157bc6721b69c511de368b31473cbefc8" alt="Bannière" />
                <div className="profile-info">
                    <img className="" src="https://i.etsystatic.com/20335141/r/il/eb2b91/3883806172/il_570xN.3883806172_mk03.jpg" alt="Avatar"/>
                    <div>
                        <h2>@{username}</h2>
                        <p>{user.bio}</p>
                        <div className="stats">
                            <span>{user.stats.posts} post</span>
                            <span>{user.stats.followers} abonnées</span>
                            <span>{user.stats.karma} karma</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-posts">
                {user.posts.map((post, i) => (
                    <PostCard key={i} title={post.title} content={post.content} />
                ))}
            </div>
        </div>
    )
}

export default Profile