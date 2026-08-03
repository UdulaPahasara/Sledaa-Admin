import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, IconButton, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';
import AdminSEO from '../../components/AdminSEO';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo/logo.webp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }
      // Navigate to admin gallery
      navigate('/admin/gallery'); 
    } else {
      setError(result.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        padding: 2,
      }}
    >
      <AdminSEO title="Login" />
      {/* Major Box */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 577,
          minHeight: 486,
          backgroundColor: 'rgba(246, 246, 246, 1)',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 3, sm: 4 },
          boxSizing: 'border-box',
        }}
      >
        {/* Submajor Box */}
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: '100%',
            maxWidth: 439,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          {/* Logo Box & Welcome */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: 82,
                height: 83,
                objectFit: 'contain',
              }}
            />
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '30px',
                color: 'rgba(0, 0, 0, 1)',
                lineHeight: '100%',
                textAlign: 'center',
              }}
            >
              Welcome
            </Typography>
          </Box>

          {/* Input Fields Box */}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              placeholder="E-mail"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: '10px',
                '& .MuiOutlinedInput-root': {
                  height: 50,
                  borderRadius: '10px',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: 'rgba(117, 117, 117, 1)',
                  '& fieldset': {
                    border: 'none', // Removed border to match "box" look without outline
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '13px 14px',
                  '&:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px white inset',
                  },
                  '&::placeholder': {
                    color: 'rgba(117, 117, 117, 1)',
                    opacity: 1,
                  }
                }
              }}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: 'rgba(117, 117, 117, 1)' }}
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ fontSize: '20px' }} />
                        ) : (
                          <Visibility sx={{ fontSize: '20px' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: '10px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: 'rgba(117, 117, 117, 1)',
                  paddingRight: '4px',
                  '& fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  height: '50px',
                  padding: '0px 0px 0px 14px',
                  boxSizing: 'border-box',
                  '&:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px white inset',
                  },
                  '&::placeholder': {
                    color: 'rgba(117, 117, 117, 1)',
                    opacity: 1,
                  }
                }
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{
                    color: 'rgba(117, 117, 117, 1)',
                    '&.Mui-checked': {
                      color: 'rgba(0, 28, 166, 1)',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: 'rgba(117, 117, 117, 1)', fontWeight: 500 }}>
                  Remember me
                </Typography>
              }
              sx={{ alignSelf: 'flex-start', marginTop: '-8px', marginLeft: '4px' }}
            />
          </Box>

          {error && (
            <Typography color="error" sx={{ fontFamily: 'Poppins', fontSize: '14px', textAlign: 'center', marginTop: '-16px' }}>
              {error}
            </Typography>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              height: 50,
              borderRadius: '10px',
              backgroundColor: 'rgba(0, 28, 166, 1)',
              color: '#ffffff',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '20px',
              textTransform: 'none', // Prevent all-caps which is MUI default
              '&:hover': {
                backgroundColor: 'rgba(0, 20, 120, 1)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(0, 28, 166, 0.5)',
                color: 'rgba(255, 255, 255, 0.7)'
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'LOGIN'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
