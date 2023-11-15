import './App.css'
import AppLoaderSplash from "./components/appLoaderSplash/AppLoaderSplash.jsx";
import {Routes, Route} from 'react-router-dom';
// import Home from "./pages/homepage/Home.jsx";
// import Register from "./components/register/Register.jsx"
import AuthNav from "./components/authNavigation/AuthNav.jsx";
import UserNav from "./components/userNavigation/UserNav.jsx"
import Login from "./components/login/Login.jsx";
// import {AuthContext} from "./context/AuthContext.jsx";
// import {useContext} from "react";
// import UserDetails from "./pages/userDetailsPage/UserDetailsPage.jsx";

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
                            <Route path="/" element={<Login/>}/>
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
                {/*        path="/register"*/}
                {/*        element={isAdmin ? <Register/> : <Home/>}/>*/}
                {/*    <Route path="/signin" element={<Login/>}/>*/}
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