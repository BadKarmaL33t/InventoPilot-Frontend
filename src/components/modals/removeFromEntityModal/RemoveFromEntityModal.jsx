import styles from "./RemoveFromEntityModal.module.css";
import {privateAxios} from "../../../api/axios.js";
import {useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {SelectedItemContext} from "../../../context/SelectedItemContext.jsx";

function RemoveFromEntityModal({open, modalVisible}) {
    const {selectedItem, setSelectedItem} = useContext(SelectedItemContext);
    const [status, setStatus] = useState("idle");
    const [checkedItems, setCheckedItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedItem(selectedItem);
    }, [selectedItem, setSelectedItem]);

    const handleCheckboxChange = (itemName, type) => {
        const isItemChecked = checkedItems.some((checkedItem) => checkedItem.name === itemName);

        if (isItemChecked) {
            // Remove the item if already selected
            setCheckedItems((prevCheckedItems) =>
                prevCheckedItems.filter((checkedItem) => checkedItem.name !== itemName)
            );
        } else {
            // Add the item if not already selected
            setCheckedItems((prevCheckedItems) => [...prevCheckedItems, { name: itemName, type }]);
        }
    };

    const handleDeleteItems = async () => {
        setStatus("loading");
        // Loop through selected items and send post requests
        for (const checkedItem of checkedItems) {
            try {
                await handleDeleteRequest(checkedItem);

                console.log(`Item ${checkedItem.name} added successfully!`);
            } catch (error) {
                console.error(`Error adding item ${checkedItem.name}:`, error);
            }
        }
        modalVisible(false);
        setStatus("idle");
        navigate("/loading")
        setSelectedItem(selectedItem);
    };

    const handleDeleteRequest = async (itemName, type) => {
        const controller = new AbortController();
        let addEntityPath;

        if (type === "component") {
            addEntityPath = `/app/products/${selectedItem.name}/components/${itemName}`;
        } else {
            addEntityPath = `/app/products/${selectedItem.name}/raw/${itemName}`;
        }

        try {
            await privateAxios.delete(addEntityPath,
                {
                    signal: controller.signal,
                });
            console.log(`Item ${itemName} added successfully!`);
        } catch (error) {
            if (controller.signal.aborted) {
                console.error('Request geannuleerd:', error.message);
            } else {
                console.error(`Error adding item ${itemName}:`, error);
            }
            controller.abort();
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
                    <>
                        <p className={styles["error"]}>
                            Something went wrong, please try again later.
                        </p>
                        <button
                            className={`${styles["modal-button"]} ${styles["modal-button-cancel"]}`}
                            onClick={() => modalVisible(false)}
                        >
                                <span className={styles["button-text"]}>
                                    Cancel
                                </span>
                        </button>
                    </>
                )}
                {status === "idle" && (
                    <div className={styles["item-relations"]}>
                        <h3>Related items:</h3>

                        {selectedItem.rawMaterialName && (
                            <div>
                                <p>Raw Material:</p>
                                <label key={selectedItem.rawMaterialName} className={styles["item-label"]}>
                                    <input
                                        className={styles["checkbox"]}
                                        type="checkbox"
                                        value={selectedItem.rawMaterialName}
                                        checked={checkedItems.some((checkedItem) => checkedItem.name === selectedItem.rawMaterialName)}
                                        onChange={() => handleCheckboxChange(selectedItem.rawMaterialName, "raw")}
                                    />
                                    {selectedItem.rawMaterialName}
                                </label>
                            </div>
                        )}

                        {selectedItem.componentNames && selectedItem.componentNames.length > 0 && (
                            <div>
                                <p>Components:</p>

                                {selectedItem.componentNames.map((componentName) => (
                                    <label key={componentName} className={styles["item-label"]}>
                                        <input
                                            className={styles["checkbox"]}
                                            type="checkbox"
                                            value={componentName}
                                            checked={checkedItems.some((checkedItem) => checkedItem.name === componentName)}
                                            onChange={() => handleCheckboxChange(componentName, "component")}
                                        />
                                        {componentName}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <div className={styles["button-row"]}>
                    <button
                        className={`${styles["modal-button"]} ${styles["modal-button-delete"]}`}
                        id="add-button"
                        onClick={handleDeleteItems}
                    >
                        Remove Item(s)
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
        </div>
    );
}

export default RemoveFromEntityModal;