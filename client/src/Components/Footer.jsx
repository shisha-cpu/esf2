// Footer.js
import React, { useState } from 'react';
import './footer.css';
import Modal from './Modal';

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="contact-info">
          <ul className="contact-list">
          <p>© 2024. Все права защищены.</p>
            {/* <li>Email: example@mail.com</li> <br />
            <li>Телефон: +7 (999) 999-99-99</li> <br />
            <li>Адрес: Улица Примерная, 123</li> <br /> */}
          </ul>
          {/* <button className="btn-contact" onClick={openModal}>Связаться с нами</button> */}
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024. Все права защищены.</p>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </footer>
  );
};

export default Footer;
