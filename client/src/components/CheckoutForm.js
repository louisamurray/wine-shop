import React, { useState } from 'react';
import axios from 'axios';

const CheckoutForm = ({ cartItems, clearCart }) => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderItems = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      pricePerCase: item.product.price,
    }));

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );

    const orderData = {
      customerName,
      email,
      cellphone,
      orderItems,
      totalAmount,
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, orderData);

      // Display bank account number and order confirmation
      alert(
        `Order placed successfully! Please deposit $${totalAmount.toFixed(
          2
        )} into bank account 123-456789-00 using Order ID ${
          res.data._id
        } as reference.`
      );

      clearCart();
      setCustomerName('');
      setEmail('');
      setCellphone('');
    } catch (error) {
      console.error(error);
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Name:{' '}
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </label>
        </p>
        <p>
          <label>
            Email:{' '}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </p>
        <p>
          <label>
            Cellphone:{' '}
            <input
              type="tel"
              value={cellphone}
              onChange={(e) => setCellphone(e.target.value)}
              required
            />
          </label>
        </p>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutForm;