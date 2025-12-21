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
  Divider,
  Fade,
  useMediaQuery,
  useTheme,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Close,
  Add,
  Remove,
  Delete,
  ShoppingBag,
  LocalShipping,
  Security,
  FavoriteBorder,
  ArrowForward
} from '@mui/icons-material';

const CartModal = ({ 
  cart = [], 
  isOpen, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  onContinueShopping 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isOpen) return null;

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = cartTotal > 100 ? 0 : 15.90;
  const total = cartTotal + shipping;

  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    if (onUpdateQuantity) {
      onUpdateQuantity(item, newQuantity);
    }
  };

  const handleRemoveItem = (item) => {
    if (onRemoveItem) {
      onRemoveItem(item);
    }
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
    onClose();
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
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
      <Fade in={isOpen}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
          {/* Header */}
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            background: 'linear-gradient(135deg, #F7C7D3 0%, #F3E9DD 100%)',
            color: 'white',
            py: isMobile ? 1.5 : 2,
            px: isMobile ? 2 : 3,
            gap: 1,
            flexShrink: 0 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Badge 
                badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    background: 'linear-gradient(135deg, #D4AF37 0%, #E8B4C0 100%)',
                    color: 'white',
                    fontWeight: 'bold'
                  }
                }}
              >
                <ShoppingBag sx={{ fontSize: isMobile ? '1.3rem' : '1.5rem' }} />
              </Badge>
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.9rem' : '1.1rem' 
                }}
              >
                Meu Carrinho
              </Typography>
            </Box>
            <IconButton 
              onClick={onClose} 
              sx={{ 
                color: 'white',
                padding: isMobile ? '4px' : '6px',
                flexShrink: 0
              }}
            >
              <Close sx={{ fontSize: isMobile ? '1.2rem' : '1.3rem' }} />
            </IconButton>
          </DialogTitle>

          {/* Content */}
          <DialogContent sx={{ 
            p: isMobile ? 2 : 2.5, 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            minHeight: 0
          }}>
            {cart.length === 0 ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                gap: 2
              }}>
                <ShoppingBag sx={{ 
                  fontSize: isMobile ? '3rem' : '4rem', 
                  color: 'rgba(232, 180, 192, 0.3)' 
                }} />
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  sx={{ 
                    color: 'text.secondary',
                    fontWeight: '600'
                  }}
                >
                  Carrinho Vazio
                </Typography>
                <Typography 
                  variant={isMobile ? "body2" : "body1"} 
                  sx={{ 
                    color: 'text.secondary',
                    maxWidth: '300px'
                  }}
                >
                  Adicione alguns produtos incríveis ao seu carrinho!
                </Typography>
              </Box>
            ) : (
              <Stack spacing={isMobile ? 2 : 2.5} sx={{ height: '100%', minHeight: 0 }}>
                {/* Cart Items */}
                <Box sx={{ 
                  flex: 1,
                  overflow: 'auto',
                  minHeight: 0
                }}>
                  <List sx={{ py: 0 }}>
                    {cart.map((item, index) => (
                      <Box key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}>
                        <ListItem sx={{ 
                          px: 0,
                          py: isMobile ? 1.5 : 2,
                          alignItems: 'flex-start'
                        }}>
                          {/* Product Image */}
                          <ListItemIcon sx={{ 
                            minWidth: 'auto', 
                            mr: isMobile ? 1.5 : 2 
                          }}>
                            <Box sx={{ 
                              position: 'relative',
                              width: isMobile ? 60 : 70,
                              height: isMobile ? 60 : 70,
                              borderRadius: '8px',
                              overflow: 'hidden',
                              flexShrink: 0
                            }}>
                              <CardMedia
                                component="img"
                                image={item.image}
                                alt={item.name}
                                sx={{ 
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                              <Chip
                                label={item.quantity}
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: -6,
                                  right: -6,
                                  minWidth: 20,
                                  height: 20,
                                  fontSize: '0.7rem',
                                  fontWeight: 'bold',
                                  background: 'linear-gradient(135deg, #E8B4C0 0%, #D4AF37 100%)',
                                  color: 'white'
                                }}
                              />
                            </Box>
                          </ListItemIcon>

                          {/* Product Details */}
                          <ListItemText
                            primary={
                              <Typography 
                                variant={isMobile ? "body2" : "body1"} 
                                sx={{ 
                                  fontWeight: '600',
                                  lineHeight: 1.3,
                                  mb: 0.5
                                }}
                              >
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <Box sx={{ mt: 0.5 }}>
                                <Stack spacing={0.5}>
                                  <Typography 
                                    variant="caption" 
                                    sx={{ 
                                      color: 'text.secondary',
                                      display: 'block'
                                    }}
                                  >
                                    {item.selectedColor} • {item.selectedSize}
                                  </Typography>
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      fontWeight: 'bold',
                                      background: 'linear-gradient(135deg, #E8B4C0 0%, #D4AF37 100%)',
                                      backgroundClip: 'text',
                                      WebkitBackgroundClip: 'text',
                                      WebkitTextFillColor: 'transparent'
                                    }}
                                  >
                                    {formatCurrency(item.price)}
                                  </Typography>
                                </Stack>
                              </Box>
                            }
                            sx={{ 
                              '& .MuiListItemText-secondary': { 
                                mt: 0.5 
                              } 
                            }}
                          />

                          
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            gap: 1,
                            ml: 1
                          }}>
                            <IconButton 
                              size="small"
                              onClick={() => handleRemoveItem(item)}
                              sx={{
                                color: 'error.main',
                                padding: '4px'
                              }}
                            >
                              <Delete sx={{ fontSize: isMobile ? '1rem' : '1.1rem' }} />
                            </IconButton>
                            
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 0.5,
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: '6px',
                              padding: '2px'
                            }}>
                              <IconButton 
                                size="small"
                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                sx={{
                                  padding: '4px',
                                  color: '#E8B4C0'
                                }}
                              >
                                <Remove sx={{ fontSize: '1rem' }} />
                              </IconButton>
                              
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  minWidth: '20px', 
                                  textAlign: 'center',
                                  fontWeight: '600',
                                  fontSize: isMobile ? '0.8rem' : '0.85rem'
                                }}
                              >
                                {item.quantity}
                              </Typography>
                              
                              <IconButton 
                                size="small"
                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                sx={{
                                  padding: '4px',
                                  color: '#D4AF37'
                                }}
                              >
                                <Add sx={{ fontSize: '1rem' }} />
                              </IconButton>
                            </Box>
                          </Box>
                        </ListItem>
                        {index < cart.length - 1 && (
                          <Divider sx={{ mx: 0 }} />
                        )}
                      </Box>
                    ))}
                  </List>
                </Box>

               
                <Box sx={{ 
                  background: 'rgba(247, 199, 211, 0.1)',
                  borderRadius: '12px',
                  p: isMobile ? 2 : 2.5,
                  border: '1px solid rgba(232, 180, 192, 0.2)',
                  flexShrink: 0
                }}>
                  <Typography 
                    variant={isMobile ? "subtitle2" : "h6"} 
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 2,
                      color: '#E8B4C0'
                    }}
                  >
                    Resumo do Pedido
                  </Typography>

                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} itens)
                      </Typography>
                      <Typography variant="body2" fontWeight="600">
                        {formatCurrency(cartTotal)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Frete
                      </Typography>
                      <Typography 
                        variant="body2" 
                        fontWeight="600"
                        sx={{ 
                          color: shipping === 0 ? 'success.main' : 'inherit'
                        }}
                      >
                        {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
                      </Typography>
                    </Box>

                    {shipping > 0 && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#D4AF37',
                          textAlign: 'center',
                          fontStyle: 'italic'
                        }}
                      >
                        Frete grátis em compras acima de R$ 100,00
                      </Typography>
                    )}

                    <Divider />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography 
                        variant={isMobile ? "subtitle1" : "h6"} 
                        fontWeight="bold"
                      >
                        Total
                      </Typography>
                      <Typography 
                        variant={isMobile ? "subtitle1" : "h6"} 
                        fontWeight="bold"
                        sx={{
                          background: 'linear-gradient(135deg, #E8B4C0 0%, #D4AF37 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        {formatCurrency(total)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

              
                <Box sx={{ 
                  display: 'flex', 
                  gap: isMobile ? 1 : 1.5, 
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  flexShrink: 0
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocalShipping sx={{ 
                      fontSize: isMobile ? '1rem' : '1.1rem', 
                      color: '#E8B4C0' 
                    }} />
                    <Typography 
                      variant="caption" 
                      sx={{ fontWeight: '600' }}
                    >
                      Entrega Rápida
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Security sx={{ 
                      fontSize: isMobile ? '1rem' : '1.1rem', 
                      color: '#D4AF37' 
                    }} />
                    <Typography 
                      variant="caption" 
                      sx={{ fontWeight: '600' }}
                    >
                      Compra Segura
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            )}
          </DialogContent>

          {/* Actions */}
          <DialogActions sx={{ 
            p: isMobile ? 1.5 : 2, 
            pt: isMobile ? 1 : 1.5, 
            gap: isMobile ? 0.5 : 0.8,
            borderTop: '1px solid rgba(232, 180, 192, 0.2)',
            flexShrink: 0
          }}>
            {cart.length === 0 ? (
              <Button 
                variant="contained"
                onClick={onContinueShopping}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{
                  background: 'linear-gradient(135deg, #E8B4C0 0%, #D4AF37 100%)',
                  boxShadow: '0 4px 15px rgba(232, 180, 192, 0.3)',
                  fontWeight: '600',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  padding: isMobile ? '8px 16px' : '10px 20px',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #D4AF37 0%, #E8B4C0 100%)',
                    boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)',
                  }
                }}
              >
                Continuar Comprando
              </Button>
            ) : (
              <>
                <Button 
                  startIcon={<FavoriteBorder sx={{ fontSize: isMobile ? '1rem' : '1.1rem' }} />}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    borderColor: '#E8B4C0',
                    color: '#E8B4C0',
                    fontWeight: '600',
                    fontSize: isMobile ? '0.7rem' : '0.8rem',
                    padding: isMobile ? '6px 12px' : '8px 16px',
                    minWidth: 'auto',
                    '&:hover': {
                      borderColor: '#D4AF37',
                      color: '#D4AF37'
                    }
                  }}
                  variant="outlined"
                >
                  {isMobile ? '' : 'Salvar'}
                </Button>
                
                <Button 
                  variant="contained"
                  endIcon={<ArrowForward sx={{ fontSize: isMobile ? '1rem' : '1.1rem' }} />}
                  onClick={handleCheckout}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #E8B4C0 0%, #D4AF37 100%)',
                    boxShadow: '0 4px 15px rgba(232, 180, 192, 0.3)',
                    fontWeight: '600',
                    fontSize: isMobile ? '0.8rem' : '0.9rem',
                    padding: isMobile ? '8px 16px' : '10px 20px',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #D4AF37 0%, #E8B4C0 100%)',
                      boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)',
                    }
                  }}
                >
                  Finalizar Compra
                </Button>
              </>
            )}
          </DialogActions>
        </Box>
      </Fade>
    </Dialog>
  );
};

export default CartModal;