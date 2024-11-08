// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading, setError } from '../store/slices/userSlice';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            dispatch(setError('Пароли не совпадают'));
            return;
        }

        dispatch(setLoading(true));

        try {
            const response = await axios.post('http://localhost:4444/register', {
                name : username,
                email,
                password,
                wholesale: false,
                phone,
            });
            console.log(response);
            
            const basket = [];
            dispatch(setUser({ username, email, phone }));
            setRedirect(true);
        } catch (error) {
            console.error('Registration error:', error);
            dispatch(setError('Произошла ошибка. Попробуйте еще раз.'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className="register-container">
            <h2>Регистрация</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <p>Имя пользователя:</p>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <p>Email:</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <p>Пароль:</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <p>Подтвердите пароль:</p>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <p>Телефон:</p>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button" disabled={loading}>
                    {loading ? 'Загрузка...' : 'Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
};

export default Register;
