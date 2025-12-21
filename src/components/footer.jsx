import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import img from "./../img/Ticca.jpg";

function Footer() {
  return (
    <Box 
      component="footer"
      sx={{
        backgroundColor: 'white',
        borderTop: '1px solid',
        borderTop:"1px solid #d8d7d7ff"
      }}
    >
      <Box 
        sx={{ 
          maxWidth: '1200px', 
          mx: 'auto', 
          px: { xs: 3, sm: 6 }, 
          py: 8 
        }}
      >
        <Grid container spacing={6} sx={{ mb: 6 }}>
          <Grid item xs={12} md={3}>
           <Box
        component="img"
        src={img}
        alt="TiccaStory Logo"
        sx={{
        
          height: { 
            xs: 60,    
            sm: 70,    
            md: 85,    
            lg: 85,    
            xl: 95    
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
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'grey.600',
                lineHeight: 1.6
              }}
            >
              Moda feminina com elegância e sofisticação. Descubra seu estilo único.
            </Typography>
          </Grid>

          
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'grey.800',
                mb: 3,
                fontWeight: '600'
              }}
            >
              Navegação
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, space: 2 }}>
              {['Home', 'Novidades', 'Coleção', 'Promoções'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 2 }}>
                  <Link
                    href="#"
                    sx={{
                      color: 'grey.600',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#E8B4C0'
                      }
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

         
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'grey.800',
                mb: 3,
                fontWeight: '600'
              }}
            >
              Atendimento
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['Contato', 'Trocas e Devoluções', 'Política de Privacidade', 'Termos de Uso'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 2 }}>
                  <Link
                    href="#"
                    sx={{
                      color: 'grey.600',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#E8B4C0'
                      }
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          
          <Grid item xs={12} md={3}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'grey.800',
                mb: 3,
                fontWeight: '600'
              }}
            >
              Redes Sociais
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'grey.600',
                mb: 3,
                lineHeight: 1.6
              }}
            >
              Siga-nos e fique por dentro das novidades
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[
                { icon: InstagramIcon, label: 'Instagram' },
                { icon: FacebookIcon, label: 'Facebook' },
                { icon: TwitterIcon, label: 'Twitter' }
              ].map((social) => (
                <Link
                  key={social.label}
                  href="#"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: '#F7C7D3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#E8B4C0',
                      transform: 'translateY(-2px)'
                    }
                  }}
                  aria-label={social.label}
                >
                  <social.icon sx={{ fontSize: 20 }} />
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        
        <Box 
          sx={{ 
            borderTop: '1px solid',
            borderColor: 'grey.200',
            pt: 4,
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'grey.500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}
          >
            © 2025 TiccaStory. Todos os direitos reservados. Feito com 
            <FavoriteIcon 
              sx={{ 
                fontSize: 16, 
                color: '#F7C7D3',
                fill: '#F7C7D3'
              }} 
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;