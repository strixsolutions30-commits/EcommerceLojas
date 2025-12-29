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
  Zoom,
  Chip,
  IconButton,
  Rating
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import QuickViewModal from './../components/modaldetalhes'; 

const products = [
  {
    id: 1,
    name: 'Conjunto Florado Elegante',
    price: 289.90, 
    image: 'https://images.unsplash.com/photo-1602303894456-398ce544d90b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBkcmVzcyUyMHdvbWVufGVufDF8fHx8MTc2MzcyMzI0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Florado'],
    category: 'Conjuntos',
    description: 'Conjunto florado perfeito para o verão. Tecido leve e respirável com estampa floral exclusiva.',
    rating: 4.8,
    reviews: 124,
    featured: true
  },
  {
    id: 2,
    name: 'Vestido Preto Elegante',
    price: 159.90,
    image: 'https://www.dicasdemulher.com.br/wp-content/uploads/2018/06/moda-plus-size-62.jpg',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Branco', 'Azul'],
    category: 'Vestidos',
    description: 'Vestido preto para todas as ocasiões. Corte que valoriza a silhueta.',
    rating: 4.5,
    reviews: 89,
    featured: false
  },
  {
    id: 3,
    name: 'Vestido Floral Primavera',
    price: 69.90,
    image: 'https://i.pinimg.com/originals/e1/17/0f/e1170f28cf50743ade50b24cfd75264e.jpg',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Floral'],
    category: 'Vestidos',
    description: 'Vestido floral inspirado na primavera. Ideal para eventos especiais.',
    rating: 4.9,
    reviews: 203,
    featured: true
  },
];

