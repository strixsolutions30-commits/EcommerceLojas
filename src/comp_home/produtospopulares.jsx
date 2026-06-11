import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  Chip,
  IconButton,
  Rating,
  Container
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const products = [
  {
    id: 1,
    name: 'Regata Fitness Premium',
    price: 89.90,
    originalPrice: 129.90,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop',
    category: 'MASCULINO',
    tag: 'SALE',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Legging High Waist',
    price: 119.90,
    originalPrice: 159.90,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=600&fit=crop',
    category: 'FEMININO',
    tag: 'NOVO',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Camisa Dry Fit',
    price: 69.90,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop',
    category: 'MASCULINO',
    tag: '',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Top Esportivo',
    price: 79.90,
    originalPrice: 99.90,
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&h=600&fit=crop',
    category: 'FEMININO',
    tag: 'SALE',
    rating: 4.8,
  },
  {
    id: 6,
    name: 'Conjunto Fitness',
    price: 159.90,
    originalPrice: 199.90,
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500&h=600&fit=crop',
    category: 'FEMININO',
    tag: 'NOVO',
    rating: 5.0,
  },
  {
    id: 7,
    name: 'Moletom Esportivo',
    price: 149.90,
    originalPrice: 199.90,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&h=600&fit=crop',
    category: 'MASCULINO',
    tag: 'SALE',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Cropped Fitness',
    price: 49.90,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=600&fit=crop',
    category: 'FEMININO',
    tag: '',
    rating: 4.5,
  },
];

export function PopularProducts({ setCart }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const [favorites, setFavorites] = useState(new Set());
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    productName: '',
    severity: 'success'
  });

  const filterButtons = ['TODOS', 'MASCULINO', 'FEMININO', 'SALE'];

  const filteredProducts = products.filter(product => {
    if (activeFilter === 'TODOS') return true;
    if (activeFilter === 'SALE') return product.tag === 'SALE';
    return product.category === activeFilter;
  });

  const handleAddToCart = (product) => {
    const cartItem = {
      ...product,
      selectedSize: 'M',
      quantity: 1,
      cartId: `${product.id}-M`,
      price: product.price,
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.cartId === cartItem.cartId);
      if (existingItem) {
        return prevCart.map(item =>
          item.cartId === cartItem.cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, cartItem];
    });

    setSnackbar({
      open: true,
      message: `Adicionado ao carrinho!`,
      productName: product.name,
      severity: 'success'
    });
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            color: '#000000',
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
            fontWeight: 800,
            textAlign: 'center',
            mb: { xs: 3, md: 4 },
            fontFamily: "'Arial', sans-serif"
          }}
        >
          NOSSOS PRODUTOS
        </Typography>

        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: { xs: 1.5, sm: 3 },
          mb: { xs: 4, md: 5 },
          flexWrap: 'wrap'
        }}>
          {filterButtons.map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              sx={{
                color: activeFilter === filter ? '#000' : '#999',
                borderBottom: activeFilter === filter ? '2px solid #000' : '2px solid transparent',
                borderRadius: 0,
                padding: { xs: '6px 0', sm: '8px 0' },
                fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                fontWeight: activeFilter === filter ? 700 : 500,
                minWidth: 'auto',
                '&:hover': {
                  color: '#000',
                  backgroundColor: 'transparent',
                  borderBottom: '2px solid #000'
                }
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>

        
        <Grid 
          container 
          spacing={{ xs: 2, sm: 2, md: 3 }} 
          justifyContent="center" 
          alignItems="stretch"
        >
          {filteredProducts.map((product) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              key={product.id}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Card sx={{
                borderRadius: 0,
                boxShadow: 'none',
                transition: 'transform 0.3s ease',
                maxWidth: { xs: '100%', sm: '320px', md: '100%' },
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: '280px',
                      objectFit: 'cover',
                      bgcolor: '#f5f5f5'
                    }}
                  />
                  
                  
                  {product.tag && (
                    <Chip
                      label={product.tag}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        bgcolor: '#000',
                        color: '#FFD700',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        borderRadius: 0
                      }}
                    />
                  )}

                 
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      borderRadius: 0,
                      '&:hover': { bgcolor: 'white' }
                    }}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favorites.has(product.id) ? (
                      <FavoriteIcon sx={{ color: '#FF0000', fontSize: '1.2rem' }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ fontSize: '1.2rem' }} />
                    )}
                  </IconButton>
                </Box>

                <CardContent sx={{ 
                  px: 0, 
                  pb: 1, 
                  pt: 1.5,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Typography sx={{ 
                    fontSize: '0.7rem', 
                    color: '#999', 
                    mb: 0.5,
                    letterSpacing: '0.5px'
                  }}>
                    {product.category}
                  </Typography>
                  
                  <Typography sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                    mb: 1,
                    lineHeight: 1.3,
                    minHeight: '40px'
                  }}>
                    {product.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {product.originalPrice && (
                      <Typography sx={{ 
                        fontSize: '0.75rem', 
                        color: '#999', 
                        textDecoration: 'line-through' 
                      }}>
                        R$ {product.originalPrice.toFixed(2)}
                      </Typography>
                    )}
                    <Typography sx={{ 
                      fontWeight: 700, 
                      fontSize: { xs: '0.9rem', sm: '1rem' }, 
                      color: '#000' 
                    }}>
                      R$ {product.price.toFixed(2)}
                    </Typography>
                  </Box>

                  <Rating 
                    value={product.rating} 
                    size="small" 
                    readOnly 
                    precision={0.5}
                    sx={{ mb: 1.5 }}
                  />
                  
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCartIcon sx={{ fontSize: '1rem' }} />}
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      bgcolor: '#000',
                      borderRadius: 0,
                      py: 0.8,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      '&:hover': { bgcolor: '#333' },
                      mt: 'auto'
                    }}
                  >
                    COMPRAR
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            bgcolor: '#000', 
            color: '#FFD700',
            '& .MuiAlert-icon': {
              color: '#FFD700'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}