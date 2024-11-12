import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import logo from '../../public/img/top.svg';
import axios from 'axios';

const Header = () => {
  const [items, setItems] = useState({});
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || []);
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || []);

  const searchRef = useRef(null);
  const itemListRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  useEffect(() => {
    axios.get('./data.json')
      .then(res => {
        setItems(res.data);
        setFilteredItems(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = Object.values(items).flat().filter(item => {
      return (
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    });
    setFilteredItems(filtered);
  };

  // Закрытие списка товаров при клике вне input или блока
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target) && 
          itemListRef.current && !itemListRef.current.contains(e.target)) {
        setSearchQuery('');
        setFilteredItems([]);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Сохранение корзины и избранного в localStorage
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [basket, favourites]);

  return (
    <div className="header">
      <div className="inner-header flex">
        <div className="header-content container">
          <Link to="/"><img src={logo} alt="Логотип" className="header-logo" /></Link>

          <div className={`header-navigate ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Главная</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)}>Товары</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>О нас</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Контакты</Link>
          </div>

          <div className="header-auth">
            <div className="search-btn" ref={searchRef}>
              <input
                type="text"
                placeholder=" 🔍"
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
              <div className={`item-list ${filteredItems.length > 0 ? 'active' : ''}`} ref={itemListRef}>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <Link to='/products' key={index}>
                      <div className="item-card">
                        <img src={item.photo.split("\r\n")[0]} alt={item.name} />
                        <div className="item-details">
                          <h3>{item.name}</h3>
                          <span>{item.price} ₽</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>Товары не найдены.</p>
                )}
              </div>
            </div>

            <div className="header-basket">
              <Link className='header-basket-txt' style={{fontSize:'25px'}} to="/basket">🛒</Link>
              <Link className='header-basket-txt' style={{fontSize:'25px'}} to="/favourites">🤍</Link>
            </div>
          </div>

          <div className="burger-menu" onClick={toggleMenu}>
            <div className={`burger ${isMenuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
      </div>

      <div className="qw">
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
