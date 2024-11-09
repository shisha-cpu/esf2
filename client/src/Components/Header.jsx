import React, { useState } from 'react';
import './header.css';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../public/img/i.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store/slices/userSlice';
const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

console.log(user);


  const deleteUser = ()=>{
    dispatch(clearUser())
    return <Navigate to="/" />;
  }

  return (
    <div className="header">
      <div className="inner-header flex">
        <div className="header-content container">
          <Link to='/'><img src={logo} alt="Логотип" className='header-logo' /></Link>

          <div className={`header-navigate ${isMenuOpen ? 'active' : ''}`}>
            <Link to='/' onClick={() => setMenuOpen(false)}>Главная</Link>
            <Link to='/products' onClick={() => setMenuOpen(false)}>Товары</Link>
            <Link to='/about' onClick={() => setMenuOpen(false)}>О нас</Link>
            <Link to='/contact' onClick={() => setMenuOpen(false)}>Контакты</Link>
   
          </div>

          <div className={`header-navigate ${isMenuOpen ? 'active' : ''}`}>
          {
            user.user ? 
            <>
              <p>Пользователь :        {user.user.username}</p>
              <Link  to='/basket'>Корзина </Link>
              <button style={{color :'red'}} onClick={deleteUser}>Выйти</button>


            </>
            :
            <>
              <Link  to='/register'>Регистрация </Link>
              <Link to='/login' >Вход </Link>
            </>
          }
          </div>
  
          <div className="burger-menu" onClick={toggleMenu}>
            <div className={`burger ${isMenuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
      </div>
      
      <div className='qw'>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Header;
