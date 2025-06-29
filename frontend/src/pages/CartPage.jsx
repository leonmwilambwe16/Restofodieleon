import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

function CartPage() {
  const { cart = [], incrementQty, decrementQty, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    if (cart) {
      setLoading(false);
    }
  }, [cart]);

  if (loading) {
    return <p>Loading cart...</p>;
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => {
              const id = item._id || item.id;
              const price = item.price || 0;
              const quantity = item.quantity || 0;
              const img = item.image || '';
              const title = item.name || 'Untitled';

              return (
                <div className="cart-item" key={id}>
                  <img src={img} alt={title} />
                  <div className="info">
                    <h4>{title}</h4>
                    <p>${price.toFixed(2)} x {quantity}</p>
                    <div className="quantity-controls">
                      <button
                        onClick={() => decrementQty(id)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button onClick={() => incrementQty(id)}>+</button>
                    </div>
                    <p>Total: ${(price * quantity).toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="checkout">
            <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
            <button className="checkout-button">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;