import { useState } from 'react';
import { 
    Box,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    Button,
    Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import img from '../assets/payments/ironlogo.png';
import { useNavigate } from 'react-router-dom';
import CartModal from './../components/carrinho';

const Header = ({ 
  cartItemsCount = 0, 
  cart = [], 
  setCart 
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false); // Estado para controlar o modal
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Função para abrir o modal do carrinho
  const handleOpenCartModal = () => {
    setCartModalOpen(true);
  };

  // Função para fechar o modal do carrinho
  const handleCloseCartModal = () => {
    setCartModalOpen(false);
  };

  // Funções para manipular o carrinho
  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) {
      // Remove item se quantidade for 0
      handleRemoveItem(item);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(cartItem => 
        cartItem.cartId === item.cartId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  const handleRemoveItem = (item) => {
    setCart(prevCart =>
      prevCart.filter(cartItem => cartItem.cartId !== item.cartId)
    );
  };

  const handleCheckout = () => {
    alert('Redirecionando para checkout...');
    setCartModalOpen(false);
    // navigate('/checkout'); // Descomente se tiver rota de checkout
  };

  const handleContinueShopping = () => {
    setCartModalOpen(false);
    navigate('/produtos');
  };

  const handleLogin = () =>{
    navigate('/Login')
  }

  const menuItems = [
    { name: 'Início', type: 'page', target: './' },
    // { name: 'Populares', type: 'section', target: 'populares' },
    // { name: 'Promoções', type: 'section', target: 'black' },
    { name: 'Produtos', type: 'page', target: '/produtos' },
    { name: 'Contato', type: 'section', target: 'contato' }
  ];

  const isLoggedIn = false;
  

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 85; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileOpen(false);
  };

  const navigateToPage = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleMenuClick = (item) => {
    if (item.type === 'section') {
      scrollToSection(item.target);
    } else if (item.type === 'page') {
      navigateToPage(item.target);
    }
  };

  const desktopMenu = (
    <Box sx={{ 
      display: { xs: 'none', md: 'flex' }, 
      gap: 2, 
      alignItems: 'center' 
    }}>
      {menuItems.map((item) => (
        <Typography
          key={item.target}
          component="a"
          href={item.type === 'section' ? `#${item.target}` : item.target}
          onClick={(e) => {
            e.preventDefault();
            handleMenuClick(item);
          }}
          sx={{
            textDecoration: "none",
            color: "white",
            padding: "8px 16px",
            borderRadius: "12px",
            backgroundColor: "black",
            transition: "all 0.3s",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.95rem",
            whiteSpace: 'nowrap',
            "&:hover": {
              backgroundColor: 'white',
              color: 'black',
              transform: "translateY(-2px)",
              boxShadow: "0 5px 15px black",
            }
          }}
        >
          {item.name}
        </Typography>
      ))}
    </Box>
  );

  const iconButtonStyle = {
        color: 'white',
        backgroundColor: 'black',
        borderRadius:"20px",
        width: '34px',
        height: '34px',
        transition: 'all 0.3s',
        '&:hover': {
          backgroundColor: 'white',
        color: 'black',
        transform: 'scale(1.1)'
        }
  };

  const desktopIcons = (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        gap: 1,
        marginLeft: 'auto',
        flexShrink: 0
      }}
    >
      <IconButton
        sx={iconButtonStyle}
        aria-label="Facebook"
        onClick={() => window.open('https://facebook.com/suaLoja', '_blank')}
      >
        <FacebookIcon />
      </IconButton>

      <IconButton
        sx={iconButtonStyle}
        aria-label="Instagram"
        onClick={() => window.open('https://www.instagram.com/ironathloficial/', '_blank')}
      >
        <InstagramIcon />
      </IconButton>

      <IconButton 
        sx={iconButtonStyle} 
        aria-label="Carrinho"
        onClick={handleOpenCartModal} 
      >
        <Badge
          badgeContent={cartItemsCount} 
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#F7C7D3',
              color: 'white',
              fontSize: '0.7rem',
              minWidth: '18px',
              height: '18px',
              display: cartItemsCount === 0 ? 'none' : 'flex',
              border: '1px solid white',
              top: 5,
              right: 5
            }
          }}
        >
          <ShoppingBagIcon />
        </Badge>
      </IconButton>

       {isLoggedIn ? (
        <IconButton sx={iconButtonStyle} aria-label="Perfil">
          <PersonIcon />
        </IconButton>
      ) : (
        <Button
         onClick={handleLogin}
        sx={{
           color: 'white',
        backgroundColor: 'black',
        borderRadius:"20px",
        transition: 'all 0.3s',
        '&:hover': {
          backgroundColor: 'white',
        color: 'black',
        transform: 'scale(1.1)'
        }}} variant="contained">
          Login
        </Button>
      )}
    </Box>
  );

  const mobileIcons = (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: 3,
      mt: 4,
      pt: 3,
      borderTop: '1px solid rgba(255, 215, 0, 0.1)'
    }}>
      <IconButton 
        sx={iconButtonStyle}
        aria-label="Instagram"
        onClick={() => window.open('https://instagram.com/S/ironathloficial/', '_blank')}
      >
        <InstagramIcon />
      </IconButton>

      <IconButton 
        sx={iconButtonStyle}
        aria-label="Facebook"
        onClick={() => window.open('https://facebook.com/SEU_PERFIL', '_blank')}
      >
        <FacebookIcon />
      </IconButton>

      <IconButton 
        sx={iconButtonStyle}
        aria-label="Carrinho"
        onClick={() => {
          handleOpenCartModal();
          setMobileOpen(false);
        }}
      >
        <Badge 
          badgeContent={cartItemsCount} 
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#F7C7D3',
              color: 'white',
              fontSize: '0.7rem',
              minWidth: '18px',
              height: '18px',
              display: cartItemsCount === 0 ? 'none' : 'flex'
            }
          }}
        >
          <ShoppingBagIcon />
        </Badge>
      </IconButton>

       {isLoggedIn ? (
        <IconButton sx={iconButtonStyle} aria-label="Perfil">
          <PersonIcon />
        </IconButton>
      ) : (
        <Button 
        onClick={handleLogin}
        sx={{
        color: 'white',
        backgroundColor: 'black',
        borderRadius:"20px",
        transition: 'all 0.3s',
        '&:hover': {
          backgroundColor: 'white',
        color: 'black',
        transform: 'scale(1.1)'
        }}} variant="contained">
          Login
        </Button>
      )}
    </Box>
  );

  const mobileMenu = (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: 'rgba(255, 248, 225, 0.98)',
        height: '100%',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon sx={{ color: '#6b4c11' }} />
        </IconButton>
      </Box>
      
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem 
            key={item.target} 
            sx={{ 
              justifyContent: 'center',
              py: 2,
              borderBottom: '1px solid rgba(255, 215, 0, 0.1)'
            }}
          >
            <Typography
              component="a"
              href={item.type === 'section' ? `#${item.target}` : item.target}
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick(item);
              }}
              sx={{
                textDecoration: "none",
                color: 'white',
                backgroundColor: 'black',
                fontSize: "1.2rem",
                fontWeight: "600",
                padding: "12px 24px",
                borderRadius: "8px",
                width: "100%",
                textAlign: "center",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                }
              }}
            >
              {item.name}
            </Typography>
          </ListItem>
        ))}
      </List>

      {mobileIcons}
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          width: "100%",
          maxWidth: "100vw", 
          height: { xs: "70px", md: "85px" },
          padding: { xs: "5px 15px", md: "10px 20px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0, 
          zIndex: 1000,
          boxShadow: "0 2px 10px black",
          boxSizing: 'border-box', 
        }}
      >
        <Box
          component="img"
          src={img}
          alt="TiccaStory Logo"
          sx={{
            height: { 
              xs: 30,    
              sm: 40,    
              md: 50,    
              lg: 60,    
              xl: 70    
            },
            width: "auto",
            display: "inline-block",
            flexShrink: 0,
            mr: { 
              xs: 1,     
              sm: 1.5,     
              md: 2,     
              lg: 2.5,   
              xl: 3      
            },
            p: { xs: 0.5, md: 0 },  
            maxWidth: "100%",
            objectFit: "contain"
          }}
        />
              
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          alignItems: 'center', 
          justifyContent: 'center',
          flex: 1,
          maxWidth: '500px',
          mx: 2
        }}>
          {desktopMenu}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          flexShrink: 0
        }}>
          {desktopIcons}

          <IconButton
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: '#6b4c11',
              backgroundColor: 'rgba(255, 248, 225, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255, 242, 200, 1)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s',
              ml: 1
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: { xs: '100%', sm: '280px' },
            border: 'none',
            boxShadow: '5px 0 25px black'
          },
        }}
      >
        {mobileMenu}
      </Drawer>

      <CartModal
        cart={cart}
        isOpen={cartModalOpen}
        onClose={handleCloseCartModal}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        onContinueShopping={handleContinueShopping}
      />

      <Box sx={{ 
        height: { xs: '70px', md: '85px' } 
      }} />
    </>
  );
};

export default Header;