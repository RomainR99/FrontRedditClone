import '../Suggestion.css';

function Suggestion() {
    return(
        <aside className="suggestions">
            <h2>Communautés</h2>
            <ul>
              <li>r/devweb <button>Rejoindre</button></li>
              <li>r/reactjs <button>Rejoindre</button></li>
              <li>r/anime <button>Rejoindre</button></li>
            </ul>
        </aside>
    )
}

export default Suggestion