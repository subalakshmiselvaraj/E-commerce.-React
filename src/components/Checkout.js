import React, { useContext, useState } from 'react';
import { Container, Typography, Button, TextField, Grid } from '@mui/material';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handleShippingInfoChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    // Normally, you would send the order data to your server or process payment here
    alert('Order placed successfully!');
    navigate('/'); // Redirect to home after placing the order
  };

  // Calculate total price by multiplying the price of each item by its quantity
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container className="checkout-container">
      <Typography variant="h4" gutterBottom className="checkout-title">Checkout</Typography>

      {/* Shipping Information Form */}
      <Typography variant="h6" gutterBottom>Shipping Information</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Address"
            fullWidth
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="City"
            fullWidth
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Postal Code"
            fullWidth
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Country"
            fullWidth
            name="country"
            value={shippingInfo.country}
            onChange={handleShippingInfoChange}
          />
        </Grid>
      </Grid>

      {/* Payment Method */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Payment Method</Typography>
      <TextField
        required
        label="Payment Method"
        fullWidth
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />

      {/* Order Summary */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Order Summary</Typography>
      <div className="cart-summary">
        {cart.map((item, index) => (
          <Typography key={index}>
            {item.title} - ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        ))}
        <Typography variant="h6" style={{ marginTop: '10px' }}>
          Total: ${totalPrice.toFixed(2)}
        </Typography>
      </div>

      {/* Place Order Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '20px' }}
        className="place-order-button"
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default Checkout;
