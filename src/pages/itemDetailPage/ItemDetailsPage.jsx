import styles from "./ItemDetailsPage.module.css";
import {useContext, useState} from "react";
import {SelectedItemContext} from "../../context/SelectedItemContext.jsx";
import {privateAxios} from "../../api/axios.js";
import Input from "../../components/input/Input.jsx";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import formatEnum from "../../helpers/enumToCamelCase.js";

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

    const toggleEditMode = (field) => {
        setEditModes({
            ...editModes,
            [field]: !editModes[field],
        });
    };

    async function handleFormSubmit(data) {
        const {
            name,
            productType,
            componentType,
            stock,
            productStatus,
            minimalStock,
            maximalStock,
            serialNumber,
            batchNumber
        } = data;
        const controller = new AbortController();

        try {
            await privateAxios.patch(`${location.pathname}/${selectedItem.name}`, {
                    ...(editModes.name ? {name} : {}),
                    ...(editModes.productType ? {productType} : {}),
                    ...(editModes.componentType ? {componentType} : {}),
                    ...(editModes.stock ? {stock} : {}),
                    ...(editModes.productStatus ? {productStatus} : {}),
                    ...(editModes.minimalStock ? {minimalStock} : {}),
                    ...(editModes.maximalStock ? {maximalStock} : {}),
                    ...(editModes.serialNumber ? {serialNumber} : {}),
                    ...(editModes.batchNumber ? {batchNumber} : {}),
                },
                {
                    signal: controller.signal,
                });

            console.log("Update successful");
            navigate("/loading");
            setSelectedItem(selectedItem);
        } catch (error) {
            console.error("Axios request failed:", error);
        }
    }

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
                                <p className={styles["input"]}>{selectedItem.name}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("username")}>{editModes.name ? "Cancel" : "Edit"}</button>
                    </div>
                    {(location.pathname === "/app/products" || location.pathname === "/app/products/new") ? (
                        <div className={styles["item-details-item"]}>
                            <div className={styles["item-details"]}>
                                <label htmlFor="productType-field" className={styles["label"]}>Product Type:</label>
                                {editModes.productType ? (
                                    <select {...register("productType")}>
                                        <option value="SOLUBLE">Soluble</option>
                                        <option value="RAW">Raw</option>
                                    </select>
                                ) : (
                                    <p className={styles["input"]}>{formatEnum(selectedItem.productType)}</p>
                                )}
                            </div>
                            <button className={styles["edit-button"]}
                                    onClick={() => toggleEditMode("productType")}>{editModes.productType ? "Cancel" : "Edit"}</button>
                        </div>
                    ) : (
                        <div className={styles["item-details-item"]}>
                            <div className={styles["item-details"]}>
                                <label htmlFor="component-type-field" className={styles["label"]}>Component
                                    Type:</label>
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
                                    <p className={styles["input"]}>{formatEnum(selectedItem.componentType)}</p>
                                )}
                            </div>
                            <button className={styles["edit-button"]}
                                    onClick={() => toggleEditMode("componentType")}>{editModes.componentType ? "Cancel" : "Edit"}</button>
                        </div>
                    )}
                    <div className={styles["item-details-item"]}>
                        <div className={styles["item-details"]}>
                            <label htmlFor="stock-field" className={styles["label"]}>Stock:</label>
                            {editModes.stock ? (
                                <Input
                                    label="stock-field"
                                    labelText="Stock:"
                                    name="stock"
                                    register={register}
                                    errors={errors}
                                    customValidateParams={{
                                        minLength: (v) => v.length >= 1 || "Invalid name",
                                        maxLength: (v) => v.length <= 6 || "Max. number of characters is 25",
                                        matchPattern: (v) => NUMBER_REGEX.test(v) || "Only numbers are allowed",
                                    }}
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
                                <p className={styles["input"]}>{formatEnum(selectedItem.productStatus)}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("productStatus")}>{editModes.productStatus ? "Cancel" : "Edit"}</button>
                    </div>
                    {(location.pathname === "/app/products" || location.pathname === "/app/products/new") ? (
                        <div className={styles["item-details-item"]}>
                            <div className={styles["item-details"]}>
                                <label htmlFor="sold-field" className={styles["label"]}>Sold:</label>
                                <p className={styles["input"]} id="sold-field">{selectedItem.sold}</p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles["item-details-item"]}>
                            <div className={styles["item-details"]}>
                                <label htmlFor="used-field" className={styles["label"]}>Used:</label>
                                <p className={styles["input"]} id="used-field">{selectedItem.used}</p>
                            </div>
                        </div>
                    )}
                    <div className={styles["item-details-item"]}>
                        <div className={styles["item-details"]}>
                            <label htmlFor="minimalStock-field" className={styles["label"]}>Minimal Stock:</label>
                            {editModes.minimalStock ? (
                                <Input
                                    label="minimalStock-field"
                                    labelText="Minimal Stock:"
                                    name="minimalStock"
                                    register={register}
                                    errors={errors}
                                    customValidateParams={{
                                        minLength: (v) => v.length >= 1 || "Invalid name",
                                        maxLength: (v) => v.length <= 6 || "Max. number of characters is 25",
                                        matchPattern: (v) => NUMBER_REGEX.test(v) || "Only numbers are allowed",
                                    }}
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
                                <Input
                                    label="maximalStock-field"
                                    labelText="Maximal Stock:"
                                    name="maximalStock"
                                    register={register}
                                    errors={errors}
                                    customValidateParams={{
                                        minLength: (v) => v.length >= 1 || "Invalid name",
                                        maxLength: (v) => v.length <= 6 || "Max. number of characters is 25",
                                        matchPattern: (v) => NUMBER_REGEX.test(v) || "Only numbers are allowed",
                                    }}
                                />
                            ) : (
                                <p className={styles["input"]}>{selectedItem.maximalStock}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("maximalStock")}>{editModes.maximalStock ? "Cancel" : "Edit"}</button>
                    </div>
                    {(location.pathname === "/app/products" || location.pathname === "/app/products/new") ? (
                        <div className={styles["item-details-item"]}>
                            <div className={styles["item-details"]}>
                                <label htmlFor="serialNumber-field" className={styles["label"]}>Serial Number:</label>
                                {editModes.serialNumber ? (
                                    <Input
                                        label="serialNumber-field"
                                        labelText="Serial Number:"
                                        name="serialNumber"
                                        register={register}
                                        errors={errors}
                                        customValidateParams={{
                                            minLength: (v) => v.length >= 2 || "Invalid name",
                                            maxLength: (v) => v.length <= 25 || "Max. number of characters is 25",
                                            matchPattern: (v) => INPUT_REGEX.test(v) || "Only text, numbers and - or _ are allowed",
                                        }}
                                    />
                                ) : (
                                    <p className={styles["input"]}>{selectedItem.serialNumber}</p>
                                )}
                            </div>
                            <button className={styles["edit-button"]}
                                    onClick={() => toggleEditMode("serialNumber")}>{editModes.serialNumber ? "Cancel" : "Edit"}</button>
                        </div>
                    ) : (
                        <div className={styles["item-details-item"]}>
                            <div className={styles["item-details"]}>
                                <label htmlFor="batchNumber-field" className={styles["label"]}>Batch Number:</label>
                                {editModes.batchNumber ? (
                                    <Input
                                        label="batchNumber-field"
                                        labelText="Batch Number:"
                                        name="batchNumber"
                                        register={register}
                                        errors={errors}
                                        customValidateParams={{
                                            minLength: (v) => v.length >= 2 || "Invalid name",
                                            maxLength: (v) => v.length <= 25 || "Max. number of characters is 25",
                                            matchPattern: (v) => INPUT_REGEX.test(v) || "Only text, numbers and - or _ are allowed",
                                        }}
                                    />
                                ) : (
                                    <p className={styles["input"]}>{selectedItem.batchNumber}</p>
                                )}
                            </div>
                            <button className={styles["edit-button"]}
                                    onClick={() => toggleEditMode("batchNumber")}>{editModes.batchNumber ? "Cancel" : "Edit"}</button>
                        </div>
                    )}
                    < button className={styles["update-userdetails-button"]}
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