import React, { useState,useEffect} from 'react';
import axios from 'axios';
import '../pages/Food.css'
import Data from './data/data'
import { useCart } from '../context/CartContext';

const url = "https://restofodieleon-backend.onrender.com";

function Food (){
   const [products, setProducts] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
   const { addToCart , cart} = useCart(); 


   
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios.get(`${url}/api/products`,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error('Error fetching products:', err));
  }, []); 

  useEffect(() => {
  console.log("Cart updated:", cart);
}, [cart]);


  const filteredData = products.filter(item => {
    const title = item.title || item.name || "";
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });



  return (
    <div className='food-container'>
      <h2>All Menu</h2>
      <div className="menu-container">
        <div className="search-filter">
          <input type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
          <select value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="all">All</option>
             <option value="spagetti">Spagetti</option>
             <option value="pizza">Pizza</option>
             <option value="rice">Rice</option>
              <option value="meat">Meat</option>
          </select>
        </div>

        <div className="menuItems">
           {filteredData.length > 0 ? (
            filteredData.map(item => (
              <div key={item._id} className="menu-card">
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>${item.price}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No food found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Food