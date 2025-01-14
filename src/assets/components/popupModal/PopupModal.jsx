import React from 'react';
import Modal from 'react-modal';
import './PopupModal.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const PopupModal = ({ isOpen, onRequestClose, content }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Page Link Popup"
    className="modal"
    overlayClassName="overlay"
  >
    <button onClick={onRequestClose} className="close-button">×</button>
    <div className="modal-content">
      {content}
    </div>
  </Modal>
);

export default PopupModal;
