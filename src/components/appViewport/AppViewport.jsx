import Home from "../../pages/homepage/Home.jsx";
import PresentationPage from "../../pages/presentationPage/PresentationPage.jsx";
import AdminDashboard from "../../pages/adminDashboardPage/AdminDashboardPage.jsx";
import UserDetails from "../../pages/userDetailsPage/UserDetailsPage.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function AppViewport({ page }) {
    const { isAuth, isAdmin } = useContext(AuthContext);

    return (
        <>
            {page === "/" &&
                <div className="content-outer-container">
                    <div className="content-left-inner-container">
                        <Home />
                    </div>
                    <div className="content-right-inner-container">
                        <PresentationPage />
                    </div>
                </div>
            }

            { page === "/admin/users" && isAdmin && (
                <div className="content-outer-container">
                    <div className="content-left-inner-container">
                        <AdminDashboard />
                    </div>
                    <div className="content-right-inner-container">
                        <UserDetails />
                    </div>
                </div>
            )}
        </>
    );
}

export default AppViewport;