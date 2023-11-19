import styles from "./AdminDashboardPage.module.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import logo from "../../assets/InventoPilotVector.png";
import {privateAxios} from "../../api/axios.js";
import DeleteModal from "../../components/modals/deleteModal/DeleteModal.jsx";
import {SelectedUserContext} from "../../context/SelectedUserContext.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import sortEntity from "../../helpers/sortingFetchedEntity.js";
import formatEnum from "../../helpers/enumToCamelCase.js";

function AdminDashboard() {
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [fetchAttempted, setFetchAttempted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [userToDelete, setUserToDelete] = useState(null);
    const [modalOpen, toggleModalOpen] = useState(false);
    const {setSelectedUser} = useContext(SelectedUserContext);
    const {auth} = useContext(AuthContext)
    const [sortBy, setSortBy] = useState('username');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            try {
                const response = await privateAxios.get('/secure/admin/users', {
                    signal: controller.signal,
                });
                const data = response.data;
                const sortedUsers = sortEntity(data, sortBy);

                setFetchedUsers(sortedUsers);
                setFetchAttempted(true);

                // Automatically select the top user
                if (sortedUsers.length > 0) {
                    setSelectedUser(sortedUsers[0]);
                }
            } catch (error) {
                if (controller.signal.aborted) {
                    console.error('Request geannuleerd:', error.message);
                } else {
                    console.error('Error fetching data:', error);
                    setFetchAttempted(true);
                }
            }
            controller.abort();
        }

        if (!fetchAttempted) {
            fetchData().then();
        }
    }, [fetchAttempted, auth, sortBy, setSelectedUser]);

    async function handleDelete(userToDelete) {
        const controller = new AbortController();

        try {
            await privateAxios.delete(`/secure/admin/users/${userToDelete}`, {
                signal: controller.signal,
            });
            console.log(`${userToDelete} is successfully removed from the database`);
            navigate('/loading');
        } catch (error) {
            if (controller.signal.aborted) {
                console.error('Request cancelled:', error.message);
            } else {
                console.error(error);
                navigate("/signin", {state: {from: location}, replace: true});
            }
        }
        controller.abort();
    }

    return (
        <>
            <div className={styles["admin-panel"]}>
                <div className={styles["sort-dropdown"]}>
                    <label htmlFor="sort-dropdown-menu">Sort by: </label>
                    <select
                        id="sort-dropdown-menu"
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            setFetchAttempted(false); // Set to false to trigger re-fetch
                        }}
                        value={sortBy}
                    >
                        <option value="username">Username</option>
                        <option value="firstname">First Name</option>
                        <option value="lastname">Last Name</option>
                        <option value="role">Role</option>
                    </select>
                </div>
                <button
                    className={styles["new-user-button"]}
                    type="button"
                    onClick={() => navigate('/admin/users/register')}
                >
                    New User
                </button>
            </div>

            <ul className={styles["all-users"]}>
                {fetchedUsers.map((fetchedUser) => (
                    <li key={fetchedUser.username}>
                        <article className={styles["all-users__user"]}>
                            <div className={styles["user-container"]}>
                                <span className={styles["dashboard-img-wrapper"]}>
                                    <img src={logo} alt="profile-img" className={styles["dashboard-img"]}/>
                                </span>
                                <div className={styles["user-details-container"]}>
                                    <h2>
                                        <Link to="/admin/users"
                                              className={styles["link__detail-link"]}
                                              onClick={() => setSelectedUser(fetchedUser)}
                                        >
                                            {fetchedUser.username}
                                        </Link>
                                    </h2>
                                    <p className={styles["full-name"]}> {fetchedUser.firstname} {fetchedUser.lastname} ({formatEnum(fetchedUser.role)})</p>
                                </div>
                            </div>
                            <button
                                className={styles["admin-button-delete"]}
                                onClick={() => {
                                    setUserToDelete(fetchedUser.username);
                                    toggleModalOpen(true);
                                }}
                            >
                                Delete
                            </button>

                            {modalOpen &&
                                <DeleteModal
                                    open={modalOpen}
                                    modalVisible={toggleModalOpen}
                                    handleDelete={() => handleDelete(userToDelete)}
                                />
                            }
                        </article>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default AdminDashboard;