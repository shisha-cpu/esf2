// Modal.js
import React from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Связаться с нами</h2>
        <form>
          <label>
            Имя:
            <input type="text" name="name" required />
          </label>
          <label>
            Телефон:
            <input type="tel" name="phone" required />
          </label>
          <button type="submit">Отправить</button>
        </form>
        <button className="modal-close" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Modal;
