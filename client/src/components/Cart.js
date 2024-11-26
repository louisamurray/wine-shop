import React from 'react';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
      {cartItems.map((item) => (
        <div key={item.product._id}>
          <h4>{item.product.productName}</h4>
          <p>Price per case: ${item.product.price.toFixed(2)}</p>
          <p>
            Quantity:{' '}
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.product, e.target.value)
              }
            />
          </p>
          <p>Subtotal: ${(item.quantity * item.product.price).toFixed(2)}</p>
          <button onClick={() => removeFromCart(item.product)}>
            Remove
          </button>
          <hr />
        </div>
      ))}
      {cartItems.length > 0 && (
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      )}
    </div>
  );
};

export default Cart;