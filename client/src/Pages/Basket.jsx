import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './Basket.css';
import { Link, Navigate } from 'react-router-dom';

export default function Basket() {
    const [basket, setBasket] = useState([]);
    const [total, setTotal] = useState(0);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        fetchBasket();
    }, [user.email]);

    const fetchBasket = async () => {
        try {
            const res = await axios.get(`http://localhost:4444/basket/${user.email}`);
            const basketWithQuantities = res.data.basket.map(item => ({
                ...item,
                quantity: item.quantity || 1
            }));
            setBasket(basketWithQuantities);
            calculateTotal(basketWithQuantities);
        } catch (error) {
            console.error('Error fetching basket:', error);
        }
    };

    const calculateTotal = (basket) => {
        const totalAmount = basket.reduce((sum, item) => {
            const price = Number(item.price) || 0;  
            const quantity = Number(item.quantity) || 0;  
            return sum + price * quantity;
        }, 0);
        setTotal(totalAmount);
    };

    const handleDelete = async (code) => {
        try {
            await axios.delete(`http://localhost:4444/basket/${user.email}/${code}`);
            fetchBasket();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleQuantityChange = (code, newQuantity) => {
        if (newQuantity < 1) newQuantity = 1; // Prevent negative quantities
        const updatedBasket = basket.map(item => 
            item.code === code ? { ...item, quantity: newQuantity } : item
        );
        setBasket(updatedBasket);
        calculateTotal(updatedBasket);
    };

    const handlePurchase = async () => {
        try {
            await axios.post(`http://localhost:4444/orders`, { userEmail: user.email, items: basket });
            setBasket([]); 
            setTotal(0);
            alert('Ваш заказ оформлен успешно ')
        } catch (error) {
            console.error('Error completing purchase:', error);
        }
    };

    return (
        <div>
                 <div className="title">
                <h1>Корзина</h1>
            </div>
            <div className="basket-container ">
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
    console.log(item);
    
    const handleIncrease = () => {
        onQuantityChange(item.code, item.quantity + 1);
    };

    const handleDecrease = () => {
        onQuantityChange(item.code, item.quantity - 1);
    };

    return (
        <div className="basket-item">
            <div className="item-photo">
                <img src={item.photo.split('\r\n')[0]} alt={item.name} />
            </div>
            <div className="item-details">
                <h2><strong>{item.name}</strong></h2>
                <p className="item-price">Цена: {item.price.toLocaleString()} руб</p>
                <div className="item-quantity">
                    <button onClick={handleDecrease}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>
                <button onClick={() => onDelete(item.code)}>Удалить</button>
            </div>
        </div>
    );
}
