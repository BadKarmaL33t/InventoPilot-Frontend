import styles from './UserNav.module.css';
import logo from '../../assets/InventoPilotVector.png';
import {useContext, useState} from "react";
import {NavLink} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {SelectedUserContext} from "../../context/SelectedUserContext.jsx";

function AuthNav() {
    const { isAuth, isAdmin, user } = useContext(AuthContext);
    const { setSelectedUser } = useContext(SelectedUserContext);
    const [showItemList, toggleShowItemList] = useState(false)

    function handleItemClick() {
        toggleShowItemList(!showItemList)
    }

    return (
        <nav className={styles["user-nav-container"]}>
            <ul className={styles["user-nav-list"]}>
                { isAuth ?
                    <>
                        <span className={styles["menu-img-wrapper"]}>
                            <img src={logo} alt="profile-img" className={styles["menu-img"]}/>
                        </span>
                        <li>
                            <p className={styles["menu-title"]}>Navigation</p>
                        </li>
                        <li>
                            <NavLink
                                className={styles["link_nav-menu"]}
                                to="/dashboard">
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={styles["link_nav-menu"]}
                                to="/orders">
                                Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={styles[`link_nav-menu${!showItemList ? "-active" : ""}`]}
                                to={window.location.pathname} // to maintain the exact same look of the menu item
                                onClick={handleItemClick} >
                                Items
                            </NavLink>
                        </li>
                        {showItemList &&
                            <>
                                <li>
                                    <NavLink
                                        className={`${styles["link_nav-menu"]} ${styles["link_nav-menu-item"]}`}
                                        to="/products">
                                        Products
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={`${styles["link_nav-menu"]} ${styles["link_nav-menu-item"]}`}
                                        to="/components">
                                        Components
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={`${styles["link_nav-menu"]} ${styles["link_nav-menu-item"]}`}
                                        to="/raws">
                                        Raw Materials
                                    </NavLink>
                                </li>
                            </>
                        }
                        <li>
                            <p className={styles["menu-title"]}>User</p>
                        </li>
                        <li>
                            <NavLink
                                className={styles["link_nav-menu"]}
                                to={`/app/users/${user.username}`}
                                onClick={setSelectedUser(user)}>
                                Profile
                            </NavLink>
                        </li>
                    </>
                    :
                    <>
                    </>
                }
                { isAdmin ?
                        <>
                            <li>
                                <p className={styles["menu-title"]}>Admin</p>
                            </li>
                            <li>
                                <NavLink
                                    className={styles["link_nav-menu"]}
                                    to="/admin/users">
                                    Admin Dashboard
                                </NavLink>
                            </li>
                        </>
                        :
                        <>
                        </>
                }
            </ul>
        </nav>
    );
}

export default AuthNav;