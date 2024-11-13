import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import './Product.css';
import { useParams } from "react-router-dom"; 

export function Product() {
  const [products, setProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [visibleProductsCount, setVisibleProductsCount] = useState(20);
  const [favourites, setFavourites] = useState([]);
  const [cart, setCart] = useState([]);
  const { categoryName } = useParams();
 
  
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
    window.scrollTo(0, 0); 
    axios.get('../data.json')
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  
    const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  
    setFavourites(storedFavourites);
    setCart(storedCart);
  }, []);
  

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setVisibleProductsCount(20);
  };
useEffect(()=>{
  if (categoryName) {
    handleCategorySelect(categoryName)
    
  }
},[])
  const handleAddToCart = (item) => {
    try {
      console.log('Добавление товара в корзину', item); // Логирование товара перед добавлением
  
      // Очистка фото данных, разбиваем их на массив
      const cleanedPhotos = item.photo.replace(/\r\n/g, ', ').split(', ');
  
      // Обновляем объект товара
      const itemToAdd = {
        ...item,
        photo: cleanedPhotos,  // Теперь фото — это массив
      };
  
      // Обновление состояния корзины
      const updatedCart = [...cart, itemToAdd];
      setCart(updatedCart);
      console.log('Обновленная корзина:', updatedCart);
  
      // Сохраняем обновленную корзину в localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log('Корзина сохранена в localStorage');
      
      alert('Товар успешно добавлен в корзину');
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error);
    }
  };
  
  
  

  const handleShowDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const toggleFavourite = (item) => {
    let updatedFavourites;
    
    // Проверяем, есть ли товар в избранном
    const isFavourite = favourites.some(fav => fav.code === item.code);
    
    if (isFavourite) {
      // Удаляем товар из избранного
      updatedFavourites = favourites.filter(fav => fav.code !== item.code);
      console.log('Удален из избранного:', item);
    } else {
      // Добавляем товар в избранное
      updatedFavourites = [...favourites, item];
      console.log('Добавлен в избранное:', item);
    }
    
    // Обновляем состояние избранных товаров
    setFavourites(updatedFavourites);
    // Сохраняем в localStorage
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
};

const filteredProducts = () => {
  const allProducts = Object.values(products).flat();

  // Ensure that products[selectedCategory] is valid
  const currentProducts = selectedCategory && products[selectedCategory] ? products[selectedCategory] : allProducts;

  return currentProducts
    .filter(item => {
      const matchesSearch = item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesManufacturer = selectedManufacturer ? item.manufacturer === selectedManufacturer : true;
      return matchesSearch && matchesPrice && matchesManufacturer;
    })
    .slice(0, visibleProductsCount);
};


  const loadMoreProducts = () => {
    setVisibleProductsCount(prevCount => prevCount + 20);
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
            ><br /><br />
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
          <br />
          <label>Цена:</label><br />
         от: <input type="number" min="0" max="1000000" value={priceRange[0]} onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])} /> <br />
         до: <input type="number" min="0" max="1000000" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])} />
        </div>
        <br />
        <label>Выбор производителя:</label>
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
            {filteredProducts().map((item, itemIndex) => {
              const images = item.photo.replace(/\\r\\n/g, '\n').split('\n');
              const isFavourite = favourites.some(fav => fav.code === item.code);
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
                  <div className="product-btns">
                    <button className="add-btn" onClick={() => handleAddToCart(item)}>Добавить в корзину</button>
                    <button onClick={() => handleShowDetails(item)}>Подробнее</button>
                    <button onClick={() => toggleFavourite(item)} style={{background :  0 , margin : 0 , padding : 0}}><span>{isFavourite ? "❤️" : "🤍"}</span></button>

                  </div>
                </div>
              );
            })}
          </div>
          {filteredProducts().length >= visibleProductsCount && (
            <button onClick={loadMoreProducts} className="load-more">
              Показать еще
            </button>
          )}
        </div>
      </div>

      {showModal && selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>❌</button>
            <h2>{selectedItem.name}</h2>
            <p>Описание: {selectedItem.description}</p>
            <p>Цена: {selectedItem.price} руб.</p>
            <p>Производитель: {selectedItem.manufacturer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
