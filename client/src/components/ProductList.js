import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(err);
        alert(
          'Error fetching products: ' +
            (err.response?.statusText || err.message)
        );
      });
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 && <p>Loading products...</p>}
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.productName}</h3>
          <p>Varietal: {product.varietal}</p>
          <p>Price per case: ${product.price.toFixed(2)}</p>
          <p>Availability: {product.availability}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ProductList;