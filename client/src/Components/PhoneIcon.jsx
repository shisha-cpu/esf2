import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './PhoneIcon.css';

const PhoneIcon = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  const toggleForm = () => {
    setIsFormVisible(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsFormVisible(false);
    }
  };

  useEffect(() => {
    if (isFormVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = '7609858455:AAGBvQJSSAdw0l5pVoA_m3k4PuaqiCF8BUg';
    const chatId = '1137493485';
    const text = `Новая заявка:\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`;

    try {
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: text,
      });

      setName('');
      setPhone('');
      setMessage('');
      setIsFormVisible(false);
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
      alert("Не удалось отправить сообщение. Попробуйте снова.");
    }
  };

  return (
    <>
      <div className="phone-icon" onClick={toggleForm}>
        📞
      </div>

      {isFormVisible && (
        <div className="contact-form">
          <div className="form-content" ref={formRef}>
            <h2><strong>Свяжитесь с нами</strong></h2>
            <form onSubmit={handleSubmit}>
              <label>Имя:</label>
              <input
                type="text"
                placeholder="Введите ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Телефон:</label>
              <input
                type="tel"
                placeholder="Введите ваш телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label>Сообщение:</label>
              <textarea
                placeholder="Введите ваше сообщение"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
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
