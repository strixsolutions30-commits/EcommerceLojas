import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const ImageWithFallback = ({ src, alt, className, fallbackSrc = '' }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        if (fallbackSrc) {
          e.target.src = fallbackSrc;
        }
      }}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        mixBlendMode: 'multiply',
        opacity: 0.9,
      }}
    />
  );
};

const categories = [
  {
    name: 'Vestidos',
    image: 'https://www.dicasdemulher.com.br/wp-content/uploads/2018/06/moda-plus-size-62.jpg',
    bgColor: 'rgba(255, 255, 255, 0.95)',
  },
  {
    name: 'Casuais',
    image: 'https://i.pinimg.com/originals/e1/17/0f/e1170f28cf50743ade50b24cfd75264e.jpg',
    bgColor: 'rgba(255, 255, 255, 0.95)',
  },
  {
    name: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1569388330292-79cc1ec67270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MzY2MjgyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgColor: 'rgba(255, 255, 255, 0.95)',
  },

];

export function CategoryBlocks() {
  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        px: { xs: 3, sm: 6, lg: 8 }, 
        bgcolor: 'white' 
      }}
    >
      <Box sx={{
         maxWidth: '1400px',
          mx: 'auto' 
          }}>
       
        <Box sx={{ 
            textAlign: 'center',
             mb: { xs: 6, md: 8 } 
             }}>
                
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#333',
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' },
              fontWeight: 'bold',
              marginTop:"-25px"
            }}
          >
            Explore por Categoria
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'gray.600',
              fontSize: { xs: '1rem', md: '1.1rem', lg: '1.2rem' },
              fontWeight: 400
            }}
          >
            Encontre o estilo perfeito para cada ocasião
          </Typography>
        </Box>

        
        <Grid container spacing={3} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  backgroundColor: category.bgColor,
                  maxWidth: { xs: '280px', md: '320px', lg: '350px' },
                  margin: '0 auto',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
                    '& .category-image': {
                      opacity: 1,
                    }
                  }
                }}
              >
                <Box 
                  sx={{ 
                    aspectRatio: '3/4', 
                    position: 'relative',
                    width: '100%',
                    height: { xs: '280px', sm: '320px', md: '360px', lg: '400px' }
                  }}
                >
                  
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                  
                 
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 60%)',
                    }}
                  />
                  
                  
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: { xs: '20px', md: '24px', lg: '28px' },
                      left: 0,
                      right: 0,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'white',
                        textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                        fontWeight: 'bold',
                        fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.75rem' },
                        letterSpacing: '0.5px'
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}