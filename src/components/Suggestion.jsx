import { useState } from 'react';
import '../Suggestion.css';

function Suggestion() {
    const [joinedCommunities, setJoinedCommunities] = useState([]);

    const communities = ["devweb", "reactjs", "anime"];

    const handleJoin = (community) => {
        if (!joinedCommunities.includes(community)) {
            setJoinedCommunities([...joinedCommunities, community])
        }
    }
    return(
        <>
            <aside className="suggestions">
                <h2>Communautés</h2>
                <ul>
                  {communities.map((community) => (
                    <li key={community}>
                        r/{community}{" "}
                        <button onClick={() => handleJoin(community)} disabled={joinedCommunities.includes(community)}>
                            {joinedCommunities.includes(community) ? "Rejoint" : "Rejoindre"}
                        </button>
                    </li>
                  ))}
                </ul>
            </aside>
        </>
    )
}

export default Suggestion