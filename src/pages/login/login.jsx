import React from "react";
import { 
    Box, 
    Card, 
    Typography, 
    TextField, 
    Button,
    IconButton,
    InputAdornment
} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import imgLogin from './../../img/img_login.png'; 
import { useNavigate } from "react-router-dom";

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const teste = () =>{
        navigate('/')
    }

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                backgroundImage: `url(${imgLogin})`,
                backgroundSize: "cover", 
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
            }}
        >
            
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.3)", 
                }}
            />

            
            <Card
                elevation={10} 
                sx={{
                    zIndex: 2,
                    width: { xs: '90%', sm: '400px' }, 
                    padding: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.85)', 
                    backdropFilter: 'blur(5px)', 
                    textAlign: 'center',
                    boxShadow: '0 8px 32px black', 
                }}
            >
                <LockOpenIcon sx={{ fontSize: 40, color: 'black', mb: 1 }} />
                <Typography variant="h5" gutterBottom 
                    sx={{ fontWeight: 600, color: '#333333' }}>
                    Bem-vindo(a) à Iron Athletics  <FitnessCenterIcon sx={{ fontSize: 16, color: 'black',}} />
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                    Entre para acessar sua conta.
                </Typography>

                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="E-mail"
                        variant="outlined"
                        size="medium"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon sx={{ color: 'black' }}/>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '12px' }
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Senha"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        size="medium"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOpenIcon sx={{ color: 'black' }}/>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '0px' }
                        }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={teste}
                        sx={{
                            mt: 3,
                            p: 1.5,
                            backgroundColor: 'black', 
                            '&:hover': {
                                backgroundColor: 'white', 
                                color: 'black',
                                border: '1px solid black',
                               
                            },
                            
                            fontWeight: 'bold',
                            letterSpacing: '1px'
                        }}
                    >
                        ENTRAR
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}

export default Login;
