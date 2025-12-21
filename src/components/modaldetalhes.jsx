import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  CardMedia,
  Stack,
  Chip,
  Rating,
  Divider,
  Fade,
  useMediaQuery,
  useTheme,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Close,
  AddShoppingCart,
  FavoriteBorder,
  Share,
  LocalShipping,
  Security,
  CheckCircle,
  Error
} from '@mui/icons-material';

const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);


  useEffect(() => {
    if (product) {
      setSelectedSize(null);
      setSelectedColor(null);
      setShowError(false);
      setErrorMessage('');
    }
  }, [product]); 


  const handleClose = () => {
    setSelectedSize(null);
    setSelectedColor(null);
    setShowError(false);
    setErrorMessage('');
    onClose();
  };

  if (!product) return null;

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setShowError(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowError(false);
  };

  const validateSelection = () => {
    if (!selectedSize && !selectedColor) {
      setErrorMessage('Por favor, selecione um tamanho e uma cor.');
      return false;
    }
    
    if (!selectedSize) {
      setErrorMessage('Por favor, selecione um tamanho.');
      return false;
    }
    
    if (!selectedColor) {
      setErrorMessage('Por favor, selecione uma cor.');
      return false;
    }
    
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelection()) {
      setShowError(true);
      return;
    }

    if (onAddToCart) {
      onAddToCart(product, selectedSize, selectedColor);
    }
    

    handleClose();
  };

  const isButtonDisabled = !selectedSize || !selectedColor;

  return (
    <>
      <Dialog 
        open={!!product} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: isMobile ? '12px' : '16px',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            border: '1px solid rgba(232, 180, 192, 0.2)',
            margin: isMobile ? 1 : 2,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: isMobile ? 'calc(100vh - 16px)' : '90vh', 
            overflow: 'hidden'
          }
        }}
      >
        <Fade in={!!product}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              background: 'linear-gradient(135deg, #F7C7D3 0%, #F3E9DD 100%)',
              color: 'white',
              py: isMobile ? 1.5 : 2,
              px: isMobile ? 2 : 3,
              gap: 1,
              flexShrink: 0 
            }}>
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                sx={{ 
                  fontWeight: 'bold',
                  lineHeight: 1.3,
                  flex: 1,
                  fontSize: isMobile ? '0.9rem' : '1.1rem' 
                }}
              >
                {product.name}
              </Typography>
              <IconButton 
                onClick={handleClose} 
                sx={{ 
                  color: 'white',
                  padding: isMobile ? '4px' : '6px', 
                  flexShrink: 0
                }}
              >
                <Close sx={{ fontSize: isMobile ? '1.2rem' : '1.3rem' }} /> 
              </IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ 
              p: isMobile ? 2 : 2.5, 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              minHeight: 0
            }}>
              <Stack spacing={isMobile ? 2 : 2.5} sx={{ height: '100%', minHeight: 0 }}> 
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Box sx={{ 
                    position: 'relative', 
                    width: '100%', 
                    maxWidth: isMobile ? '280px' : '280px' 
                  }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{ 
                        borderRadius: isMobile ? '8px' : '10px', 
                        width: '100%',
                        height: isMobile ? '200px' : '220px', 
                        objectFit: 'cover',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                      }}
                    />
                    {product.featured && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: isMobile ? 8 : 10, 
                          left: isMobile ? 8 : 10, 
                          background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
                          color: '#8B4513',
                          padding: isMobile ? '3px 8px' : '3px 10px', 
                          borderRadius: isMobile ? '6px' : '7px', 
                          fontSize: isMobile ? '0.7rem' : '0.7rem', 
                          fontWeight: 'bold',
                        }}
                      >
                        Destaque
                      </Box>
                    )}
                  </Box>
                </Box>

                <Stack spacing={isMobile ? 1.5 : 1.8} sx={{ flex: 1, overflow: 'hidden', minHeight: 0 }}> 
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    gap: 1
                  }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant={isMobile ? "h5" : "h5"} 
                        sx={{ 
                          fontWeight: 'bold',
                          background: 'linear-gradient(135deg, #E8B4C0 0%, #D4AF37 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: isMobile ? '1.5rem' : '1.6rem' 
                        }}
                      >
                        R$ {product.price.toFixed(2)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-end',
                      gap: 0.5
                    }}>
                      <Rating 
                        value={product.rating} 
                        size={isMobile ? "small" : "small"} 
                        readOnly 
                      />
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }} 
                      >
                        ({product.reviews})
                      </Typography>
                    </Box>
                  </Box>

                  <Typography 
                    variant={isMobile ? "body2" : "body2"} 
                    sx={{ 
                      lineHeight: 1.5,
                      fontSize: isMobile ? '0.8rem' : '0.85rem', 
                      display: '-webkit-box',
                      WebkitLineClamp: isMobile ? 2 : 2, 
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flexShrink: 1
                    }}
                  >
                    {product.description}
                  </Typography>

                  <Divider sx={{ my: isMobile ? 0.5 : 0.8 }} /> 

                  
                  {showError && (
                    <Alert 
                      severity="warning" 
                      icon={<Error />}
                      sx={{
                        fontSize: isMobile ? '0.7rem' : '0.75rem',
                        py: 0.5,
                        '& .MuiAlert-icon': {
                          fontSize: isMobile ? '1rem' : '1.1rem'
                        }
                      }}
                    >
                      {errorMessage}
                    </Alert>
                  )}

                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row', 
                    gap: isMobile ? 1 : 1.5, 
                    flexShrink: 0
                  }}>
                   
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        mb: 0.5
                      }}>
                        <Typography 
                          variant={isMobile ? "caption" : "caption"} 
                          gutterBottom 
                          sx={{ 
                            fontWeight: '600',
                            fontSize: isMobile ? '0.75rem' : '0.8rem',
                            color: !selectedColor ? '#f44336' : 'inherit'
                          }}
                        >
                          {!selectedColor ? '⚠️ Selecione uma cor' : 'Cor selecionada'}
                        </Typography>
                        {selectedColor && (
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.3
                          }}>
                            <CheckCircle sx={{ 
                              fontSize: isMobile ? '0.7rem' : '0.75rem', 
                              color: '#28a745' 
                            }} />
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontWeight: '600',
                                fontSize: isMobile ? '0.65rem' : '0.7rem',
                                color: '#28a745'
                              }}
                            >
                              {selectedColor}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {product.colors.slice(0, isMobile ? 2 : 3).map((color, index) => (
                          <Chip 
                            key={index} 
                            label={color}
                            size={isMobile ? "small" : "small"} 
                            onClick={() => handleColorSelect(color)}
                            sx={{
                              borderColor: selectedColor === color ? '#E8B4C0' : '#e0e0e0',
                              backgroundColor: selectedColor === color ? '#FFF0F3' : 'transparent',
                              color: selectedColor === color ? '#E8B4C0' : '#666666',
                              fontWeight: selectedColor === color ? '700' : '500',
                              fontSize: isMobile ? '0.7rem' : '0.75rem', 
                              mb: 0.5,
                              height: isMobile ? '24px' : '26px',
                              cursor: 'pointer',
                              borderWidth: selectedColor === color ? 2 : 1,
                              '&:hover': {
                                borderColor: '#E8B4C0',
                                backgroundColor: '#FFF0F3'
                              }
                            }}
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Box>

      
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        mb: 0.5
                      }}>
                        <Typography 
                          variant={isMobile ? "caption" : "caption"} 
                          gutterBottom 
                          sx={{ 
                            fontWeight: '600',
                            fontSize: isMobile ? '0.75rem' : '0.8rem',
                            color: !selectedSize ? '#f44336' : 'inherit'
                          }}
                        >
                          {!selectedSize ? '⚠️ Selecione um tamanho' : 'Tamanho selecionado'}
                        </Typography>
                        {selectedSize && (
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.3
                          }}>
                            <CheckCircle sx={{ 
                              fontSize: isMobile ? '0.7rem' : '0.75rem', 
                              color: '#28a745' 
                            }} />
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontWeight: '600',
                                fontSize: isMobile ? '0.65rem' : '0.7rem',
                                color: '#28a745'
                              }}
                            >
                              {selectedSize}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {product.sizes.slice(0, isMobile ? 3 : 4).map((size, index) => (
                          <Chip 
                            key={index} 
                            label={size}
                            size={isMobile ? "small" : "small"} 
                            onClick={() => handleSizeSelect(size)}
                            sx={{
                              borderColor: selectedSize === size ? '#D4AF37' : '#e0e0e0',
                              backgroundColor: selectedSize === size ? '#FFF8E1' : 'transparent',
                              color: selectedSize === size ? '#D4AF37' : '#666666',
                              fontWeight: selectedSize === size ? '700' : '500',
                              fontSize: isMobile ? '0.7rem' : '0.75rem', 
                              mb: 0.5,
                              height: isMobile ? '24px' : '26px', 
                              minWidth: isMobile ? '30px' : '32px',
                              cursor: 'pointer',
                              borderWidth: selectedSize === size ? 2 : 1,
                              '&:hover': {
                                borderColor: '#D4AF37',
                                backgroundColor: '#FFF8E1'
                              }
                            }}
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    gap: isMobile ? 1 : 1.5, 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    flexShrink: 0
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5,
                      flex: isMobile ? 1 : 'auto'
                    }}>
                      <LocalShipping sx={{ 
                        fontSize: isMobile ? '1rem' : '1.1rem', 
                        color: '#E8B4C0' 
                      }} />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: '600',
                          fontSize: isMobile ? '0.7rem' : '0.75rem' 
                        }}
                      >
                        Frete Grátis
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5,
                      flex: isMobile ? 1 : 'auto'
                    }}>
                      <Security sx={{ 
                        fontSize: isMobile ? '1rem' : '1.1rem', 
                        color: '#D4AF37' 
                      }} />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: '600',
                          fontSize: isMobile ? '0.7rem' : '0.75rem' 
                        }}
                      >
                        100% Seguro
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Stack>
            </DialogContent>
            
            <DialogActions sx={{ 
              p: isMobile ? 1.5 : 2, 
              pt: isMobile ? 1 : 1.5, 
              gap: isMobile ? 0.5 : 0.8,
              borderTop: '1px solid rgba(232, 180, 192, 0.2)',
              flexShrink: 0
            }}>
              <Button 
                startIcon={<FavoriteBorder sx={{ fontSize: isMobile ? '1rem' : '1.1rem' }} />} 
                size={isMobile ? "small" : "small"} 
                sx={{
                  borderColor: '#E8B4C0',
                  color: '#E8B4C0',
                  fontWeight: '600',
                  fontSize: isMobile ? '0.7rem' : '0.75rem', 
                  padding: isMobile ? '4px 8px' : '5px 10px', 
                  minWidth: 'auto',
                  '&:hover': {
                    borderColor: '#D4AF37',
                    color: '#D4AF37'
                  }
                }}
                variant="outlined"
              >
                {isMobile ? '' : 'Favoritar'}
              </Button>
              
              <Button 
                startIcon={<Share sx={{ fontSize: isMobile ? '1rem' : '1.1rem' }} />} 
                size={isMobile ? "small" : "small"} 
                sx={{
                  borderColor: '#D4AF37',
                  color: '#D4AF37',
                  fontWeight: '600',
                  fontSize: isMobile ? '0.7rem' : '0.75rem', 
                  padding: isMobile ? '4px 8px' : '5px 10px', 
                  minWidth: 'auto',
                  '&:hover': {
                    borderColor: '#E8B4C0',
                    color: '#E8B4C0'
                  }
                }}
                variant="outlined"
              >
                {isMobile ? '' : 'Compartilhar'}
              </Button>
              
              <Button 
                variant="contained"
                startIcon={<AddShoppingCart sx={{ fontSize: isMobile ? '1rem' : '1.1rem' }} />} 
                onClick={handleAddToCart}
                size={isMobile ? "small" : "small"} 
                disabled={isButtonDisabled}
                sx={{
                  flex: 1,
                  background: isButtonDisabled 
                    ? 'linear-gradient(135deg, #cccccc 0%, #999999 100%)'
                    : 'linear-gradient(135deg, #E8B4C0 0%, #D4AF37 100%)',
                  boxShadow: isButtonDisabled 
                    ? 'none'
                    : '0 4px 15px rgba(232, 180, 192, 0.3)',
                  fontWeight: '600',
                  fontSize: isMobile ? '0.75rem' : '0.8rem', 
                  padding: isMobile ? '6px 12px' : '7px 14px', 
                  textTransform: 'none',
                  '&:hover': !isButtonDisabled && {
                    background: 'linear-gradient(135deg, #D4AF37 0%, #E8B4C0 100%)',
                    boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)',
                  },
                  '&.Mui-disabled': {
                    background: '#e0e0e0',
                    color: '#9e9e9e'
                  }
                }}
              >
                {isMobile ? 'Comprar' : 'Adicionar ao Carrinho'}
              </Button>
            </DialogActions>
          </Box>
        </Fade>
      </Dialog>

    
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="warning" 
          onClose={() => setShowError(false)}
          sx={{ 
            width: '100%',
            alignItems: 'center',
            fontSize: isMobile ? '0.8rem' : '0.9rem'
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuickViewModal;