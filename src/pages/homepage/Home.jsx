import styles from './Home.module.css';
import logo from '../../assets/InventoPilotVector.png'
import {useState} from "react";
import DeleteModal from "../../components/modals/deleteModal/DeleteModal.jsx";

function Home() {
    const [modalOpen, toggleModalOpen] = useState(false);

    return (
        <article className={styles["intro-article"]}>
            <p className={styles["intro-text"]}>
                Welkom bij InventoPilot, uw inventarisatie tool voor het beheren van voorraden en het plannen van
                productie.
            </p>
            <p className={styles["intro-text"]}>
                In een wereld waarin bedrijven steeds slimmer willen omgaan met voorraadbeheer en productie management,
                staat het optimaliseren hiervan centraal als een cruciaal aspect van het succes van organisaties
                (ongeacht hun omvang of industrie). Het effectief beheren van voorraden en het naadloos aansluiten van
                de productieplanning is de sleutel tot het voldoen aan de vraag van klanten, het minimaliseren van
                kosten en het maximaliseren van operationele efficiëntie. In dit kader is het essentieel dat
                organisaties beschikken over de juiste hulpmiddelen.
            </p>
            <p className={styles["intro-text"]}>
                Log in om gebruik te maken van de functionaliteiten van InventoPilot. Iedere view beschikt over een
                begeleidende tekst waarin de beschikbare opties worden uitgelegd.
            </p>
            <span className={styles["intro-img-wrapper"]}>
                <img className={styles["company-logo"]} src={logo} alt="Company Logo"/>
            </span>

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
    />}
        </article>
    );
}

export default Home;