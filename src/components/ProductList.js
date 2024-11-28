import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Fetching from the correct port
    axios.get('http://localhost:3000/products')
      .then(response => {
        setProducts(response.data); // The response should now match your db.json
        setLoading(false);
      })
      .catch(error => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product.id} style={{ margin: '20px', width: '200px' }}>
            <img src={product.image} alt={product.title} style={{ width: '100%' }} />
            <Typography variant="h6">{product.title}</Typography>
            <Typography variant="body1">${product.price}</Typography>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <Button variant="outlined" color="primary" style={{ margin: '5px' }}>
                View Details
              </Button>
            </Link>
            <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ProductList;
