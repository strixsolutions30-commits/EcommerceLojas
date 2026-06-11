import { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Chip,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  Stack,
  Badge,
  Fade,
  Zoom,
  Slide,
  Avatar,
  Rating,
  Divider,
  Alert,
  Snackbar 
} from '@mui/material';
import {
  Search,
  FilterList,
  Close,
  KeyboardArrowDown,
  AddShoppingCart,
  Visibility,
  Favorite,
  FavoriteBorder,
  Share,
  LocalShipping,
  Security,
  Star,
  StarHalf,
  ArrowForward
} from '@mui/icons-material';
import QuickViewModal from '../../components/modaldetalhes';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom'; 

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';


import imgswiper1 from '../../assets/basic-oversized-marmorizada.webp';
import imgswiper2 from '../../assets/cropped-basic-branca.png';
import imgswiper3 from '../../assets/regata.webp';
import imgswiper4 from '../../assets/imgswiper4.jpg';
import imgswiper5 from '../../assets/imgswiper5.webp';


import item1 from '../../assets/item1.png';

const images = [imgswiper1, imgswiper2, imgswiper3,imgswiper4,imgswiper5];

const products = [
  {
    id: 1,
    name: 'Camiseta Oversized Basic Marmorizada',
    price: 139.90,
    image: item1,
    category: 'Oversized',
    colors: ['Rosa', 'Branco', 'Azul'],
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Vestido elegante com estampa floral delicada, perfeito para a primavera. Tecido leve e confortável com acabamento premium.',
    rating: 4.8,
    reviews: 124,
    featured: true
  },
  {
    id: 2,
    name: 'Camiseta Oversized Basic Azul',
    price: 129.90,
    image: '#',
    colors: ['Bege', 'Preto', 'Marrom'],
    sizes: ['P', 'M', 'G'],
    description: 'Confeccionada em 100% algodão , proporcionando toque extremamente macio, conforto e durabilidade para o uso diário.',
    rating: 4.5,
    reviews: 89,
    featured: false
  },
  {
    id: 3,
     name: 'Camiseta Oversized Basic Preta',
    price: 89.90,
    image: '#',
    category: 'Acessórios',
    colors: ['Dourado', 'Prateado', 'Rose'],
    sizes: ['Único'],
    description: 'Colar minimalista com acabamento premium. Complemento perfeito para qualquer look.',
    rating: 4.9,
    reviews: 203,
    featured: true
  },
  {
    id: 4,
    name: 'Camiseta Oversized Basic Branca',
    price: 349.90,
    image: '#',
    category: 'Calçados',
    colors: ['Nude', 'Preto', 'Vermelho'],
    sizes: ['34', '35', '36', '37', '38', '39'],
    description: 'Descrição',
    rating: 4.7,
    reviews: 156,
    featured: true
  },
  {
    id: 5,
    name: 'Camiseta Oversized Basic Marrom',
    price: 259.90,
    image: '#',
    category: 'Vestidos',
    colors: ['Branco', 'Amarelo', 'Rosa'],
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Descrição.',
    rating: 4.6,
    reviews: 78,
    featured: false
  },
  {
    id: 6,
    name: 'Cropped Basic Areia',
    price: 149.90,
    image: '#',
    category: 'Casuais',
    colors: ['Branco', 'Preto', 'Azul'],
    sizes: ['P', 'M', 'G'],
    description: 'Descrição.',
    rating: 4.4,
    reviews: 92,
    featured: false
  },
  {
    id: 7,
    name: 'Cropped Basic Branca',
    price: 179.90,
    image: '#',
    category: 'Casuais',
    colors: ['Preto', 'Bege', 'Vinho'],
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Descrição.',
    rating: 4.5,
    reviews: 67,
    featured: false
  },
  {
    id: 8,
    name: 'Cropped Basic Marrom',
    price: 429.90,
    image: '#',
    category: 'Acessórios',
    colors: ['Preto', 'Caramelo', 'Branco'],
    sizes: ['Único'],
    description: 'Descrição.',
    rating: 4.8,
    reviews: 145,
    featured: true
  },
  {
    id: 9,
    name: 'Camiseta Oversized Premium Preta Iron Athletics',
    price: 449.90,
    image: '#',
    category: 'Vestidos',
    colors: ['Rosa', 'Nude', 'Azul Marinho'],
    sizes: ['P', 'M', 'G'],
    description: 'Descrição.',
    rating: 4.9,
    reviews: 201,
    featured: true
  },
  {
    id: 10,
    name: 'Camiseta Oversized Azul Marinho Felipi Fernandes',
    price: 279.90,
    image: '#',
    category: 'Calçados',
    colors: ['Preto', 'Nude', 'Prata'],
    sizes: ['34', '35', '36', '37', '38', '39'],
    description: 'Descrição.',
    rating: 4.6,
    reviews: 112,
    featured: false
  },
  {
    id: 11,
    name: 'Brinco Argola Delicado',
    price: 69.90,
    image: '#',
    category: 'Acessórios',
    colors: ['Dourado', 'Prateado'],
    sizes: ['Único'],
    description: 'Descrição.',
    rating: 4.7,
    reviews: 178,
    featured: false
  },
  {
    id: 12,
    name: 'Calça Wide Leg Elegante',
    price: 229.90,
    image: '#',
    category: 'Casuais',
    colors: ['Preto', 'Bege', 'Branco'],
    sizes: ['36', '38', '40', '42'],
    description: 'Descrição.',
    rating: 4.5,
    reviews: 84,
    featured: false
  },
];

