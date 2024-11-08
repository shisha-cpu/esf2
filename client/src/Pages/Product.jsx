import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css"; // This import might vary based on your setup
import './Product.css';
import { useSelector } from "react-redux";

export function Product() {
  const [products, setProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [userBasket, setUserBasket] = useState([]);  // Add basket state
    const user = useSelector(state =>state.user.user)
  const manufacturers = [
    "Китай", "Россия", "Akces-Med (Польша)", "Rebotec (Германия)", 
    "Barry (Тайвань)", "Я могу (Россия)", "Ortonica (Китай)", 
    "Мега-Оптим (КНР)", "Titan (Германия)", "MyWam (Польша)", 
    "ВелоЛидер", "RT (Россия)", "Otto Bock (Германия)", "HOGGI (Германия)", 
    "PATRON Bohemia (Чехия)", "Vermeiren (Бельгия)", "LIW (Польша)", 
    "THOMASHILFEN (Германия)", "Armed", "Kinesis", "Meyra (Германия)", 
    "Sorg (Германия)", "Fumagalli (Италия)", "VITEA CARE (Польша)", 
    "Катаржина (Россия)", "Convaid (США)", "IMEDIX (Польша)"
  ];

  useEffect(() => { 
    axios.get('./data.json') 
      .then(res => setProducts(res.data)) 
      .catch(err => console.log(err)); 

    
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (item) => {
    console.log(item);
    
    axios.post(`http://localhost:4444/basket/${user.email}`, { product: item })

    .then(res => console.log(res.data))
    .catch(err => console.log(err));


    
  };

  const handleShowDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const filteredProducts = () => {
    const allProducts = Object.values(products).flat();
    const currentProducts = selectedCategory ? products[selectedCategory] : allProducts;

    return currentProducts.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesManufacturer = selectedManufacturer ? item.manufacturer === selectedManufacturer : true;
      return matchesSearch && matchesPrice && matchesManufacturer;
    });
  };

  return ( 
    <div className="product-page"> 
      <aside className="filter-panel"> 
        <h2>Категории</h2> 
        <ul> 
          {Object.keys(products).map((category, index) => ( 
            <li 
              key={index} 
              onClick={() => handleCategorySelect(category)} 
              className={selectedCategory === category ? "active" : ""} 
            > <br /><br />
              {category} 
            </li> 
          ))} 
        </ul>
        <h2>Фильтры</h2>
        <input 
          type="text" 
          placeholder="Поиск по названию" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          className="search"
        /> 
        <div>
          <label>Цена:</label><br />
          <span>Минимум: {priceRange[0]} руб.</span>
          <input 
            type="range" 
            min="0" 
            max="1000000" 
            value={priceRange[0]} 
            onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])} 
          />
          <br />
          <span>Максимум: {priceRange[1]} руб.</span>
          <input 
            type="range" 
            min="0" 
            max="1000000" 
            value={priceRange[1]} 
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])} 
          />
        </div>
        <label><strong>Выбор производителя:</strong></label> 
        <select onChange={e => setSelectedManufacturer(e.target.value)} value={selectedManufacturer}>
          <option value="">Все производители</option>
          {manufacturers.map((manufacturer, index) => (
            <option key={index} value={manufacturer}>{manufacturer}</option>
          ))}
        </select>
      </aside>

      <div className="product-list"> 
        <div className="title"> 
          <h1>Наши товары</h1> 
        </div> 
        <div className="category"> 
          <h2>{selectedCategory ? selectedCategory : "Все товары"}</h2> 
          <div className="product-cards">
            {filteredProducts().length > 0 ? (
              filteredProducts().map((item, itemIndex) => {
                const images = item.photo.replace(/\\r\\n/g, '\n').split('\n');

                return (
                  <div key={itemIndex} className="product-card">
                    <Swiper modules={[Navigation]} navigation spaceBetween={10} slidesPerView={1}>
                      {images.map((url, imgIndex) => (
                        <SwiperSlide key={imgIndex}>
                          <img src={url} className="product-img" alt={`${item.name} image ${imgIndex + 1}`} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <h3>{item.name}</h3>
                    <p><strong>Цена:</strong> {item.price} руб.</p>
                    <button onClick={() => handleAddToCart(item)}>Добавить в корзину</button>
                    <button onClick={() => handleShowDetails(item)}>Подробнее</button>
                  </div>
                );
              })
            ) : (
              <p>Товары не найдены.</p>
            )}
          </div>
        </div>
      </div>

      {showModal && selectedItem && (
        <div className="modal"> 
          <div className="modal-content"> 
            <span className="close" onClick={handleCloseModal}>&times;</span> 
            <h2>{selectedItem.name}</h2> 
            <p><strong>Производитель:</strong> {selectedItem.manufacturer}</p> 
            <p><strong>Вес:</strong> {selectedItem.weight || "Не указано"}</p> 
            <p><strong>Описание:</strong> {selectedItem.description}</p> 
            <p><strong>Цена:</strong> {selectedItem.price} руб.</p> 
            <p><strong>Код:</strong> {selectedItem.code}</p> 
          </div> 
        </div>
      )}
    </div>
  );
}
