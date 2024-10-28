import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Finish</h2>
        <p>Timer Anda telah selesai menghitung.</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Modal;
