import React, { useContext } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>

      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <Typography variant="h6">
              {item.title} - ${item.price} x {item.quantity}
            </Typography>
            <div>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => decrementQuantity(index)} // Decrease quantity
                style={{ marginRight: '10px' }}
              >
                -
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => incrementQuantity(index)} // Increase quantity
                style={{ marginRight: '10px' }}
              >
                +
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => removeFromCart(index)} // Remove item
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
          component={Link}
          to="/checkout"
        >
          Proceed to Checkout
        </Button>
      )}
    </Container>
  );
};

export default Cart;
