import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './favourites.css'; 
import { Link } from "react-router-dom";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    axios.get(`http://90.156.169.196:4444/favourites/${user.email}`)
      .then(res => {
        setFavourites(res.data.favourites); // Access 'favourites' from the response
      })
      .catch(err => console.log(err));
  }, [user.email]);

  const handleDelete = (item)=>{
    console.log(item);
   
    
    axios.delete(`http://90.156.169.196:4444/favourites/${user.email}/${item.code}`)
        .then(() => {
          setFavourites(prevFavourites => prevFavourites.filter(fav => fav.code !== item.code));
        })
        .catch(err => console.log(err));
  }
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
                <button onClick={()=>{
                    handleDelete(item)
                }} >Удалить</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        
        <p className="basket-link">Нет избранных товаров  <br /> Перейти в <Link to="/products">Товары</Link></p>
      )}
    </div>
  );
}
