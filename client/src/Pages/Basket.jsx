import axios from "axios";
import { useEffect, useState } from "react";
import './Basket.css';
import { Link } from 'react-router-dom';

export default function Basket() {
    const [basket, setBasket] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        try {
          const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
          console.log('Загруженная корзина из localStorage:', savedCart);
      
          // Обрабатываем фото, если они передаются как строка
          const cleanedCart = savedCart.map(item => ({
            ...item,
            photo: typeof item.photo === 'string' ? item.photo.replace(/\r\n/g, ', ').split(', ') : item.photo, // Преобразуем в массив
          }));
          console.log('Чистая корзина:', cleanedCart);
      
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
                 
                console.log(`Цена: ${price}, Количество: ${quantity}`);
                return sum + price * quantity;
            }, 0);
            console.log('Расчет общей суммы корзины:', totalAmount);
            setTotal(totalAmount);
        } catch (error) {
            console.error('Ошибка при расчете общей суммы корзины:', error);
        }
    };

    const handleDelete = (code) => {
        try {
            const updatedBasket = basket.filter(item => item.code !== code);
            console.log('Корзина после удаления товара:', updatedBasket);
            setBasket(updatedBasket);
            calculateTotal(updatedBasket);
        } catch (error) {
            console.error('Ошибка при удалении товара из корзины:', error);
        }
    };
    const handleQuantityChange = (code, newQuantity) => {
        try {
            // Parse newQuantity as a number and ensure it's at least 1
            const parsedQuantity = isNaN(Number(newQuantity)) ? 1 : Number(newQuantity);
            console.log('Before handleQuantityChange:', newQuantity);

            console.log(`Изменение количества товара: ${code}, Новое количество: ${parsedQuantity}`);
    
            setBasket(prevBasket => {
                const updatedBasket = prevBasket.map(item => 
                    item.code === code ? { ...item, quantity: parsedQuantity } : item
                );
                console.log('Корзина после изменения количества товара:', updatedBasket);
                calculateTotal(updatedBasket);  // Recalculate total after updating quantity
                return updatedBasket;
            });
    
        } catch (error) {
            console.error('Ошибка при изменении количества товара в корзине:', error);
        }
    };
    
    

    const handlePurchase = async () => {
        try {
            await axios.post(`http://90.156.169.196:4444/orders`, { items: basket });
            setBasket([]);
            setTotal(0);
            localStorage.removeItem("cart");
            alert('Ваш заказ оформлен успешно');
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
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

    // Safely handling item.photo, ensuring it's a valid URL
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
