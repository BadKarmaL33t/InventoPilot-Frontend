import styles from "./AddToEntityModal.module.css";
import {privateAxios} from "../../../api/axios.js";
import {useLocation} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {SelectedItemContext} from "../../../context/SelectedItemContext.jsx";
import sortEntity from "../../../helpers/sortingFetchedEntity.js";

function AddToEntityModal({open, modalVisible}) {
    const {selectedItem} = useContext(SelectedItemContext);
    const [status, setStatus] = useState("idle");
    const [fetchedItems, setFetchedItems] = useState([]);
    const [fetchAttempted, setFetchAttempted] = useState(false);
    const {setSelectedItem} = useContext(SelectedItemContext);
    const location = useLocation();
    const entityPath = location.pathname;
    const [checkedItems, setCheckedItems] = useState([]);
    const [body, setBody] = useState({});
    const [addEntityPath, setAddEntityPath] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        setStatus("loading");

        async function fetchData() {
            const sortBy = "name";

            try {
                let fetchPaths = [];
                let entityTitles = [];

                if (entityPath === "/app/orders" || entityPath === "/app/locations") {
                    fetchPaths = ["/app/products", "/app/components", "/app/raws"];
                    entityTitles = ["Products", "Components", "Raws"];
                } else if (entityPath === "/app/products") {
                    fetchPaths = ["/app/components", "/app/raws"];
                    entityTitles = ["Components", "Raws"];
                }

                const fetchedData = await Promise.all(
                    fetchPaths.map(async (fetchPath, index) => {
                        const response = await privateAxios.get(fetchPath, {
                            signal: controller.signal,
                        });
                        const data = response.data;
                        const sortedItems = sortEntity(data, sortBy);
                        return {title: entityTitles[index], items: sortedItems};
                    })
                );

                setFetchedItems(fetchedData.flat());
                setStatus("idle");
            } catch (error) {
                if (controller.signal.aborted) {
                    console.error('Request geannuleerd:', error.message);
                } else {
                    console.error('Error fetching data:', error);
                    setStatus("error");
                }
            } finally {
                setFetchAttempted(true);
                controller.abort();
            }
        }

        if (!fetchAttempted) {
            fetchData().then();
        }
    }, [fetchAttempted, setSelectedItem, entityPath]);

    const handleCheckboxChange = (item) => {
        const isItemChecked = checkedItems.some((checkedItem) => checkedItem.name === item.name);

        if (isItemChecked) {
            // Remove the item if already selected
            setCheckedItems((prevCheckedItems) =>
                prevCheckedItems.filter((checkedItem) => checkedItem.name !== item.name)
            );
        } else {
            // Add the item if not already selected
            setCheckedItems((prevCheckedItems) => [...prevCheckedItems, item]);
        }
    };

    const handleAddItems = async () => {
        // Loop through selected items and send post requests
        for (const checkedItem of checkedItems) {
            try {
                await handlePostRequest(checkedItem);

                console.log(`Item ${checkedItem.name} added successfully!`);
            } catch (error) {
                console.error(`Error adding item ${checkedItem.name}:`, error);
            }
        }
        modalVisible(false);
        setStatus("idle");
        setSelectedItem(selectedItem);
    };

    const handlePostRequest = async (item) => {

        if (item.componentType) {
            setBody({
                name: item.name,

            });
            setAddEntityPath(`/app/products/${item.name}/components`);
        } else {
            setBody({
                name: item.name,
            });
            setAddEntityPath(`/app/products/${item.name}/raws`);
        }


        try {
            await privateAxios.patch(addEntityPath, body);
            console.log(`Item ${item.name} added successfully!`);
        } catch (error) {
            console.error(`Error adding item ${item.name}:`, error);
        }
    };

    return (
        <div className={`${styles["modal-background"]} modal-background-${open ? "visible" : "invisible"}`}>
            <div className={`${styles["modal-container"]} modal-container-${open ? "opened" : "closed"}`}>
                {status === "loading" && (
                    <p className={styles["loading"]}>
                        Loading...
                    </p>
                )}
                {status === "error" && (
                    <p className={styles["error"]}>
                        Something went wrong, please try again later.
                    </p>
                )}
                {status !== "loading" && (
                    <div>
                        {fetchedItems.map((category) => (
                            <div key={category.title} className={styles["item-list"]}>
                                <div className={styles["item-category"]}>
                                    <p className={styles["item-title"]}>{category.title}</p>
                                    {category.items.map((item) => (
                                        <label key={item.name} className={styles["item-label"]}>
                                            <input
                                                className={styles["checkbox"]}
                                                type="checkbox"
                                                value={item.name}
                                                checked={checkedItems.some((checkedItem) => checkedItem.name === item.name)}
                                                onChange={() => handleCheckboxChange(item)}
                                            />
                                            {item.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className={styles["button-row"]}>
                            <button
                                className={`${styles["modal-button"]} ${styles["modal-button-add"]}`}
                                id="add-button"
                                onClick={handleAddItems}
                            >
                                Add Item(s)
                            </button>
                            <button
                                className={`${styles["modal-button"]} ${styles["modal-button-cancel"]}`}
                                onClick={() => modalVisible(false)}
                            >
                                <span className={styles["button-text"]}>
                                    Cancel
                                </span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddToEntityModal;