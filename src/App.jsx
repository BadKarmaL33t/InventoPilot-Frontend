import './App.css'
import AppLoaderSplash from "./components/appLoaderSplash/AppLoaderSplash.jsx";
import {Routes, Route, useLocation} from 'react-router-dom';
import AuthNav from "./components/authNavigation/AuthNav.jsx";
import UserNav from "./components/userNavigation/UserNav.jsx"
import {useEffect, useState} from "react";
import AppViewport from "./components/appViewport/AppViewport.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";
import UpdateModal from "./components/modals/updateModal/UpdateModal.jsx";

function App() {
    const { isAuth, isAdmin, user } = useContext(AuthContext);
    const location = useLocation();
    const [pagePath, setPagePath] = useState(location.pathname);

    useEffect(() => {
        setPagePath(location.pathname);
    }, [location.pathname]);

    return (
        <div className="window-container">
            {/*<AppLoaderSplash/>*/}

            <div className="menu-container">
                <UserNav/>
            </div>
            <div className="page-container">
                <div className="navbar-container">
                    <AuthNav/>
                </div>
                <div className="content-outer-container">
                    <Routes>
                        <Route path="/" element={<AppViewport page={pagePath}/>}/>
                        <Route path="/loading" element={<UpdateModal page={pagePath}/>}/>
                        {isAuth &&
                            <>
                                <Route path="/app/dashboard" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/orders" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/orders/:id" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/orders/new" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/products" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/products/:productName" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/products/new" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/components" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/components/:name" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/components/new" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/raws" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/raws/:name" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/raws/new" element={<AppViewport page={pagePath}/>}/>
                                <Route path={`/app/users/${user.username}`} element={<AppViewport page={pagePath}/>}/>
                            </>
                        }
                        {isAdmin &&
                        <>
                            <Route path="/admin/users" element={<AppViewport page={pagePath}/>}/>
                            <Route path="/admin/users/register" element={<AppViewport page={pagePath}/>}/>
                        </>
                        }
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;




{/*voorbeeld routes*/
}

{/*<Routes>*/
}


{/*    <Route path="/signin" element={<UpdateModal/>}/>*/
}
{/*    <Route*/
}
{/*        path="/app/users/:username"*/
}
{/*        element={isAuth ? <UserDetails/> : <Home/>} />*/
}
{/*<Route path="/secure/admin/users" element={<Dashboard />}/>*/
}
{/*<Route path="/registerPage"*/
}
{/*element={isAdmin ? <RegisterPage/> : <Home/>}/>*/
}

{/*<Route*/
}
{/*    path="/orders"*/
}
{/*    element={isAuth ? <NewPost/> : <Home/>}*/
}
{/*/>*/
}
{/*<Route path="/posts/:postId" element={<PostDetail/>}/>*/
}
{/*</Routes>*/
}