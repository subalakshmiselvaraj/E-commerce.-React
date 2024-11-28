import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  // Fetch product details based on the ID from the URL
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography>Loading product details...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4">{product.title}</Typography>
      <img src={product.image} alt={product.title} style={{ width: '100%', maxWidth: '400px', height: 'auto' }} />
      <Typography variant="h6">${product.price}</Typography>
      <Typography variant="body1">{product.description}</Typography>
      
      <Button variant="contained" color="primary">
        Add to Cart
      </Button>
    </Container>
  );
};

export default ProductDetails;
