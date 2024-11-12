import axios from "axios";
import { useEffect, useState } from "react";
import './Basket.css';
import '../Components/PhoneIcon.css';
import { Link } from 'react-router-dom';

export default function Basket() {
    const [basket, setBasket] = useState([]);
    const [total, setTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        try {
            const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
            const cleanedCart = savedCart.map(item => ({
                ...item,
                photo: typeof item.photo === 'string' ? item.photo.replace(/\r\n/g, ', ').split(', ') : item.photo,
            }));
            setBasket(cleanedCart);
            calculateTotal(cleanedCart);
        } catch (error) {
            console.error('Ошибка при загрузке корзины из localStorage:', error);
        }
    }, []);

    const calculateTotal = (basket) => {
        try {
            const totalAmount = basket.reduce((sum, item) => {
                const price = isNaN(Number(item.price)) ? 0 : Number(item.price);
                const quantity = isNaN(Number(item.quantity)) ? 1 : Number(item.quantity);
                return sum + price * quantity;
            }, 0);
            setTotal(totalAmount);
        } catch (error) {
            console.error('Ошибка при расчете общей суммы корзины:', error);
        }
    };

    const handleDelete = (code) => {
        try {
            const updatedBasket = basket.filter(item => item.code !== code);
            setBasket(updatedBasket);
            calculateTotal(updatedBasket);
        } catch (error) {
            console.error('Ошибка при удалении товара из корзины:', error);
        }
    };

    const handleQuantityChange = (code, newQuantity) => {
        try {
            const parsedQuantity = isNaN(Number(newQuantity)) ? 1 : Number(newQuantity);
            setBasket(prevBasket => {
                const updatedBasket = prevBasket.map(item => 
                    item.code === code ? { ...item, quantity: parsedQuantity } : item
                );
                calculateTotal(updatedBasket);
                return updatedBasket;
            });
        } catch (error) {
            console.error('Ошибка при изменении количества товара в корзине:', error);
        }
    };

    const handlePurchase = () => {
        setShowModal(true);
    };

    const handleOrderSubmit = async () => {
        try {
            const token = '7609858455:AAGBvQJSSAdw0l5pVoA_m3k4PuaqiCF8BUg';
            const chatId = '1137493485';
            const orderDetails = basket.map(item => 
                `• ${item.name} x ${item.quantity} — ${item.price * item.quantity} руб`
            ).join('\n');
            const message = `🛒 Новый заказ:\nИмя: ${name}\nТелефон: ${phone}\n\n${orderDetails}\n\n💰 Общая сумма: ${total} руб`;

            await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                chat_id: chatId,
                text: message,
            });

            alert('Ваш заказ оформлен успешно, и уведомление отправлено в Telegram.');
            setBasket([]);
            setTotal(0);
            localStorage.removeItem("cart");
            setShowModal(false);
            setName("");
            setPhone("");

        } catch (error) {
            console.error('Ошибка при оформлении заказа или отправке уведомления:', error);
            alert('Не удалось оформить заказ. Попробуйте снова.');
        }
    };

    return (
        <div>
            <div className="title">
                <h1>Корзина</h1>
            </div>
            <div className="basket-container">
                <div className="basket-items">
                    {basket.length === 0 ? (
                        <p className="basket-link">Корзина пуста. <br /> Перейти в <Link to="/products">Товары</Link></p>
                    ) : (
                        basket.map((item) => (
                            <BasketItem
                                key={item.code}
                                item={item}
                                onDelete={handleDelete}
                                onQuantityChange={handleQuantityChange}
                            />
                        ))
                    )}
                </div>
                <aside className="basket-sidebar">
                    <div className="basket-total">
                        <p>Всего: {total.toLocaleString()} руб</p>
                        <button className="order-button" onClick={handlePurchase}>Заказать</button>
                    </div>
                </aside>
            </div>

            {showModal && (
                <div className="contact-form">
                    <div className="form-content">
                        <h2>Контактная информация</h2>
                        <input
                            type="text"
                            placeholder="Ваше имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Ваш телефон"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button onClick={handleOrderSubmit}>Подтвердить заказ</button>
                        <button className="close-button" onClick={() => setShowModal(false)}>Отмена</button>
                    </div>
                </div>
            )}
        </div>
    );
}

function BasketItem({ item, onDelete, onQuantityChange }) {
    const handleIncrease = () => {
        onQuantityChange(item.code, item.quantity + 1);
    };

    const handleDecrease = () => {
        onQuantityChange(item.code, item.quantity - 1);
    };

    const photoUrl = Array.isArray(item.photo) && item.photo.length > 0 ? item.photo[0] : item.photo;

    return (
        <div className="basket-item">
            <div className="item-photo">
                <img src={photoUrl} alt={item.name} />
            </div>
            <div className="item-details">
                <h2><strong>{item.name}</strong></h2>
                <p className="item-price">Цена: {item.price.toLocaleString()} руб</p>
                <div className="item-quantity">
                    <button onClick={handleDecrease}>-</button>
                    <span>{isNaN(item.quantity) ? 1 : item.quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>
                <button onClick={() => onDelete(item.code)}>Удалить</button>
            </div>
        </div>
    );
}
