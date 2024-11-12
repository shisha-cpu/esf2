import React, { useState } from 'react';
import './PhoneIcon.css'; // Подключаем файл стилей для иконки и формы

const PhoneIcon = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(prev => !prev);
  };

  return (
    <>
      <div className="phone-icon" onClick={toggleForm}>
        📞
      </div>

      {isFormVisible && (
        <div className="contact-form">
          <div className="form-content">
            <h2>Свяжитесь с нами</h2>
            <form>
              <label>Имя:</label>
              <input type="text" placeholder="Введите ваше имя" />
              <label>Сообщение:</label>
              <textarea placeholder="Введите ваше сообщение" />
              <button type="submit">Отправить</button>
            </form>
            <button className="close-button" onClick={toggleForm}>Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PhoneIcon;
