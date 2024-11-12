import { useEffect, useState } from "react";
import './favourites.css'; 
import { Link } from "react-router-dom";
import axios from "axios";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [products, setProducts] = useState([]); // Add this line
  const [cart, setCart] = useState([]); // Define setCart here

  useEffect(() => {
    axios.get('./data.json')
      .then(res => setProducts(res.data)) // This will now work correctly
      .catch(err => console.log(err));
  
    const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  
    console.log('Загруженные избранные:', storedFavourites);
    setFavourites(storedFavourites);
    setCart(storedCart); // This will work now
  }, []);
  
  // useEffect(() => {
  //   localStorage.setItem("favourites", JSON.stringify(favourites));
  // }, [favourites]);

  const handleDelete = (item) => {
    const updatedFavourites = favourites.filter(fav => fav.code !== item.code);
    setFavourites(updatedFavourites);
  };

  return (
    <div className="favourites">
      <div className="title">
        <h1>Избранное</h1>
      </div> 
      {favourites.length > 0 ? (
        <div className="favourites-grid">
          {favourites.map((item, index) => (
            <div key={index} className="favourite-item">
              <div className="favourite-item-photo">
                <img src={item.photo.split('\r\n')[0]} alt={item.manufacturer} />
              </div>
              <div className="favourite-item-info">
                <h3><strong>{item.name}</strong></h3>
                <p>{item.description.slice(0, 300)}...</p>
                <button onClick={() => handleDelete(item)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="basket-link">Нет избранных товаров <br /> Перейти в <Link to="/products">Товары</Link></p>
      )}
    </div>
  );
}
