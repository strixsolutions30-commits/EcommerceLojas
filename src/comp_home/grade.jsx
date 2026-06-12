import React from "react";
import {
    Box,
    Typography,
    IconButton,
    useTheme,
    useMediaQuery
} from "@mui/material";
import { 
    ChevronLeft, 
    ChevronRight,
    FiberManualRecord 
} from "@mui/icons-material";

function Grade() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const slides = [
        {
            id: 1,
            image: "https://ironathletics.com.br/cdn/shop/files/WhatsApp_Image_2026-05-20_at_11.36.46.jpg?v=1779292239&width=3840",
            imageMobile: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800&h=1000&fit=crop",
            title: "Nova Coleção de Elite",
            subtitle: "Descubra o conforto em cada detalhe",
            badge: "Lançamento",
            discount: "-20%"
        },
        {
            id: 2,
            image: "https://ironathletics.com.br/cdn/shop/files/IMG_6243_JPG.jpg?v=1773237069&width=3840",
            imageMobile: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800&h=1000&fit=crop",
            title: "Moda Fitness",
            subtitle: "Pensado de quem treina para quem treina",
            badge: "Eco Friendly",
            discount: "-15%"
        },
        {
            id: 3,
            image: "https://ironathletics.com.br/cdn/shop/files/IMG_2469.jpg?height=5760&v=1779245994",
            imageMobile: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800&h=1000&fit=crop",
            title: "Coleção Limitada",
            subtitle: "Peças exclusivas para você",
            badge: "Exclusivo",
            discount: "-30%"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800&h=1000&fit=crop",
            imageMobile: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800&h=1000&fit=crop",
            title: "Alta Costura",
            subtitle: "Durabilidade e conforto",
            badge: "Premium",
            discount: "-25%"
        }
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    React.useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const getCarouselHeight = () => {
        if (isMobile) return "500px";
        if (isTablet) return "550px";
        return "600px";
    };


    const getTitleSize = () => {
        if (isMobile) return "28px";
        if (isTablet) return "42px";
        return "56px";
    };

    const getSubtitleSize = () => {
        if (isMobile) return "16px";
        if (isTablet) return "20px";
        return "24px";
    };

    const getDiscountSize = () => {
        if (isMobile) return "32px";
        if (isTablet) return "40px";
        return "48px";
    };

    return (
        <Box
            sx={{
                backgroundColor: "#f5f5f5",
                height: { xs: "500px", sm: "550px", md: "600px" },
                position: "relative",
                overflow: "hidden",
                width: "100%"
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    overflow: "hidden"
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        transition: "transform 0.5s ease-in-out",
                        transform: `translateX(-${currentIndex * 100}%)`,
                        height: "100%"
                    }}
                >
                    {slides.map((slide) => (
                        <Box
                            key={slide.id}
                            sx={{
                                minWidth: "100%",
                                height: "100%",
                                position: "relative",
                                backgroundImage: {
                                    xs: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%), url(${slide.imageMobile})`,
                                    sm: `linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%), url(${slide.image})`
                                },
                                backgroundSize: "cover",
                                backgroundPosition: {
                                    xs: "center 30%",
                                    sm: "center"
                                },
                                backgroundRepeat: "no-repeat",
                                display: "flex",
                                alignItems: "center",
                                textAlign: { xs: "center", sm: "left" }
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: "1200px",
                                    margin: "0 auto",
                                    padding: { xs: "0 20px", sm: "0 40px", md: "0 80px" },
                                    width: "100%",
                                    color: "white",
                                    animation: "fadeInUp 0.8s ease-out"
                                }}
                            >
                                
                                <Box
                                    sx={{
                                        display: "inline-block",
                                        backgroundColor: "rgba(255,255,255,0.2)",
                                        backdropFilter: "blur(10px)",
                                        padding: { xs: "6px 16px", sm: "8px 20px" },
                                        borderRadius: "30px",
                                        mb: { xs: 2, sm: 3 },
                                        fontSize: { xs: "12px", sm: "14px" },
                                        fontWeight: "bold",
                                        letterSpacing: "1px"
                                    }}
                                >
                                    {slide.badge}
                                </Box>

                                
                                <Typography
                                    sx={{
                                        fontSize: getDiscountSize(),
                                        fontWeight: "bold",
                                        mb: { xs: 1, sm: 2 },
                                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                                        background: "linear-gradient(135deg, #fff 0%, #ffd700 100%)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    }}
                                >
                                    {slide.discount}
                                </Typography>

                                
                                <Typography
                                    sx={{
                                        fontWeight: "bold",
                                        mb: { xs: 1, sm: 2 },
                                        fontSize: getTitleSize(),
                                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                                        lineHeight: 1.2
                                    }}
                                >
                                    {slide.title}
                                </Typography>

                                
                                <Typography
                                    sx={{
                                        mb: { xs: 3, sm: 4 },
                                        opacity: 0.95,
                                        fontSize: getSubtitleSize(),
                                        maxWidth: { xs: "100%", sm: "80%", md: "60%" },
                                        mx: { xs: "auto", sm: 0 }
                                    }}
                                >
                                    {slide.subtitle}
                                </Typography>

                                
                                <Box
                                    component="button"
                                    sx={{
                                        backgroundColor: "transparent",
                                        border: "2px solid white",
                                        color: "white",
                                        padding: { xs: "10px 24px", sm: "12px 32px" },
                                        fontSize: { xs: "14px", sm: "16px" },
                                        fontWeight: "bold",
                                        borderRadius: "40px",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        width: { xs: "100%", sm: "auto" },
                                        maxWidth: { xs: "200px", sm: "none" },
                                        mx: { xs: "auto", sm: 0 },
                                        '&:hover': {
                                            backgroundColor: "white",
                                            color: "#333",
                                            transform: "translateY(-2px)"
                                        }
                                    }}
                                >
                                    COMPRE JÁ
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>

                
                {!isMobile && (
                    <>
                        <IconButton
                            onClick={handlePrev}
                            sx={{
                                position: "absolute",
                                left: { xs: 10, sm: 20 },
                                top: "50%",
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(255,255,255,0.2)",
                                backdropFilter: "blur(10px)",
                                color: "white",
                                '&:hover': {
                                    backgroundColor: "rgba(255,255,255,0.3)",
                                    transform: "translateY(-50%) scale(1.1)"
                                },
                                transition: "all 0.3s ease",
                                zIndex: 2,
                                width: { xs: 36, sm: 48 },
                                height: { xs: 36, sm: 48 }
                            }}
                        >
                            <ChevronLeft sx={{ fontSize: { xs: 30, sm: 40 } }} />
                        </IconButton>

                        <IconButton
                            onClick={handleNext}
                            sx={{
                                position: "absolute",
                                right: { xs: 10, sm: 20 },
                                top: "50%",
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(255,255,255,0.2)",
                                backdropFilter: "blur(10px)",
                                color: "white",
                                '&:hover': {
                                    backgroundColor: "rgba(255,255,255,0.3)",
                                    transform: "translateY(-50%) scale(1.1)"
                                },
                                transition: "all 0.3s ease",
                                zIndex: 2,
                                width: { xs: 36, sm: 48 },
                                height: { xs: 36, sm: 48 }
                            }}
                        >
                            <ChevronRight sx={{ fontSize: { xs: 30, sm: 40 } }} />
                        </IconButton>
                    </>
                )}

                
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        touchAction: "pan-y pinch-zoom",
                        zIndex: 1
                    }}
                    onTouchStart={(e) => {
                        const touchStart = e.touches[0].clientX;
                        const onTouchEnd = (e) => {
                            const touchEnd = e.changedTouches[0].clientX;
                            if (touchStart - touchEnd > 50) handleNext();
                            if (touchStart - touchEnd < -50) handlePrev();
                            document.removeEventListener('touchend', onTouchEnd);
                        };
                        document.addEventListener('touchend', onTouchEnd);
                    }}
                />

                
                <Box
                    sx={{
                        position: "absolute",
                        bottom: { xs: 20, sm: 30 },
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: { xs: 1, sm: 1.5 },
                        zIndex: 2,
                        padding: { xs: "8px 12px", sm: 0 },
                        borderRadius: "30px",
                        backgroundColor: { xs: "rgba(0,0,0,0.4)", sm: "transparent" },
                        backdropFilter: { xs: "blur(8px)", sm: "none" }
                    }}
                >
                    {slides.map((_, index) => (
                        <IconButton
                            key={index}
                            onClick={() => goToSlide(index)}
                            sx={{
                                padding: 0,
                                color: index === currentIndex ? "white" : "rgba(255,255,255,0.5)",
                                transition: "all 0.3s ease",
                                '&:hover': {
                                    color: "white",
                                    transform: "scale(1.2)"
                                }
                            }}
                        >
                            <FiberManualRecord sx={{ 
                                fontSize: index === currentIndex ? { xs: 10, sm: 14 } : { xs: 8, sm: 10 }
                            }} />
                        </IconButton>
                    ))}
                </Box>
            </Box>

            <style>
                {`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @media (max-width: 600px) {
                        @keyframes fadeInUp {
                            from {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                    }
                `}
            </style>
        </Box>
    );
}

export default Grade;