function ProductsPage({ initialCategory, cart, setCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'Todos');
  const [selectedPriceRange, setSelectedPriceRange] = useState('Todos');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      productName: '',
      severity: 'success'
    });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = () => {
    navigate('/Produtos');
  };


  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory, setSelectedCategory]);

  const categories = ['Todos', 'Vestidos', 'Casuais', 'Acessórios', 'Calçados'];
  const priceRanges = [
    { label: 'Todos', min: 0, max: Infinity },
    { label: 'Até R$ 100', min: 0, max: 100 },
    { label: 'R$ 100 - R$ 200', min: 100, max: 200 },
    { label: 'R$ 200 - R$ 300', min: 200, max: 300 },
    { label: 'Acima de R$ 300', min: 300, max: Infinity },
  ];

   const addToCart = (product, size, color) => {
    const cartItem = {
      ...product,
      selectedSize: size || product.sizes[0],
      selectedColor: color || product.colors[0],
      quantity: 1,
      cartId: `${product.id}-${size || product.sizes[0]}-${color || product.colors[0]} `
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item =>
        item.cartId === cartItem.cartId
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.cartId === cartItem.cartId
          ? { ...item, quantity: item.quantity + 1}
          : item
        );
      } else {
        return [...prevCart, cartItem];
      }
    });

     setSnackbar({
      open: true,
      message: `🎉 Adicionado ao carrinho!`,
      productName: product.name,
      severity: 'success'
    });

    
    console.log(
      `%c🛒 ${product.name} %cadicionado ao carrinho!`,
      'background: linear-gradient(135deg, #E8B4C0, #D4AF37); color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
      'color: #8B4513; font-weight: bold;'
    );    
   };

   const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({...snackbar, open: false});
  };

   const handleMobileSnackbarClick = () => {
    if (isMobile) {
      navigate('/carrinho');
      setSnackbar({...snackbar, open: false});
    }
  };
    

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      
      const priceRange = priceRanges.find(r => r.label === selectedPriceRange);
      const matchesPrice = !priceRange || (product.price >= priceRange.min && product.price <= priceRange.max);

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedPriceRange, sortBy, priceRanges]);

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

  const activeFiltersCount = 
    (selectedCategory !== 'Todos' ? 1 : 0) +
    (selectedPriceRange !== 'Todos' ? 1 : 0);


    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);   

  const ProductCard = ({ product, onQuickView }) => (
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
                    background: 'black',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    zIndex: 2,
                    boxShadow: '0 10px 12px black'
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
                <Favorite sx={{ color: 'black' }} />
                ) : (
                <FavoriteBorder />
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
                    background: 'black',
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
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: { xs: '1.1rem', md: '1.2rem' }
                }}
                >
                R$ {product.price.toFixed(2)}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                <Button
                variant="outlined"
                size="small"
                startIcon={<Visibility sx={{ fontSize: '1rem' }} />}
                onClick={() => onQuickView(product)}
                sx={{
                    flex: 1,
                    borderRadius: '12px',
                    borderColor: 'white',
                    backgroundColor: 'black',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    textTransform: 'none',
                    '&:hover': {
                    borderColor: 'black',
                    backgroundColor: 'white',
                    color: 'black',
                    }
                }}
                >
                Ver mais
                </Button>
            </Box>
            </CardContent>
        </Card>
        </Zoom>
  );


  return (
      /*Container Pai do Swiper no Header*/
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)',
        opacity: 0.9,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '400px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 0%, #000000 100%)',
          zIndex: 0
        
        }
      }}>
        <Box
          sx={{
            background: 'black',
            height: '30vh',
            position: 'relative',
            overflow: 'hidden',
            
          }}
        >
  
  
          <Container 
              maxWidth="lg" 
              
              sx={{ position: 'relative', zIndex: 1,background:'white' }}>
    <Slide direction="down" in={true} timeout={800}>
      <Box sx={{ textAlign: 'center', maxWidth: '1000px', mx: 'auto', position: 'relative' }}>
  
        {/* SWIPER DE IMAGENS */}
        <Box sx={{ mb: 4 }}>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500 }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <Box
                  component="img"
                  src={img}
                  alt={`slide-${index}`}
                  sx={{
                    width: '100%',
                    height: { md: 380 },
                    objectFit: 'cover',
                    borderRadius: 3,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
  
        {/* DECORAÇÃO */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '-30px',
            left: '-20px',
            fontSize: '3rem',
            opacity: 0.1,
            animation: 'float 4s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-15px) rotate(10deg)' }
            }
          }}
        />
  
      </Box>
    </Slide>
  </Container>
  
        </Box>
  
        <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
          
          <Fade in={true} timeout={1000}>
            <Box>
              <Card sx={{ 
                p: 4, 
                mb: 6, 
                borderRadius: '24px',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}>
                <Stack spacing={4}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        placeholder="Buscar produtos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search sx={{ color: 'black' }} />
                            </InputAdornment>
                          ),
                          endAdornment: searchQuery && (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setSearchQuery('')}>
                                <Close />
                              </IconButton>
                            </InputAdornment>
                          ),
                          sx: { 
                            borderRadius: '16px',
                            background: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(232, 180, 192, 0.3)'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'black'
                            }
                          }
                        }}
                      />
                    </Grid>
  
                    <Grid item xs={6} md={0} sx={{ display: { xs: 'block', md: 'none' } }}>
                      <Badge badgeContent={activeFiltersCount} color="primary">
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<FilterList />}
                          onClick={() => setShowFilters(!showFilters)}
                          sx={{
                            borderRadius: '16px',
                            borderColor: 'black',
                            color: 'black',
                            '&:hover': {
                              borderColor:'black',
                              color: 'black'
                            }
                          }}
                        >
                          Filtros
                        </Button>
                      </Badge>
                    </Grid>
  
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth>
                        <Select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          displayEmpty
                          IconComponent={KeyboardArrowDown}
                          sx={{ 
                            borderRadius: '16px',
                            background: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'black'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'black'
                            }
                          }}
                        >
                          <MenuItem value="newest">Mais Recentes</MenuItem>
                          <MenuItem value="price-low">Menor Preço</MenuItem>
                          <MenuItem value="price-high">Maior Preço</MenuItem>
                          <MenuItem value="name">Nome A-Z</MenuItem>
                          <MenuItem value="rating">Melhor Avaliado</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
  
                  <Box sx={{ display: { xs: showFilters ? 'block' : 'none', md: 'block' } }}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#2c3e50' }}>
                          Categoria
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                          {categories.map((category) => (
                            <Chip
                              key={category}
                              label={category}
                              onClick={() => setSelectedCategory(category)}
                              sx={{
                                background: selectedCategory === category 
                                  ? 'black'
                                  : 'transparent',
                                color: selectedCategory === category ? 'white' : 'black',
                                border: '2px solid black',
                                fontWeight: '600',
                                '&:hover': {
                                  background: 'black',
                                  color: 'white',
                                  borderColor: 'black'
                                }
                              }}
                            />
                          ))}
                        </Stack>
                      </Grid>
  
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#2c3e50' }}>
                          Preço
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                          {priceRanges.map((range) => (
                            <Chip
                              key={range.label}
                              label={range.label}
                              onClick={() => setSelectedPriceRange(range.label)}
                              sx={{
                                background: selectedPriceRange === range.label 
                                  ? 'black'
                                  : 'transparent',
                                color: selectedPriceRange === range.label ? 'white' : 'black',
                                border: '2px solid black',
                                fontWeight: '600',
                                '&:hover': {
                                  background: 'black',
                                  color: 'white',
                                  borderColor: 'black'
                                }
                              }}
                            />
                          ))}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Card>
            </Box>
          </Fade>
  
        
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </Typography>
            {(selectedCategory !== 'Todos' || selectedPriceRange !== 'Todos' || searchQuery) && (
              <Button
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSelectedPriceRange('Todos');
                  setSearchQuery('');
                }}
                startIcon={<Close />}
                sx={{ 
                  color: 'white', 
                  fontWeight: '900',
                  '&:hover': { 
                    background: 'white',
                    color: 'black',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                Limpar Filtros
              </Button>
            )}
          </Box>
  
         
         {filteredProducts.length > 0 ? (
              <Grid 
                  container 
                  spacing={3}
                  sx={{
                  justifyContent: { xs: 'center', sm: 'flex-start' }
                  }}
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
                      <ProductCard
                      product={product}
                      onQuickView={setSelectedProduct}
                      />
                  </Grid>
                  ))}
              </Grid>
              ) : (
              <Fade in={true}>
                  <Box sx={{ textAlign: 'center', py: 12 }}>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 2 }}>
                      Nenhum produto encontrado
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#7f8c8d', mb: 4 }}>
                      Tente ajustar os filtros ou a busca
                  </Typography>
                  <Button
                      variant="contained"
                      onClick={() => {
                      setSelectedCategory('Todos');
                      setSelectedPriceRange('Todos');
                      setSearchQuery('');
                      }}
                      endIcon={<ArrowForward />}
                      sx={{
                      background: 'black',
                      boxShadow: '0 8px 25px rgba(232, 180, 192, 0.3)',
                      fontWeight: '600',
                      px: 4,
                      py: 1.5,
                      borderRadius: '16px',
                      '&:hover': {
                          background: 'black)',
                          boxShadow: '0 12px 35px rgba(212, 175, 55, 0.4)',
                          transform: 'translateY(-2px)'
                      }
                      }}
                  >
                      Ver Todos os Produtos
                  </Button>
                  </Box>
              </Fade>
              )}
        </Container>
  
         <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart} 
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
                      backgroundColor: 'black',
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
                      backgroundColor: 'black',
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
  
  export default ProductsPage;