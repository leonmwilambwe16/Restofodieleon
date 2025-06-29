import React , { useEffect, useState } from 'react';
import axios from 'axios';
import '../Admin/List.css';

const url = "https://restofodieleon-backend.onrender.com";

function List (){
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
         const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${url}/api/products`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${url}/api/products/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setProducts((prev) => prev.filter((product) => product._id !== id));
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };
  return (
    <div className='list-products'>
      <h2>Product List</h2>
      <ul className='product-lists'>
        {products.map((product) => (
          <li key={product._id} className="product-card">
            <img src={product.image} alt={product.name} width="50" />
             <div className="product-details-list">
            <span  className="product-name-list">{product.name}</span>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List