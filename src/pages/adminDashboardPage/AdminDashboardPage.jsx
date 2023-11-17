import styles from "./AdminDashboardPage.module.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import logo from "../../assets/InventoPilotVector.png";
import {privateAxios} from "../../api/axios.js";
import DeleteModal from "../../components/modals/deleteModal/DeleteModal.jsx";
import {AdminUserContext} from "../../context/AdminUserContext.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [fetchAttempted, setFetchAttempted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [userToDelete, setUserToDelete] = useState(null);
    const [modalOpen, toggleModalOpen] = useState(false);
    const { setSelectedUser } = useContext(AdminUserContext);
    const { auth } = useContext(AuthContext)
    const [sortBy, setSortBy] = useState('username');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            try {
                const response = await privateAxios.get('/secure/admin/users', {
                    signal: controller.signal,
                });
                const data = response.data;

                // Sort users based on the selected criteria
                const sortedUsers = [...data].sort((a, b) => {
                    const valueA = a[sortBy];
                    const valueB = b[sortBy];

                    // Handle different types of values
                    if (valueA === valueB) {
                        return 0;
                    }

                    if (typeof valueA === 'string' && typeof valueB === 'string') {
                        return valueA.localeCompare(valueB);
                    }

                    return valueA < valueB ? -1 : 1;
                });

                setUsers(sortedUsers);
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

    async function handleDelete(user) {
        const controller = new AbortController();

        try {
            await privateAxios.delete(`/secure/admin/users/${user.username}`, {
                signal: controller.signal,
            });
            console.log(`${user.username} is successfully removed from the database`);
            navigate('/secure/admin/users');
        } catch (error) {
            if (controller.signal.aborted) {
                console.error('Request cancelled:', error.message);
            } else {
                console.error(error);
                navigate("/signin", { state: { from: location }, replace: true });
            }
        }
        controller.abort();
    }

    return (
        <>
            <div>
                <label htmlFor="sortDropdown">Sort by: </label>
                <select
                    id="sortDropdown"
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

            <ul className={styles["all-users"]}>
                {users.map((user) => (
                    <li key={user.username}>
                        <article className={styles["all-users__user"]}>
                            <div className={styles["user-wrapper"]}>
                            <span className={styles["dashboard-img-wrapper"]}>
                                <img src={logo} alt="profile-img" className={styles["dashboard-img"]}/>
                            </span>
                                <div className={styles["user-details-wrapper"]}>
                                    <h2>
                                        <Link to="/admin/users"
                                              className={styles["link__detail-link"]}
                                              onClick={() => setSelectedUser(user)}
                                        >
                                            {user.username}
                                        </Link>
                                    </h2>
                                    <p className={styles["full-name"]}> {user.firstname} {user.lastname} ({user.role})</p>
                                </div>
                                <button
                                    className={styles["admin-button-delete"]}
                                    onClick={() => {
                                        setUserToDelete(user);
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
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default AdminDashboard;