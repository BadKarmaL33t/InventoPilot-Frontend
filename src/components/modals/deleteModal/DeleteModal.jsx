import styles from './DeleteModal.module.css'

function DeleteModal({ open, modalVisible, handleDelete, input }) {
    return (
        <div
            className={`${styles["modal-background"]} modal-background-${open ? "visible" : "invisible"}`}
        >

            <div className={`${styles["modal-container"]} modal-container-${open ? "opened" : "closed"}`}>
                <h3 className={styles["modal-title"]}>Are You Sure You Want To Delete This Post?</h3>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className={styles["modal-body"]}>Be aware that deleting a post can't be undone!</p>
                <section className={styles["modal-footer"]}>
                    <button
                        className=
                            {`${styles["modal-button"]} 
                            ${styles["modal-button-delete"]}`}
                        onClick={() => {
                            modalVisible(false);
                            handleDelete(input);
                        }}
                    >
                            Delete
                    </button>
                    <button
                        className=
                            {`${styles["modal-button"]} 
                            ${styles["modal-button-cancel"]}`}
                        onClick={() => modalVisible(false)}
                    >
                        <span className={styles["button-text"]}>
                            Cancel
                        </span>
                    </button>
                </section>
            </div>
        </div>
    );
}

export default DeleteModal;