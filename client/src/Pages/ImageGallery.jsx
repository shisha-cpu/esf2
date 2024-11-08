import { useEffect, useState } from 'react';
import './ImageGallery.css';
import { Link } from "react-router-dom";
import axios from 'axios';

export function ImageGallery() {
    const [products, setProducts] = useState({}); 

    useEffect(() => { 
        axios.get('./data.json') 
            .then(res => setProducts(res.data)) 
            .catch(err => console.log(err)); 
    }, []);
    
    return (
        <section>
            <div className="title"><h1>Наши товары</h1></div>
            <div className="card-list">
                {Object.keys(products).map((category, index) => {
                    const firstProduct = products[category][0];
                    const photo  = firstProduct.photo
                    
                    return (
                        <div className="card" key={index}>
                            {firstProduct && ( 
                                <>
                                    <img src={firstProduct.photo} alt={firstProduct.name} />
                                    <h3>{category}</h3>
                                    <button>
                                        <Link to={'/products'}>Перейти</Link>
                                    </button>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
