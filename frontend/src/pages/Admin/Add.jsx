import React , { useState } from 'react';
import axios from 'axios';
import '../Admin/Add.css';

const url = "https://restofodieleon-backend.onrender.com";

function Add (){
    const [product, setProduct] = useState({ name: '', description: '', price: '', category: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);
const categories = ['popular', 'salade', 'spagetti', 'pizza', 'rice', 'meat'];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("category", product.category);
  formData.append("image", product.image);

  const token = localStorage.getItem("accessToken"); 
   console.log("Token:", token);
  try {
    const res = await axios.post(`${url}/api/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    console.log("Product created", res.data);
  } catch (error) {
    if (error.response) {
      console.error("Backend error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

  return (
    <form onSubmit={handleSubmit} className='add-form' >
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
      <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
      <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
      <select name="category" value={product.category} onChange={handleChange} required>
        <option value="">Select Category</option>
       {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
      <input type="file" onChange={handleImageChange} required />
      {imagePreview && <img src={imagePreview} alt="Preview" />}
      <button type="submit">Add Product</button>
    </form>
  )
}

export default Add