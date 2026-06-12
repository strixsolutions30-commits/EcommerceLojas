import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const ImageWithFallback = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = 'https://via.placeholder.com/400x500?text=Imagem+Indisponível';
      }}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  );
};

const categories = [
  {
    name: 'Camisetas Oversized',
    products: '48 PRODUTOS',
    image: '../oversizeds-modelo.png',
    bgColor: '#000',
  },
  {
    name: 'Croppeds',
    products: '72 PRODUTOS',
    image: '../croppeds-modelo.png',
    bgColor: '#000',
  },
  {
    name: 'Regatas Premium',
    products: '35 PRODUTOS',
    image: '../regatas-modelo.png',
    bgColor: '#000',
  },
  {
    name: 'Bermudas Masculinas',
    products: '29 PRODUTOS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU68aGZdEDf0R_2NCzhEHpBBi-CGk6FaXKegtGLJazUA&s',
    bgColor: '#000',
  },
  {
    name: 'Shorts Femininos',
    products: '22 PRODUTOS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxCcCtGvnO1skwTIxgSYdGIWix-sbv5M6SHy1V-OP56A&s=10',
    bgColor: '#000',
  },
  {
    name: 'Acessórios',
    products: '41 PRODUTOS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRX092fpOAh21BZdUbhsbVnkZ8xhVqv95504-eQtmFAQ&s=10',
    bgColor: '#000',
  },
  
];

export function CategoryBlocks() {
  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 6, md: 8, lg: 10 }, 
        bgcolor: '#333',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ 
          textAlign: 'center', 
          mb: { xs: 3, md: 4 },
          position: 'relative'
        }}>
          <Typography 
            variant="h1" 
            sx={{ 
              color: 'white',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
              fontWeight: 900,
              letterSpacing: '4px',
              fontFamily: "'Impact', 'Anton', sans-serif",
              textTransform: 'uppercase',
              mb: 2
            }}
          >
            IRON ATHLETIC
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 2, md: 3 }
          }}>
            <Box sx={{ 
              width: { xs: '40px', md: '60px' }, 
              height: '2px', 
              bgcolor: 'white' 
            }} />
            <Typography 
              sx={{ 
                fontSize: { xs: '1rem', md: '1.2rem', lg: '1.3rem' },
                fontWeight: 600,
                letterSpacing: '3px',
                color: 'white'
              }}
            >
              Feito de quem treina pra quem treina <FitnessCenterIcon
    sx={{
      ml: 0.5,
      fontSize: 26,
      color: 'white',
      verticalAlign: 'middle'
    }}
  />
              
            </Typography>
            <Box sx={{ 
              width: { xs: '40px', md: '60px' }, 
              height: '2px', 
              bgcolor: 'white' 
            }} />
          </Box>
        </Box>

        <Typography 
          variant="h2" 
          sx={{ 
            color: 'white',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem', lg: '2.8rem' },
            fontWeight: 800,
            textAlign: 'center',
            mb: { xs: 4, md: 5, lg: 6 },
            mt: { xs: 3, md: 4 },
            fontFamily: "'Montserrat', 'Poppins', sans-serif",
            letterSpacing: '2px'
          }}
        >
          CATEGORIAS
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '0px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: '#000',
                  maxWidth: { xs: '100%', sm: '350px', md: '100%' },
                  margin: '0 auto',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                    '& .category-image': {
                      transform: 'scale(1.08)',
                    },
                    '& .overlay': {
                      backgroundColor: 'rgba(0,0,0,0.7)',
                    },
                    '& .products-text': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    }
                  }
                }}
              >
                <Box 
                  sx={{ 
                    aspectRatio: '3/3.5',
                    position: 'relative',
                    width: '100%',
                    height: { xs: '320px', sm: '380px', md: '420px', lg: '450px' },
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5'
                  }}
                >
                  
                  <Box
                    className="category-image"
                    sx={{
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="category-image"
                    />
                  </Box>
                  
                  
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.55)',
                      transition: 'background-color 0.4s ease',
                    }}
                  />
                  
                  
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: { xs: '20px 15px', sm: '25px 20px', md: '30px 25px' },
                      textAlign: 'left',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: { xs: '1.5rem', sm: '1.6rem', md: '1.8rem', lg: '2rem' },
                        letterSpacing: '1px',
                        mb: 1,
                        fontFamily: "'Montserrat', 'Poppins', sans-serif",
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                      }}
                    >
                      {category.name}
                    </Typography>
                    
                    <Typography
                      className="products-text"
                      sx={{
                        color: '#FFD700',
                        fontWeight: 600,
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                        letterSpacing: '1px',
                        opacity: 0.9,
                        transform: 'translateY(0)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        '&::before': {
                          content: '"✓"',
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }
                      }}
                    >
                      {category.products}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: { xs: 5, md: 6, lg: 7 },
          mb: { xs: 2, md: 3 }
        }}>
          <Box
            component="button"
            sx={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: 'none',
              padding: { xs: '12px 32px', sm: '14px 42px', md: '16px 48px' },
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontWeight: 700,
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              fontFamily: "'Montserrat', sans-serif",
              '&:hover': {
                backgroundColor: '#222',
                transform: 'translateY(-2px)',
                letterSpacing: '3px'
              }
            }}
          >
            VER TUDO
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 2, 
          mt: 3,
          opacity: 0.3
        }}>
          <Box sx={{ width: '40px', height: '1px', bgcolor: '#000' }} />
          <Box sx={{ width: '20px', height: '1px', bgcolor: '#000' }} />
          <Box sx={{ width: '40px', height: '1px', bgcolor: '#000' }} />
        </Box>
      </Container>
    </Box>
  );
}