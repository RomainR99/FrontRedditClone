import Navbar from "./Navbar.jsx";
import Sidebard from "./Sidebar.jsx";
import PostList from "./PostList.jsx";
import "../Mainpage.css"
import Suggestion from "./Suggestion.jsx";


function MainPage() {
    return (
        <>
            <Navbar/>
            <div className="main-layout">
                <Sidebard/>
                <PostList/>
                <Suggestion/>
            </div>
        </>
    )
}

export default MainPage