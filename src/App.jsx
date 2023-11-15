import './App.css'
import AppLoaderSplash from "./components/appLoaderSplash/AppLoaderSplash.jsx";
import {Routes, Route} from 'react-router-dom';
import AuthNav from "./components/authNavigation/AuthNav.jsx";
import UserNav from "./components/userNavigation/UserNav.jsx"
import LoginModal from "./components/modals/loginModal/LoginModal.jsx";
import Home from "./pages/homepage/Home.jsx";
// import {AuthContext} from "./context/AuthContext.jsx";
// import {useContext} from "react";

function App() {
    // const { isAuth, isAdmin } = useContext(AuthContext);

    return (
        <div className="window-container">
            <AppLoaderSplash/>
            <div className="menu-container">
                <UserNav/>
            </div>
            <div className="page-container">
                <div className="navbar-container">
                    <AuthNav/>
                </div>
                <div className="content-outer-container">
                    <div className="content-left-inner-container">

                        {/*routes voor het linker frame hier tussen plaatsen*/}
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                        </Routes>
                        <Routes>
                            <Route path="/signin" element={<LoginModal/>}/>
                        </Routes>
                    </div>
                    <div className="content-right-inner-container">

                        {/*routes voor het rechter frame hier tussen plaatsen*/}

                    </div>
                </div>

                {/*voorbeeld routes*/}

                {/*<Routes>*/}
                {/*    <Route path="/" element={<Home/>}/>*/}
                {/*    <Route*/}
                {/*        path="/registerPage"*/}
                {/*        element={isAdmin ? <RegisterPage/> : <Home/>}/>*/}
                {/*    <Route path="/signin" element={<LoginModal/>}/>*/}
                {/*    <Route*/}
                {/*        path="/app/users/:username"*/}
                {/*        element={isAuth ? <UserDetails/> : <Home/>} />*/}
                {/*<Route path="/secure/admin/users" element={<Dashboard />}/>*/}

                {/*<Route*/}
                {/*    path="/orders"*/}
                {/*    element={isAuth ? <NewPost/> : <Home/>}*/}
                {/*/>*/}
                {/*<Route path="/posts/:postId" element={<PostDetail/>}/>*/}
                {/*</Routes>*/}
            </div>
        </div>
    )
}

export default App