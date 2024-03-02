// MensajeModal.js

import React from "react";

const MensajeModal = ({ mensaje, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <p>{mensaje}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default MensajeModal;
