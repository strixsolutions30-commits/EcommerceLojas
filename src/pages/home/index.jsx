import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    Link 
} from '@mui/material';
import { CategoryBlocks } from "../../components/categorias";
import { PopularProducts } from "../../components/produtospopulares";
import { Instagram } from '@mui/icons-material';

function Home({setCart}) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const instagramRef2 = useRef();
    const instagramRef1 = useRef();

    useEffect(() => {

        const script = document.createElement('script');
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.instgrm) {
                window.instgrm.Embeds.process();
            }
        };

        const fetchInstagramPosts = async () => {
            try {
                setTimeout(() => {
                    setPosts([
                        {
                            id: '1',
                            url: 'https://www.instagram.com/p/DRNtILfjaqn/?img_index=1',
                            title: 'Post 1 da TiccaStore'
                        },
                        {
                            id: '2',
                            url: 'https://www.instagram.com/p/DQJ09s8jVxr/?img_index=1',
                            title: 'Post 2 da TiccaStore'
                        },
                    ]);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Erro ao carregar posts:', error);
                setLoading(false);
            }
        };

        fetchInstagramPosts();

        return () => {
            document.body.removeChild(script);
        };
    }, []);


    useEffect(() => {
        if (!loading && window.instgrm) {
            setTimeout(() => {
                window.instgrm.Embeds.process();
            }, 100);
        }
    }, [loading]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    return (
            <Box>
                <Box 
                    id="inicio"
                    sx={{ 
                    background: "linear-gradient(135deg, #FFF8F0 0%, #FFEBCD 50%, #FFF8F0 100%)",
                    minHeight: "100vh",
                    padding: { xs: "20px 0", md: "40px 0" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    '&::before': {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                        opacity: 0.3
                    }
                    }}
                >
                    <Box 
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", lg: "row" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: { xs: 4, lg: 6 },
                        maxWidth: "1400px",
                        width: "100%",
                        padding: { xs: "0 20px", md: "0 40px" },
                        position: "relative",
                        zIndex: 1
                    }}
                    >
                    
                    <Box
                        sx={{
                        backgroundColor: "transparent",
                        display: "flex",
                        alignItems: { xs: "center", lg: "flex-start" },
                        flexDirection: "column",
                        textAlign: { xs: "center", lg: "left" },
                        width: { xs: "100%", lg: "45%" },
                        maxWidth: "600px"
                        }}
                    >
                        <Box
                        component="span"
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            color: "#8B4513",
                            padding: { xs: "12px 24px", md: "14px 28px" },
                            borderRadius: "50px",
                            cursor: "pointer",
                            fontSize: { xs: "0.9rem", md: "1rem" },
                            fontWeight: "bold",
                            boxShadow: "0 8px 32px rgba(139, 69, 19, 0.15)",
                            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                            border: "2px solid rgba(212, 175, 55, 0.3)",
                            backdropFilter: "blur(10px)",
                            '&:hover': {
                            transform: "translateY(-3px)",
                            boxShadow: "0 12px 40px rgba(139, 69, 19, 0.25)",
                            backgroundColor: "rgba(255, 255, 255, 1)"
                            }
                        }}
                        >
                        <strong>🎄 Coleção Natalina</strong>
                        </Box>
                        
                        <Typography
                        variant="h1"
                        sx={{
                            fontFamily: "'Playfair Display', serif",
                            padding: "20px 0 10px 0",
                            color: "#8B4513",
                            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                            fontWeight: "bold",
                            lineHeight: "1.1",
                            marginBottom: "10px",
                            textShadow: "2px 2px 4px rgba(139, 69, 19, 0.1)"
                        }}
                        >
                        Magia do Natal 
                        </Typography>

                        <Typography
                        variant="h2"
                        sx={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#D4AF37",
                            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                            fontStyle: "italic",
                            marginBottom: "20px",
                            background: "linear-gradient(45deg, #D4AF37, #FFD700, #F0E68C)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: "600"
                        }}
                        >
                        Edição Especial 2025
                        </Typography>

                        <Typography 
                        variant="body1"
                        sx={{
                            color: "#8B4513",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: { xs: "1.1rem", md: "1.2rem" },
                            lineHeight: "1.7",
                            maxWidth: "500px",
                            textAlign: { xs: "center", lg: "left" },
                            marginBottom: "30px",
                            fontWeight: "400",
                            opacity: 0.9
                        }}
                        >
                        Descubra a magia do Natal com nossa coleção especial. 
                        Peças únicas que trazem o encanto e a elegância 
                        da época mais esperada do ano.
                        </Typography>

                       
                        <Box
                        sx={{
                            background: "linear-gradient(135deg, #8B4513 0%, #A0522D 30%, #D2691E 70%, #F4A460 100%)",
                            color: "white",
                            padding: { xs: "25px 20px", md: "30px 25px" },
                            borderRadius: "24px",
                            width: "100%",
                            maxWidth: "500px",
                            textAlign: "center",
                            boxShadow: "0 20px 60px rgba(139, 69, 19, 0.4)",
                            border: "3px solid #D4AF37",
                            position: "relative",
                            overflow: "hidden",
                            display: { xs: "none", md: "block" },
                            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                            '&:hover': {
                            transform: "translateY(-8px)",
                            boxShadow: "0 30px 80px rgba(139, 69, 19, 0.6)"
                            }
                        }}
                        >
                        <Box
                            sx={{
                            position: "absolute",
                            top: "-100%",
                            left: "-100%",
                            width: "300%",
                            height: "300%",
                            background: "linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.2), transparent)",
                            transform: "rotate(45deg)",
                            animation: "shine 4s infinite"
                            }}
                        />
                        
                        <Typography
                            variant="h3"
                            sx={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: "900",
                            fontSize: { xs: "1.4rem", sm: "1.7rem", md: "1.9rem" },
                            textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
                            marginBottom: "12px",
                            background: "linear-gradient(45deg, #FFFFFF, #FFD700, #FFFFFF)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            position: "relative",
                            zIndex: 2
                            }}
                        >
                            BLACK FRIDAY  
                        </Typography>
                        
                        <Typography
                            variant="h2"
                            sx={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: "900",
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                            color: "#FFD700",
                            textShadow: "3px 3px 8px rgba(0,0,0,0.5)",
                            marginBottom: "12px",
                            animation: "pulse 2s infinite",
                            position: "relative",
                            zIndex: 2
                            }}
                        >
                            ATÉ 70% OFF!
                        </Typography>
                        
                        <Typography
                            variant="body1"
                            sx={{
                            fontSize: { xs: "0.9rem", md: "1rem" },
                            opacity: 0.95,
                            marginBottom: "20px",
                            fontWeight: "600",
                            position: "relative",
                            zIndex: 2,
                            color: "#FFF8DC"
                            }}
                        >
                            ⭐ Presentes especiais por tempo limitado ⭐
                        </Typography>
                        
                        <Button
                            variant="contained"
                            sx={{
                            backgroundColor: "#D4AF37",
                            color: "#8B4513",
                            padding: { xs: "14px 32px", md: "16px 36px" },
                            borderRadius: "50px",
                            fontWeight: "800",
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            boxShadow: "0 8px 30px rgba(212, 175, 55, 0.5)",
                            transition: "all 0.3s ease",
                            position: "relative",
                            zIndex: 2,
                            textTransform: "none",
                            border: "2px solid #FFD700",
                            '&:hover': {
                                backgroundColor: "#FFD700",
                                transform: "scale(1.08)",
                                boxShadow: "0 12px 40px rgba(212, 175, 55, 0.7)",
                                color: "#8B4513"
                            }
                            }}
                        >
                            🎁 COMPRAR AGORA!
                        </Button>
                        </Box>
                    </Box>

                    
                    <Box
                        sx={{
                        backgroundColor: "transparent",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: { xs: "100%", lg: "50%" },
                        maxWidth: "600px"
                        }}
                    >
                        <Box 
                        ref={instagramRef1}
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 3
                        }}
                        >
                        {posts
                        .filter(post => post.id === '1')
                        .map((post) => (
                            <Box
                            key={post.id}
                            sx={{
                                width: "100%",
                                maxWidth: "400px",
                                height: { xs: "650px", md: "700px" },
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "20px",
                                overflow: 'hidden',
                                boxShadow: "0 20px 60px rgba(139, 69, 19, 0.15)",
                                backgroundColor: "white",
                                transition: "all 0.3s ease",
                                border: "2px solid rgba(212, 175, 55, 0.2)",
                                '&:hover': {
                                transform: "translateY(-5px)",
                                boxShadow: "0 25px 80px rgba(139, 69, 19, 0.25)"
                                }
                            }}
                            >
                            <blockquote 
                                className="instagram-media"
                                data-instgrm-permalink={post.url}
                                data-instgrm-version="14"
                                style={{ 
                                width: "100%",
                                minWidth: "300px"
                                }}
                            >
                                <Link 
                                href={post.url} 
                                underline="none"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 3,
                                    backgroundColor: 'grey.50',
                                    border: '1px solid',
                                    borderColor: 'grey.200',
                                    borderRadius: 2,
                                    fontWeight: 'medium',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                    backgroundColor: 'white',
                                    boxShadow: 2,
                                    }
                                }}
                                >
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                    {[0, 1, 2].map((item) => (
                                    <Box
                                        key={item}
                                        sx={{
                                        width: 8,
                                        height: 8,
                                        backgroundColor: 'primary.main',
                                        borderRadius: '50%',
                                        animation: 'pulse 1.4s ease-in-out infinite both',
                                        animationDelay: `${item * 0.2}s`,
                                        '@keyframes pulse': {
                                            '0%, 80%, 100%': {
                                            transform: 'scale(0.8)',
                                            opacity: 0.5,
                                            },
                                            '40%': {
                                            transform: 'scale(1)',
                                            opacity: 1,
                                            },
                                        },
                                        }}
                                    />
                                    ))}
                                </Box>
                                <Instagram color="primary" sx={{ fontSize: 28 }} />
                                <Typography variant="body1" color="text.primary" fontWeight="500">
                                    Carregando post do Instagram...
                                </Typography>
                                </Link>
                            </blockquote>
                            </Box>
                        ))}
                        </Box>

                        
                        <Box
                        sx={{
                            display: { xs: "flex", md: "none" }, 
                            justifyContent: "center", 
                            alignItems: "center", 
                            flexDirection: "column", 
                            width: "100%",
                            maxWidth: "100%",
                            marginTop: "15px",
                            padding: { xs: "0 10px", sm: "0 15px" },
                            boxSizing: "border-box" 
                        }}
                        >
                        <Box
                            sx={{
                            background: "linear-gradient(135deg, #8B4513 0%, #A0522D 30%, #D2691E 70%, #F4A460 100%)",
                            color: "white",
                            padding: { xs: "15px 12px", sm: "18px 15px" },
                            borderRadius: "16px",
                            width: "100%",
                            maxWidth: "calc(100vw - 20px)", 
                            textAlign: "center",
                            boxShadow: "0 8px 25px rgba(139, 69, 19, 0.4)",
                            border: "2px solid #D4AF37",
                            position: "relative",
                            overflow: "hidden",
                            transition: "all 0.3s ease",
                            boxSizing: "border-box", 
                            '&:active': {
                                transform: "scale(0.98)"
                            }
                            }}
                        >
                            <Box
                            sx={{
                                position: "absolute",
                                top: "-100%",
                                left: "-100%",
                                width: "300%",
                                height: "300%",
                                background: "linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.2), transparent)",
                                transform: "rotate(45deg)",
                                animation: "shine 4s infinite"
                            }}
                            />
                            
                            <Typography
                            variant="h3"
                            sx={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: "900",
                                fontSize: { xs: "1rem", sm: "1.2rem" },
                                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                                marginBottom: { xs: "5px", sm: "8px" },
                                background: "linear-gradient(45deg, #FFFFFF, #FFD700, #FFFFFF)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                position: "relative",
                                zIndex: 2,
                                lineHeight: { xs: "1.1", sm: "1.2" },
                                wordWrap: "break-word" 
                            }}
                            >
                            BLACK FRIDAY
                            </Typography>
                            
                            <Typography
                            variant="h2"
                            sx={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: "900",
                                fontSize: { xs: "1.4rem", sm: "1.6rem" },
                                color: "#FFD700",
                                textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
                                marginBottom: { xs: "5px", sm: "8px" },
                                animation: "pulse 2s infinite",
                                position: "relative",
                                zIndex: 2,
                                lineHeight: { xs: "1", sm: "1.1" }
                            }}
                            >
                            ATÉ 70% OFF!
                            </Typography>
                            
                            <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                opacity: 0.95,
                                marginBottom: { xs: "10px", sm: "14px" },
                                fontWeight: "600",
                                position: "relative",
                                zIndex: 2,
                                color: "#FFF8DC",
                                lineHeight: { xs: "1.2", sm: "1.3" }
                            }}
                            >
                            ⭐ Ofertas especiais ⭐
                            </Typography>
                            
                            <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#D4AF37",
                                color: "#8B4513",
                                padding: { xs: "8px 20px", sm: "10px 24px" },
                                borderRadius: "20px",
                                fontWeight: "800",
                                fontSize: { xs: "0.8rem", sm: "0.85rem" },
                                boxShadow: "0 4px 15px rgba(212, 175, 55, 0.5)",
                                position: "relative",
                                zIndex: 2,
                                textTransform: "none",
                                border: "1.5px solid #FFD700",
                                width: { xs: "100%", sm: "auto" }, 
                                maxWidth: "250px",
                                minHeight: { xs: "40px", sm: "44px" },
                                margin: "0 auto", 
                                display: "block", 
                                '&:hover': {
                                backgroundColor: "#FFD700",
                                transform: "scale(1.02)",
                                boxShadow: "0 6px 20px rgba(212, 175, 55, 0.7)",
                                color: "#8B4513"
                                },
                                '&:active': {
                                transform: "scale(0.95)"
                                }
                            }}
                            >
                            🎁 COMPRAR AGORA!
                            </Button>
                        </Box>
                        </Box>
                    </Box>
                    </Box>      
                </Box>
                    
                <CategoryBlocks/>
                
                <Box 
                    id="black"
                    sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: { xs: "column", lg: "row" },
                    background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #2A2A2A 100%)",
                    minHeight: "350px",
                    gap: 6,
                    padding: { xs: 4, md: 6 },
                    position: "relative",
                    overflow: "hidden",
                    '&::before': {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }
                    }}
                >
                    <Box 
                    ref={instagramRef2}
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3
                    }}
                    >
                    {posts
                    .filter(post => post.id === '2')
                    .map((post) => (
                        <Box
                        key={post.id}
                        sx={{
                            width: "100%",
                            maxWidth: "400px",
                            height: { xs: "650px", md: "700px" },
                            display: "flex",
                            justifyContent: "center",
                            borderRadius: "20px",
                            overflow: 'hidden',
                            boxShadow: "0 20px 60px rgba(139, 69, 19, 0.15)",
                            backgroundColor: "white",
                            transition: "all 0.3s ease",
                            border: "2px solid rgba(212, 175, 55, 0.2)",
                            '&:hover': {
                            transform: "translateY(-5px)",
                            boxShadow: "0 25px 80px rgba(139, 69, 19, 0.25)"
                            }
                        }}
                        >
                        <blockquote 
                            className="instagram-media"
                            data-instgrm-permalink={post.url}
                            data-instgrm-version="14"
                            style={{ 
                            width: "100%",
                            minWidth: "300px"
                            }}
                        >
                             <Link 
                                href={post.url} 
                                underline="none"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 3,
                                    backgroundColor: 'grey.50',
                                    border: '1px solid',
                                    borderColor: 'grey.200',
                                    borderRadius: 2,
                                    fontWeight: 'medium',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                    backgroundColor: 'white',
                                    boxShadow: 2,
                                    }
                                }}
                                >
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                    {[0, 1, 2].map((item) => (
                                    <Box
                                        key={item}
                                        sx={{
                                        width: 8,
                                        height: 8,
                                        backgroundColor: 'primary.main',
                                        borderRadius: '50%',
                                        animation: 'pulse 1.4s ease-in-out infinite both',
                                        animationDelay: `${item * 0.2}s`,
                                        '@keyframes pulse': {
                                            '0%, 80%, 100%': {
                                            transform: 'scale(0.8)',
                                            opacity: 0.5,
                                            },
                                            '40%': {
                                            transform: 'scale(1)',
                                            opacity: 1,
                                            },
                                        },
                                        }}
                                    />
                                    ))}
                                </Box>
                                <Instagram color="primary" sx={{ fontSize: 28 }} />
                                <Typography variant="body1" color="text.primary" fontWeight="500">
                                    Carregando post do Instagram...
                                </Typography>
                                </Link>
                        </blockquote>
                        </Box>
                    ))}
                    </Box>

                    <Box
                    sx={{
                        background: "linear-gradient(135deg, #000000 0%, #1A1A1A 30%, #2D2D2D 70%, #000000 100%)",
                        color: "white",
                        padding: { xs: "25px", md: "30px" },
                        borderRadius: "24px",
                        textAlign: "center",
                        boxShadow: `
                        0 0 0 1px rgba(255, 215, 0, 0.3),
                        0 20px 60px rgba(255, 215, 0, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1)
                        `,
                        border: "1px solid rgba(255, 215, 0, 0.5)",
                        position: "relative",
                        overflow: "hidden",
                        maxWidth: "450px",
                        width: "100%",
                        minHeight: "280px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backdropFilter: "blur(10px)",
                        '&::before': {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(135deg, rgba(255,215,0,0.1) 0%, transparent 50%)",
                        zIndex: 1,
                        }
                    }}
                    >
                    <Box sx={{ position: "relative", zIndex: 2 }}>
                        <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            backgroundColor: "rgba(255, 215, 0, 0.15)",
                            color: "#FFD700",
                            padding: "6px 16px",
                            borderRadius: "20px",
                            border: "1px solid rgba(255, 215, 0, 0.3)",
                            marginBottom: 3,
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            letterSpacing: "1px",
                            textTransform: "uppercase"
                        }}
                        >
                        ⭐ Oferta Exclusiva
                        </Box>
                        
                        <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "900",
                            fontSize: { xs: "1.8rem", md: "2.5rem" },
                            textShadow: "0 2px 20px rgba(255, 215, 0, 0.5)",
                            marginBottom: 1,
                            background: "linear-gradient(45deg, #FFD700, #FFF8DC, #FFD700)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: "1px",
                            lineHeight: 1.2
                        }}
                        >
                        BLACK FRIDAY
                        </Typography>
                        
                        <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "800",
                            fontSize: { xs: "2rem", md: "3rem" },
                            color: "#FFD700",
                            textShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
                            marginBottom: 2,
                            animation: "pulse 2s infinite",
                            letterSpacing: "2px"
                        }}
                        >
                        70% OFF
                        </Typography>
                        
                        <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", md: "1rem" },
                            opacity: 0.9,
                            marginBottom: 3,
                            fontWeight: "500",
                            color: "#FFF8DC",
                            maxWidth: "300px",
                            lineHeight: 1.5
                        }}
                        >
                        Coleção especial com descontos imperdíveis por tempo limitado
                        </Typography>
                        
                        <Button
                        variant="contained"
                        sx={{
                            background: "linear-gradient(135deg, #FFD700 0%, #FFED4A 100%)",
                            color: "#000000",
                            padding: { xs: "12px 32px", md: "14px 40px" },
                            borderRadius: "30px",
                            fontWeight: "800",
                            fontSize: { xs: "0.9rem", md: "1rem" },
                            boxShadow: "0 8px 30px rgba(255, 215, 0, 0.4)",
                            position: "relative",
                            textTransform: "none",
                            border: "2px solid rgba(255, 255, 255, 0.3)",
                            letterSpacing: "0.5px",
                            overflow: "hidden",
                            '&::before': {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                            transition: "left 0.5s ease",
                            },
                            '&:hover': {
                            background: "linear-gradient(135deg, #FFED4A 0%, #FFD700 100%)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 12px 40px rgba(255, 215, 0, 0.6)",
                            '&::before': {
                                left: "100%",
                            }
                            },
                            transition: "all 0.3s ease"
                        }}
                        >
                        🎁 APROVEITAR OFERTA
                        </Button>
                    </Box>
                    </Box>          
                </Box>
                <Box
                id="populares"
                >
                 <PopularProducts  setCart={setCart}/>
                </Box>
                
                </Box>
        )
    }

export default Home;