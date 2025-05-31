import React, { useState } from "react"
import PrefillModal from "./PrefillModal";

export default function PrefillUI(data) {

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="prefillUI-container">
            <h1>Prefill</h1>
            <p>Prefill fields for this form</p>
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
