import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const exist = cartItems.find((item) => item.product._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCartItems(
      cartItems.filter((item) => item.product._id !== product._id)
    );
  };

  const updateQuantity = (product, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.product._id === product._id
          ? { ...item, quantity: Number(quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      <h1>Wine Shop</h1>
      <ProductList addToCart={addToCart} />
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      {cartItems.length > 0 && (
        <CheckoutForm cartItems={cartItems} clearCart={clearCart} />
      )}
    </div>
  );
}

export default App;