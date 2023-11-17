import styles from "./ItemDetailsPage.module.css";
import {useContext, useState} from "react";
import {SelectedItemContext} from "../../context/SelectedItemContext.jsx";
import {privateAxios} from "../../api/axios.js";
import Input from "../../components/input/Input.jsx";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";

function ItemDetails() {
    const {handleSubmit, formState: {errors, isDirty, isValid}, register} = useForm({mode: 'onChange'});
    const INPUT_REGEX = /^[a-zA-Z]*[a-zA-Z0-9-_]{2,25}$/;
    const NUMBER_REGEX = /^[0-9]*$/;
    const {selectedItem, setSelectedItem} = useContext(SelectedItemContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [editModes, setEditModes] = useState({
        name: false,
        productType: false,
        componentType: false,
        stock: false,
        productStatus: false,
        minimalStock: false,
        maximalStock: false,
        serialNumber: false,
        batchNumber: false,
    });

    {/*private String name;*/}
    {/*private ProductType type;*/}
    {/*private int stock;*/}
    {/*private ProductStatus productStatus;*/}
    {/*private int sold;*/}
    {/*private int used;*/}
    {/*private String serialNumber;*/}
    // private String batchNumber;
    {/*private int minimalStock;*/}
    {/*private int maximalStock;*/}
    {/*private Set<Location> locations;*/}
    {/*private RawMaterial raw;*/}
    {/*private Set<ProductComponent> components;*/}
    // private Set<Product> products;

    const toggleEditMode = (field) => {
        setEditModes({
            ...editModes,
            [field]: !editModes[field],
        });
    };

    async function handleFormSubmit(data) {
        const {name, productType, componentType, stock, productStatus, minimalStock, maximalStock, serialNumber, batchNumber} = data;
        const controller = new AbortController();

        try {
            await privateAxios.patch(`${location.pathname}/${selectedItem.name}`, {
                    ...(editModes.name ? { name } : {}),
                    ...(editModes.productType ? { productType } : {}),
                    ...(editModes.componentType ? { componentType } : {}),
                    ...(editModes.stock ? { stock } : {}),
                    ...(editModes.productStatus ? { productStatus } : {}),
                    ...(editModes.minimalStock ? { minimalStock } : {}),
                    ...(editModes.maximalStock ? { maximalStock } : {}),
                    ...(editModes.serialNumber ? { serialNumber } : {}),
                    ...(editModes.batchNumber ? { batchNumber } : {}),
                },
                {
                    signal: controller.signal,
                });

            console.log("Update successful");
            navigate("/loading");
            setSelectedItem(selectedItem);
        } catch (error) {
            // Log any errors that occurred during the Axios request
            console.error("Axios request failed:", error);
        }
    }

    console.log(selectedItem);

    return (
        <>
            {selectedItem ? (
                <form onSubmit={handleSubmit(handleFormSubmit)} className={styles["user-details-form"]}>
                    <h2>Item Details</h2>
                    <div className={styles["item-details-item"]}>
                        <div className={styles["item-details"]}>
                            <label htmlFor="name-field" className={styles["label"]}>Name:</label>
                            {editModes.name ? (
                                <Input
                                    label="name-field"
                                    labelText="Name:"
                                    name="name"
                                    register={register}
                                    errors={errors}
                                    customValidateParams={{
                                        minLength: (v) => v.length >= 2 || "Invalid name",
                                        maxLength: (v) => v.length <= 25 || "Max. number of characters is 25",
                                        matchPattern: (v) => INPUT_REGEX.test(v) || "Only text, numbers and - or _ are allowed",
                                    }}
                                />
                            ) : (
                                <p className={styles["input"]}>{selectedItem.username}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("username")}>{editModes.username ? "Cancel" : "Edit"}</button>
                    </div>
                    <div className={styles["item-details-item"]}>
                        <div className={styles["item-details"]}>
                            <label htmlFor="productType-field" className={styles["label"]}>Product Type:</label>
                            {editModes.productType ? (
                                <select {...register("productType")}>
                                    <option value="SOLUBLE">Soluble</option>
                                    <option value="RAW">Raw</option>
                                </select>
                            ) : (
                                <p className={styles["input"]}>{selectedItem.productType}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("productType")}>{editModes.productType ? "Cancel" : "Edit"}</button>
                    </div>
                    <div className={styles["item-details-item"]}>
                        <div className={styles["item-details"]}>
                            <label htmlFor="componentType-field" className={styles["label"]}>Component Type:</label>
                            {editModes.componentType ? (
                                <select {...register("componentType")}>
                                    <option value="SOLUTION">Solution</option>
                                    <option value="BOTTLE">Bottle</option>
                                    <option value="CAP">Cap</option>
                                    <option value="INDUCTION_LINER">Induction-liner</option>
                                    <option value="LABEL">Label</option>
                                    <option value="PRINTED_BAG">Printed Bag</option>
                                    <option value="INNER_BAG">Inner Bag</option>
                                </select>
                            ) : (
                                <p className={styles["input"]}>{selectedItem.componentType}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("componentType")}>{editModes.componentType ? "Cancel" : "Edit"}</button>
                    </div>
                    <div className={styles["item-details-item"]}>
                        <div className={styles["item-details"]}>
                            <label htmlFor="stock-field" className={styles["label"]}>Stock:</label>
                            {editModes.stock ? (
                                <input
                                    {...register("stock", {
                                        pattern: {
                                            value: NUMBER_REGEX,
                                            message: "Invalid stock value",
                                        },
                                    })}
                                    type="text"
                                />
                            ) : (
                                <p className={styles["input"]}>{selectedItem.stock}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("stock")}>{editModes.stock ? "Cancel" : "Edit"}</button>
                    </div>
                    <div className={styles["item-details-item"]}>
                        <div className={styles["item-details"]}>
                            <label htmlFor="productStatus-field" className={styles["label"]}>Product Status:</label>
                            {editModes.productStatus ? (
                                <select {...register("productStatus")}>
                                    <option value="AWAITING_BACKORDER">Awaiting Backorder</option>
                                    <option value="IN_STOCK">In Stock</option>
                                    <option value="OUT_OF_STOCK">Out Of Stock</option>
                                </select>
                            ) : (
                                <p className={styles["input"]}>{selectedItem.productStatus}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("productStatus")}>{editModes.productStatus ? "Cancel" : "Edit"}</button>
                    </div>
                    <div className={styles["item-details-item"]}>
                        <div className={styles["item-details"]}>
                            <label htmlFor="minimalStock-field" className={styles["label"]}>Minimal Stock:</label>
                            {editModes.minimalStock ? (
                                <input
                                    {...register("minimalStock", {
                                        pattern: {
                                            value: NUMBER_REGEX,
                                            message: "Invalid minimal stock value",
                                        },
                                    })}
                                    type="text"
                                />
                            ) : (
                                <p className={styles["input"]}>{selectedItem.minimalStock}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("minimalStock")}>{editModes.minimalStock ? "Cancel" : "Edit"}</button>
                    </div>
                    <div className={styles["item-details-item"]}>
                        <div className={styles["item-details"]}>
                            <label htmlFor="maximalStock-field" className={styles["label"]}>Maximal Stock:</label>
                            {editModes.maximalStock ? (
                                <input
                                    {...register("maximalStock", {
                                        pattern: {
                                            value: NUMBER_REGEX,
                                            message: "Invalid maximal stock value",
                                        },
                                    })}
                                    type="text"
                                />
                            ) : (
                                <p className={styles["input"]}>{selectedItem.maximalStock}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("maximalStock")}>{editModes.maximalStock ? "Cancel" : "Edit"}</button>
                    </div>
                    <div className={styles["item-details-item"]}>
                        <div className={styles["item-details"]}>
                            <label htmlFor="serialNumber-field" className={styles["label"]}>Serial Number:</label>
                            {editModes.serialNumber ? (
                                <input
                                    {...register("serialNumber", {
                                        pattern: {
                                            value: INPUT_REGEX,
                                            message: "Invalid serial number",
                                        },
                                    })}
                                    type="text"
                                />
                            ) : (
                                <p className={styles["input"]}>{selectedItem.serialNumber}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("serialNumber")}>{editModes.serialNumber ? "Cancel" : "Edit"}</button>
                    </div>
                    <div className={styles["item-details-item"]}>
                        <div className={styles["item-details"]}>
                            <label htmlFor="batchNumber-field" className={styles["label"]}>Batch Number:</label>
                            {editModes.batchNumber ? (
                                <input
                                    {...register("batchNumber", {
                                        pattern: {
                                            value: INPUT_REGEX,
                                            message: "Invalid batch number",
                                        },
                                    })}
                                    type="text"
                                />
                            ) : (
                                <p className={styles["input"]}>{selectedItem.batchNumber}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("batchNumber")}>{editModes.batchNumber ? "Cancel" : "Edit"}</button>
                    </div>

                    <button className={styles["update-userdetails-button"]}
                            type="submit"
                            id="update-button"
                            disabled={!isDirty || !isValid}
                    >
                        Update Profile
                    </button>
                </form>
            ) : (
                <p>Something went wrong</p>
            )}
        </>
    );
}

export default ItemDetails;