import styles from "./ItemOverviewPage.module.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import logo from "../../assets/InventoPilotVector.png";
import {privateAxios} from "../../api/axios.js";
import DeleteModal from "../../components/modals/deleteModal/DeleteModal.jsx";
import {SelectedItemContext} from "../../context/SelectedItemContext.jsx";
import sortEntity from "../../helpers/sortingFetchedEntity.js";
import formatEnum from "../../helpers/enumToCamelCase.js";

function ItemOverview() {
    const [fetchedItems, setFetchedItems] = useState([]);
    const [fetchAttempted, setFetchAttempted] = useState(false);
    const navigate = useNavigate();
    const [itemToDelete, setItemToDelete] = useState(null);
    const [modalOpen, toggleModalOpen] = useState(false);
    const {selectedItem, setSelectedItem} = useContext(SelectedItemContext);
    const [sortBy, setSortBy] = useState('username');
    const location = useLocation();
    const [entityPath, setEntityPath] = useState(location.pathname);
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            try {
                const response = await privateAxios.get(entityPath, {
                    signal: controller.signal,
                });
                const data = response.data;
                const sortedItems = sortEntity(data, sortBy);

                setFetchedItems(sortedItems);
                setFetchAttempted(true);

                // Automatically select the top user
                if (sortedItems.length > 0) {
                    setSelectedItem(sortedItems[0]);
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
    }, [fetchAttempted, sortBy, selectedItem, setSelectedItem, entityPath]);

    useEffect(() => {
        setEntityPath(location.pathname);
        setFetchAttempted(false);
    }, [location.pathname]);

    async function handleDelete(itemToDelete) {
        const controller = new AbortController();
        console.log(`${entityPath}/${itemToDelete}`)
        try {
            const checkItem = await privateAxios.get(`${entityPath}/${itemToDelete}`, {
                signal: controller.signal,
            });
            const { locations, raw, components, products } = checkItem.data;

            // Check if the properties are present and have a length greater than zero
            if (
                locations ||
                products ||
                components ||
                raw
            ) {
                // If related items exist, do not proceed with deletion
                setDeleteError(`Cannot delete ${itemToDelete} because related items exist.`);
                setTimeout(() => {
                    setDeleteError(null);
                }, 6000);
            } else {
                // If no related items, proceed with deletion
                await privateAxios.delete(`${entityPath}/${itemToDelete}`, {
                    signal: controller.signal,
                });
                console.log(`${itemToDelete} is successfully removed from the database`);
                navigate('/loading');
            }
        } catch (error) {
            if (controller.signal.aborted) {
                console.error('Request cancelled:', error.message);
            } else {
                console.error(error);
            }
        }
        controller.abort();
    }

    return (
        <>
            <div className={styles["item-panel"]}>
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
                        <option value="name">Item Name</option>
                        <option value="type">Type</option>
                        <option value="stock">Current Stock</option>
                        <option value="status">Status</option>
                    </select>
                </div>
                <small className={styles["delete-error"]}>{deleteError}</small>
                <button
                    className={styles["new-item-button"]}
                    type="button"
                    onClick={() => navigate(`${entityPath}/new`)}
                >
                    New Item
                </button>
            </div>

            <ul className={styles["all-items"]}>
                {fetchedItems.map((fetchedItem) => (
                    <li key={fetchedItem.name}>
                        <article className={styles["all-items__item"]}>
                            <div className={styles["item-container"]}>
                                <span className={styles["item-img-wrapper"]}>
                                    <img src={logo} alt="item-img" className={styles["item-img"]}/>
                                </span>
                                <div className={styles["item-details-container"]}>
                                    <h2>
                                        <Link to={entityPath}
                                              className={styles["link__detail-link"]}
                                              onClick={() => setSelectedItem(fetchedItem)}
                                        >
                                            {fetchedItem.name}
                                        </Link>
                                    </h2>
                                    <p className={styles["item-key-details"]}> {fetchedItem.type} {fetchedItem.stock} ({formatEnum(fetchedItem.productStatus)})</p>
                                </div>
                            </div>
                            <button
                                className={styles["item-button-delete"]}
                                onClick={() => {
                                    setItemToDelete(fetchedItem.name);
                                    toggleModalOpen(true);
                                }}
                            >
                                Delete
                            </button>

                            {modalOpen &&
                                <DeleteModal
                                    open={modalOpen}
                                    modalVisible={toggleModalOpen}
                                    handleDelete={() => handleDelete(itemToDelete)}
                                />
                            }
                        </article>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ItemOverview;