import React, { useState } from "react"
import PrefillModal from "./PrefillModal";
import "./PrefillUI.css";

export default function PrefillUI(props) {
    const [allowPrefill, setAllowPrefill] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="ui-container">
            <h1>Prefill</h1>
            <button className="close-button" onClick={props.handleCloseUI}>
                &times;
            </button>
            <label class="switch">
                <input type="checkbox" name="toggle"/>
                <span class="slider"></span>
            </label>
            <p>fields for {"{"+props.targetForm.name+"}"}:</p>
            {props.targetForm && Object.keys(props.targetForm).map((key) => (
                <div key={key}>
                    <label>{key}: </label>
                    <input type="text" value={props.targetForm[key]} readonly/>
                </div>
            ))}
            {/* this is test code to interact with modal */}
            <button onClick={openModal}>Open Modal</button>
            <PrefillModal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Modal Title</h2>
                <p>Modal content 0</p>
                <p>Modal content 1</p>
                <p>Modal content 2</p>
            </PrefillModal>
        </div>
    )
}
