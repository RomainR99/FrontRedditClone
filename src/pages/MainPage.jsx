import Navbar from "../components/Navbar.jsx";
import Sidebard from "../components/Sidebar.jsx";
import PostList from "../components/PostList.jsx";
import "../styles/MainPage.css"
import Suggestion from "../components/Suggestion.jsx";
import Footer from "../components/Footer.jsx";
import Posts from "../components/Posts.jsx";



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