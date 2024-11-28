import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { CartContext } from '../context/CartContext';
import '../styles/Header.css';
const Header = () => {
  const { cart } = useContext(CartContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>My ECommerce Store</Link>
        </Typography>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit">Login</Button>
        </Link>
        <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit">Sign Up</Button>
        </Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit">Cart ({cart.length})</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
