// src/App.js
import { useState } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './Routes';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

function AppContent() {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  const cartItemsCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

    const hideLayoutRoutes = ["/Login", "/Painel"];

  
    const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <Box>
      {!hideLayout && (
        <Header cartItemsCount={cartItemsCount} cart={cart} setCart={setCart} />
      )}

      <AppRoutes cart={cart} setCart={setCart} />

      {!hideLayout && <Footer />}
    </Box>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
