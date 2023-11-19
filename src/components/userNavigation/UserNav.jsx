import styles from './UserNav.module.css';
import {useContext, useState} from "react";
import {NavLink} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import logo from '../../assets/InventoPilotVector.png';

function AuthNav() {
    const { isAuth, isAdmin, user } = useContext(AuthContext);
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
                        {/*To be added later:*/}
                        {/*<li>*/}
                        {/*    <NavLink*/}
                        {/*        className={styles["link_nav-menu"]}*/}
                        {/*        to="/app/dashboard">*/}
                        {/*        Dashboard*/}
                        {/*    </NavLink>*/}
                        {/*</li>*/}
                        <li>
                            <NavLink
                                className={styles["link_nav-menu"]}
                                to="/app/orders">
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
                                        to="/app/products">
                                        Products
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={`${styles["link_nav-menu"]} ${styles["link_nav-menu-item"]}`}
                                        to="/app/components">
                                        Components
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={`${styles["link_nav-menu"]} ${styles["link_nav-menu-item"]}`}
                                        to="/app/raws">
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
                                to={`/app/users/${user.username}`}>
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