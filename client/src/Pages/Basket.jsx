import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './Basket.css';

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4444/basket/${user.email}/${id}`);
            fetchBasket();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleQuantityChange = (id, quantity) => {
        const updatedBasket = basket.map(item => 
            item._id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
        );
        setBasket(updatedBasket);
        calculateTotal(updatedBasket);
    };

    const handlePurchase = async () => {
        try {
            await axios.post(`http://localhost:4444/orders`, { userEmail: user.email, items: basket });
            setBasket([]);
            setTotal(0);
        } catch (error) {
            console.error('Error completing purchase:', error);
        }
    };

    return (
        <div className="basket">
            {basket.length === 0 ? (
                <p>Your basket is empty.</p>
            ) : (
                basket.map((item) => (
                    <BasketItem 
                        key={item._id} 
                        item={item} 
                        onDelete={handleDelete} 
                        onQuantityChange={handleQuantityChange} 
                    />
                ))
            )}
            <div className="basket-total">
                <p>Total: {total.toLocaleString()} руб</p>
                <button onClick={handlePurchase}>Purchase</button>
            </div>
        </div>
    );
}

function BasketItem({ item, onDelete, onQuantityChange }) {
    const handleIncrease = () => {
        onQuantityChange(item._id, item.quantity + 1);
    };

    const handleDecrease = () => {
        onQuantityChange(item._id, item.quantity - 1);
    };

    return (
        <div className="basket-item">
            <div className="item-photo">
                <img src={item.photo.split('\r\n')[0]} alt={item.name} />
            </div>
            <div className="item-details">
                <h2>{item.name}</h2>
                <p className="item-price">Price: {item.price.toLocaleString()} руб</p>
                <div className="item-quantity">
                    <button onClick={handleDecrease}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>
                <button onClick={() => onDelete(item._id)}>Delete</button>
            </div>
        </div>
    );
}
