import Navbar from "./Navbar.jsx";
import Sidebard from "./Sidebar.jsx";
import PostList from "./PostList.jsx";
import "../styles/MainPage.css"
import Suggestion from "./Suggestion.jsx";
import Footer from "./Footer.jsx";
import Posts from "./Posts.jsx";


function MainPage() {
    return (
        <>
            <Navbar/>
            <div className="main-layout">
                <Sidebard/>
                <div className="center-layout">
                <PostList/>
                <Posts/>
                </div>
                <Suggestion/>
            </div>
            <Footer/>
        </>
    )
}

export default MainPage