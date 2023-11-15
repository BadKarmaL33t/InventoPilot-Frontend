import styles from "../homepage/Home.module.css";
import DeleteModal from "../../components/modals/deleteModal/DeleteModal.jsx";
import {useState} from "react";

function UserDetails() {
    const [modalOpen, toggleModalOpen] = useState(false);

    return (
        <>
            <button
                className=
                    {`${styles["modal-button"]} 
                            ${styles["modal-button-delete"]}`}
                onClick={() => toggleModalOpen(true)}
            >
                Delete
            </button>

            {modalOpen &&
                <DeleteModal
                    open={modalOpen}
                    modalVisible={toggleModalOpen}
                    // handleDelete={() => handleDelete({post})}
                />
            }
        </>
    );
}

export default UserDetails;