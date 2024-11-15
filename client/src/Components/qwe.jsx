import React, { useState, useEffect, useRef } from 'react'; 
import './header.css';
import { Link } from 'react-router-dom';
import logo from '../../public/img/top.svg';
import logoMin from '../../public/img/left.svg';
import axios from 'axios';

const Header = () => {
  const [items, setItems] = useState({});
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || []);
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || []);
  const [showInput, setShowInput] = useState(false);
  let preventClose = false;
  const searchRef = useRef(null);
  const itemListRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  useEffect(() => {
    axios.get('http://90.156.169.196:4444/data')
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Если закрытие заблокировано, просто выходим из функции
      if (preventClose) {
        preventClose = false; // Сбрасываем флаг после одного пропуска
        return;
      }
  
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        itemListRef.current &&
        !itemListRef.current.contains(e.target)
      ) {
        setShowInput(false); // Возвращаем лупу
        setSearchQuery(''); // Очищаем строку поиска
        setFilteredItems([]); // Скрываем результаты поиска
      }
    };
  
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [basket, favourites]);
console.log(showInput);

  return (
    <div className="header">
      <div className="inner-header flex">
        <div className="header-content ">
          <Link to="/"><img src={logo} alt="Логотип" className="header-logo" /></Link>

          <div className={`header-navigate ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Главная</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)}>Товары</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>О нас</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Контакты</Link>
            <Link to="/payment" onClick={() => setMenuOpen(false)}>Оплата и доставка</Link>
          </div>

          <div className="header-auth">
 
          <div className="search-btn" ref={searchRef}>
    {!showInput ? (
      <img
        src="./img/lupa.png"
        alt="Search"
        className="search-icon"
        onClick={(e) => {
          e.stopPropagation(); // Останавливаем всплытие события
          setTimeout(() => setShowInput(true), 0); // Обновляем состояние с задержкой
        }}
        style={{ cursor: 'pointer' }}
      />
    ) : (
      <input
        type="text"
        placeholder=" "
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
        autoFocus
      />
    )}
    <div
      className={`item-list ${filteredItems.length > 0 ? 'active' : ''}`}
      ref={itemListRef}
    >
      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => (
          <Link to="/products" key={index}>
            <div className="item-card">
              <img src={item.photo.split('\r\n')[0]} alt={item.name} />
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
              <Link className='header-basket-txt' style={{ width: '35px' }} to="/basket"><img src="./img/basket1.png" alt="" /></Link>
              <Link className='header-basket-txt' style={{ fontSize: '25px' }} to="/favourites">🖤</Link>
            </div>
          </div>

          <div className="burger-menu" onClick={toggleMenu}>
            <div className={`burger ${isMenuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
