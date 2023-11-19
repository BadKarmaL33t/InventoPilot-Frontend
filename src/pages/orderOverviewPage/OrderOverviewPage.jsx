import styles from "./OrderOverviewPage.module.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import logo from "../../assets/InventoPilotVector.png";
import {privateAxios} from "../../api/axios.js";
import DeleteModal from "../../components/modals/deleteModal/DeleteModal.jsx";
import {SelectedItemContext} from "../../context/SelectedItemContext.jsx";
import sortEntity from "../../helpers/sortingFetchedEntity.js";
import formatEnum from "../../helpers/enumToCamelCase.js";

function OrderOverview() {
    const [fetchedItems, setFetchedItems] = useState([]);
    const [fetchAttempted, setFetchAttempted] = useState(false);
    const navigate = useNavigate();
    const [itemToDelete, setItemToDelete] = useState(null);
    const [modalOpen, toggleModalOpen] = useState(false);
    const {selectedItem, setSelectedItem} = useContext(SelectedItemContext);
    const [sortBy, setSortBy] = useState('username');
    const location = useLocation();
    const [entityPath, setEntityPath] = useState(location.pathname);

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

            await privateAxios.delete(`${entityPath}/${itemToDelete}`, {
                signal: controller.signal,
            });
            console.log(`${itemToDelete} is successfully removed from the database`);
            navigate('/loading');

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
            <div className={styles["order-panel"]}>
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
                        <option value="id">Order ID</option>
                        <option value="orderStatus">Order Status</option>
                    </select>
                </div>

                <button
                    className={styles["new-item-button"]}
                    type="button"
                    onClick={() => navigate(`${entityPath}/new`)}
                >
                    New Item
                </button>
            </div>

            <ul className={styles["all-orders"]}>
                {fetchedItems.map((fetchedItem) => (
                    <li key={fetchedItem.id}>
                        <article className={styles["all-orders__order"]}>
                            <div className={styles["order-container"]}>
                                {/*Hier komt later de barcode die kan worden uitvergroot door erop te klikken*/}
                                <span className={styles["order-img-wrapper"]}>
                                    <img src={logo} alt="order-barcode" className={styles["order-img"]}/>
                                </span>
                                <div className={styles["order-details-container"]}>
                                    <h2>
                                        <Link to={entityPath}
                                              className={styles["link__detail-link"]}
                                              onClick={() => setSelectedItem(fetchedItem)}
                                        >
                                            {fetchedItem.id}
                                        </Link>
                                    </h2>
                                    <p className={styles["order-key-details"]}> {fetchedItem.orderDate} {fetchedItem.deliveryDate} ({formatEnum(fetchedItem.orderStatus)})</p>
                                </div>
                            </div>
                            <button
                                className={styles["order-button-delete"]}
                                onClick={() => {
                                    setItemToDelete(fetchedItem.id);
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

export default OrderOverview;