export function PopularProducts({ setCart }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    productName: '',
    severity: 'success'
  });

  const [favorites, setFavorites] = useState(new Set());

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleClick = () => {
    navigate('/Produtos');
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      ...product,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
      quantity: 1,
      cartId: `${product.id}-${product.sizes[0]}-${product.colors[0]}`,
      price: product.price, 
      formattedPrice: `R$ ${product.price.toFixed(2).replace('.', ',')}` 
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(item =>
        item.cartId === cartItem.cartId
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.cartId === cartItem.cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, cartItem];
      }
    });

    // Mostrar Snackbar em vez de alert
    setSnackbar({
      open: true,
      message: `🎉 Adicionado ao carrinho!`,
      productName: product.name,
      severity: 'success'
    });

    // Console bonito (opcional)
    console.log(
      `%c🛒 ${product.name} %cadicionado ao carrinho!`,
      'background: linear-gradient(135deg, #E8B4C0, #D4AF37); color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
      'color: #8B4513; font-weight: bold;'
    );
  };

  // Função para adicionar ao carrinho vinda do modal
  const handleAddToCartFromModal = (product, size, color) => {
    const cartItem = {
      ...product,
      selectedSize: size,
      selectedColor: color,
      quantity: 1,
      cartId: `${product.id}-${size}-${color}`,
      price: product.price, 
      formattedPrice: `R$ ${product.price.toFixed(2).replace('.', ',')}` 
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(item =>
        item.cartId === cartItem.cartId
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.cartId === cartItem.cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, cartItem];
      }
    });

    // Mostrar Snackbar
    setSnackbar({
      open: true,
      message: `🎉 Adicionado ao carrinho!`,
      productName: product.name,
      severity: 'success'
    });
  };

  // Fechar o Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({...snackbar, open: false});
  };

  // Clicar no Snackbar APENAS no mobile (redireciona para carrinho)
  const handleMobileSnackbarClick = () => {
    if (isMobile) {
      navigate('/carrinho');
      setSnackbar({...snackbar, open: false});
    }
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


  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

 
  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        px: { xs: 3, sm: 6, lg: 8 }, 
        background: 'linear-gradient(to bottom, white, #F3E9DD33)',
      }}
    >
      <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: 'gray.800',
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' },
              fontWeight: 'bold'
            }}
          >
           Nossos produtos mais Populares
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'gray.600',
              fontSize: { xs: '1rem', md: '1.1rem', lg: '1.2rem' },
              fontWeight: 400
            }}
          >
            Os favoritos das nossas clientes
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Zoom in={true} style={{ transitionDelay: `${product.id * 100}ms` }}>
                <Card
                  sx={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'white',
                    maxWidth: { xs: '280px', md: '320px', lg: '350px' },
                    margin: '0 auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
                      '& .product-image': {
                        transform: 'scale(1.1)',
                      }
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      aspectRatio: '3/4',
                      overflow: 'hidden',
                      backgroundColor: 'grey.100',
                      height: { xs: '280px', sm: '320px', md: '360px', lg: '400px' }
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      className="product-image"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0)',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.1)',
                        }
                      }}
                    />

                    {product.featured && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
                          color: '#8B4513',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          zIndex: 2,
                          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
                        }}
                      >
                        Destaque
                      </Box>
                    )}

                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'rgba(255,255,255,0.9)',
                        zIndex: 2,
                        '&:hover': {
                          background: 'rgba(255,255,255,1)',
                          transform: 'scale(1.1)'
                        }
                      }}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      {favorites.has(product.id) ? (
                        <FavoriteIcon sx={{ color: '#E8B4C0' }} />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </Box>

                  <CardContent sx={{ 
                    p: 3, 
                    '&:last-child': { pb: 3 },
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Box sx={{ mb: 2, flex: 1 }}>
                      {/* Categoria */}
                      <Chip 
                        label={product.category} 
                        size="small" 
                        sx={{ 
                          mb: 1.5,
                          background: 'linear-gradient(135deg, #E8B4C0 0%, #F7C7D3 100%)',
                          color: 'white',
                          fontWeight: '600',
                          fontSize: '0.7rem'
                        }}
                      />

                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'gray.800',
                          mb: 1,
                          fontWeight: '600',
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          lineHeight: 1.4,
                          minHeight: '48px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {product.name}
                      </Typography>

                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          mb: 2,
                          fontSize: '0.8rem',
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={product.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontSize: '0.75rem' }}>
                          ({product.reviews})
                        </Typography>
                      </Box>

                      <Typography 
                        variant="h5" 
                        sx={{ 
                          color: '#E8B4C0',
                          fontWeight: 'bold',
                          fontSize: { xs: '1.1rem', md: '1.2rem' }
                        }}
                      >
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon sx={{ fontSize: '1rem' }} />}
                        onClick={() => handleQuickView(product)}
                        sx={{
                          flex: 1,
                          borderRadius: '12px',
                          borderColor: '#E8B4C0',
                          color: '#E8B4C0',
                          fontWeight: '600',
                          fontSize: '0.75rem',
                          textTransform: 'none',
                          '&:hover': {
                            borderColor: '#D4AF37',
                            color: '#D4AF37',
                          }
                        }}
                      >
                        Detalhes
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px"
        }}      
      >
        <Button
          variant='contained'
          onClick={handleClick}
          sx={{
            background: "linear-gradient(135deg, #E8B4C0 0%, #F7C7D3 30%, #D4AF37 70%, #FFD700 100%)",
            padding: "14px 36px",
            color: "#8B4513",
            fontWeight: "800",
            borderRadius: "30px",
            transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            boxShadow: "0 6px 20px rgba(232, 180, 192, 0.4)",
            border: "2px solid #D4AF37",
            textTransform: "none",
            letterSpacing: "0.5px",
            position: "relative",
            overflow: "hidden",
            '&:hover': {
              background: "linear-gradient(135deg, #D4AF37 0%, #F7C7D3 40%, #E8B4C0 100%)",
              color: "#8B4513",
              transform: "translateY(-4px) scale(1.02)",
              boxShadow: "0 12px 35px rgba(212, 175, 55, 0.6)",
              border: "2px solid #FFD700",
            }
          }}
        >
          Ver Todos os Produtos
        </Button>
      </Box>

      <QuickViewModal
        product={quickViewProduct}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCartFromModal}
      />
    
      {isMobile ? (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          onClick={handleMobileSnackbarClick}
          anchorOrigin={{ 
            vertical: 'bottom', 
            horizontal: 'center'
          }}
          sx={{
            zIndex: 9999,
            width: '90%',
            marginBottom: 2,
            cursor: 'pointer',
            '&:hover .MuiAlert-root': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 40px rgba(232, 180, 192, 0.4)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          <Alert 
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ 
              width: '100%',
              backgroundColor: '#E8B4C0',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(232, 180, 192, 0.3)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              '& .MuiAlert-icon': {
                color: 'white',
                fontSize: '1.5rem'
              },
              '& .MuiAlert-message': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }
            }}
            icon={<ShoppingCartIcon />}
            action={
              <ArrowForwardIcon 
                sx={{ 
                  color: 'white',
                  fontSize: '1.2rem',
                  opacity: 0.8
                }}
              />
            }
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              <Box>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                  {snackbar.productName}
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', opacity: 0.9 }}>
                  {snackbar.message}
                </Typography>
              </Box>
            </Box>
          </Alert>
        </Snackbar>
      ) : (
        // VERSÃO DESKTOP - Comportamento original
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ 
            vertical: 'bottom', 
            horizontal: 'right'
          }}
          sx={{
            zIndex: 9999
          }}
        >
          <Alert 
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ 
              width: '100%',
              backgroundColor: '#E8B4C0',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(232, 180, 192, 0.3)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              '& .MuiAlert-icon': {
                color: 'white',
                fontSize: '1.5rem'
              },
              '& .MuiAlert-message': {
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShoppingCartIcon sx={{ fontSize: '1.2rem' }} />
              <Box>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                  {snackbar.productName}
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', opacity: 0.9 }}>
                  {snackbar.message}
                </Typography>
              </Box>
            </Box>
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}