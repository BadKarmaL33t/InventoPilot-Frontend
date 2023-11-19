import styles from "./OrderDetailsPage.module.css";
import {useContext, useState} from "react";
import {SelectedItemContext} from "../../context/SelectedItemContext.jsx";
// import {privateAxios} from "../../api/axios.js";
import {useLocation} from "react-router-dom";
import logo from "../../assets/InventoPilotVector.png";
import AddToEntityModal from "../../components/modals/addToEntityModal/AddToEntityModal.jsx";
import RemoveFromEntityModal from "../../components/modals/removeFromEntityModal/RemoveFromEntityModal.jsx";

function OrderDetails() {
    // const {handleSubmit, formState: {errors, isDirty, isValid}, register} = useForm({mode: 'onChange'});
    // const INPUT_REGEX = /^[a-zA-Z]*[a-zA-Z0-9-_]{2,25}$/;
    // const NUMBER_REGEX = /^[0-9]*$/;
    const {selectedItem} = useContext(SelectedItemContext);
    const location = useLocation();
    const [addModalOpen, toggleAddModalOpen] = useState(false);
    const [deleteModalOpen, toggleDeleteModalOpen] = useState(false);

    // const [editModes, setEditModes] = useState({
    //     productName: false,
    //     quantity: false,
    // });

    // const toggleEditMode = (field) => {
    //     setEditModes({
    //         ...editModes,
    //         [field]: !editModes[field],
    //     });
    // };

    // async function handleFormSubmit(data) {
    //     const {
    //         productName,
    //         quantity,
    //     } = data;
    //     const controller = new AbortController();
    //
    //     try {
    //         await privateAxios.patch(`${location.pathname}/${selectedItem.name}`, {
    //                 ...(editModes.productName ? {productName} : {}),
    //                 ...(editModes.quantity ? {quantity} : {}),
    //             },
    //             {
    //                 signal: controller.signal,
    //             });
    //
    //         console.log("Update successful");
    //         setSelectedItem(selectedItem);
    //         navigate("/loading");
    //     } catch (error) {
    //         console.error("Axios request failed:", error);
    //     }
    // }

    return (
        <>
            {selectedItem ? (
                    // <form onSubmit={handleSubmit(handleFormSubmit)} className={styles["order-details-form"]}>
                    <form className={styles["order-details-form"]}>
                        <h2 className={styles["form-title"]}>Item Details</h2>
                        <div className={styles["order-section-wrapper"]}>
                            <section className={styles["order-collection-container"]}>
                                <div className={styles["order-details"]}>
                                    <label htmlFor={`id-field-${selectedItem.id}`} className={styles["label"]}>Order
                                        ID:</label>
                                    <p className={styles["input"]}
                                       id={`id-field-${selectedItem.id}`}>{selectedItem.id}</p>
                                </div>
                                <ul>
                                    {selectedItem.orderProducts.map((orderProduct) => (
                                        <li key={orderProduct.productName}
                                            className={styles["order-details-orderProduct"]}>

                                            {/*buttons worden geimplementeerd na het toepassen van de edit logica*/}

                                            <div className={styles["order-details"]}>
                                                <label htmlFor={`product-name-field-${orderProduct.productName}`}
                                                       className={styles["label"]}>Product
                                                    Name:</label>
                                                <p className={styles["input"]}
                                                   id={`product-name-field-${orderProduct.productName}`}>{orderProduct.productName}</p>
                                            </div>
                                            {/*<button className={styles["edit-button"]} type="button"*/}
                                            {/*        onClick={() => toggleEditMode("productName")}>{editModes.orderProduct.productName ? "Cancel" : "Edit"}</button>*/}
                                            <div className={styles["order-details"]}>
                                                <label htmlFor={`quantity-field-${orderProduct.id}`}
                                                       className={styles["label"]}>Quantity:</label>
                                                <p className={styles["input"]}
                                                   id={`quantity-field-${orderProduct.quantity}`}>{orderProduct.quantity}</p>
                                            </div>
                                            {/*<button className={styles["edit-button"]} type="button"*/}
                                            {/*        onClick={() => toggleEditMode("quantity")}>{editModes.orderProduct.quantity ? "Cancel" : "Edit"}</button>*/}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            <section className={styles["order-collection-container"]}>
                                {/*Dit wordt de barcode of QR code van het product*/}
                                <span className={styles["order-img-wrapper"]}>
                                <img src={logo} alt="order-barcode" className={styles["order-img"]}/>
                            </span>
                            </section>
                        </div>
                        <div className={styles["buttons"]}>
                            <div className={styles["buttons-left"]}>
                                {location.pathname === "/app/orders" &&
                                    <>
                                        <button
                                            className=
                                                {`${styles["modal-button"]} 
                            ${styles["modal-button-add"]}`}
                                            type="button"
                                            onClick={() => toggleAddModalOpen(true)}
                                        >
                                            Add products
                                        </button>

                                        {addModalOpen &&
                                            <AddToEntityModal
                                                open={addModalOpen}
                                                modalVisible={toggleAddModalOpen}
                                            />
                                        }
                                        <button
                                            className=
                                                {`${styles["modal-button"]} 
                            ${styles["modal-button-delete"]}`}
                                            type="button"
                                            onClick={() => toggleDeleteModalOpen(true)}
                                        >
                                            Remove items
                                        </button>

                                        {deleteModalOpen &&
                                            <RemoveFromEntityModal
                                                open={deleteModalOpen}
                                                modalVisible={() => toggleDeleteModalOpen()}
                                            />
                                        }
                                    </>
                                }
                            </div>
                            {/*Update button pas nodig na het toepassen van de edit logica*/}

                            {/*< button className={styles["update-order-details-button"]}*/}
                            {/*         type="submit"*/}
                            {/*         id="update-button"*/}
                            {/*         disabled={!isDirty || !isValid}*/}
                            {/*>*/}
                            {/*    Update Order*/}
                            {/*</button>*/}
                        </div>
                    </form>
                ) :
                (
                    <p>Something went wrong</p>
                )
            }

        </>
    )
        ;
}

export default OrderDetails;