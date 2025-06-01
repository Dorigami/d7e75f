import React, { useState } from 'react';
import "./PrefillModal.css";

export default function PrefillModal(props) {
  if (!props.isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button className="close-button" onClick={props.onClose}>
          &times;
        </button>
        {props.children}
      </div>
    </div>
  );
}

// const App = () => {
//   const [isModalOpen, setModalOpen] = useState(false);

//   const openModal = () => setModalOpen(true);
//   const closeModal = () => setModalOpen(false);

//   return (
//     <div className="App">
//       <h1>React Modal Example</h1>
//       <button onClick={openModal}>Open Modal</button>
//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <h2>Modal Title</h2>
//         <p>This is the content inside the modal.</p>
//       </Modal>
//     </div>
//   );
// };

// export default App;
// CSS for Modal (Optional)
// Add this to a Modal.css file for basic styling:


// .modal-overlay {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// }

// .modal-content {
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
//   max-width: 90%;
//   text-align: center;
//   position: relative;
// }

// .close-button {
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: none;
//   border: none;
//   font-size: 1.5rem;
//   cursor: pointer;
// }