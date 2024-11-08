// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setUser, setLoading, setError } from '../store/slices/userSlice';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));

        try {
            const response = await axios.post('http://localhost:4444/login', {
                email,
                password,
            });
            console.log(response.data.user);
            
            const { name  ,  phone} = response.data.user;

            dispatch(setUser({ username : name, email, phone }));
            setRedirect(true);
        } catch (error) {
            console.error('Login error:', error);
            dispatch(setError('Произошла ошибка. Попробуйте еще раз.'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-container ">
            <h2>Вход</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
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
                <button type="submit" className="register-button" disabled={loading}>
                    {loading ? 'Загрузка...' : 'Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
};

export default Login;
