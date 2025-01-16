import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SignUp from './SignUp';

const Login = () => {
  const [open, setOpen] = useState(false); // State for Login Modal
  const [openSignUp, setOpenSignUp] = useState(false); // State for SignUp Modal
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleLoginOpen = () => {
    setOpen(true); // Open Login Modal
    setOpenSignUp(false); // Close SignUp Modal
  };

  const handleLoginClose = () => setOpen(false);

  const handleSignUpOpen = () => {
    setOpenSignUp(true);
    setOpen(false); // Close Login Modal
  };

  const handleSignUpClose = () => setOpenSignUp(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'var(--light-beige)',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <>
      {/* Login Button */}
      <Button
        onClick={handleLoginOpen}
        sx={{ fontFamily: 'Noto Nastaliq Urdu, sans-serif', textTransform: 'none', fontSize: '16px' }}
        className="login-button"
      >
        Login
      </Button>

      {/* Login Modal */}
      <Modal
        open={open}
        onClose={handleLoginClose}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleLoginClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon sx={{ color: 'var(--dark-brown)' }} />
          </IconButton>

          <Typography
            id="login-modal-title"
            variant="h1"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ color: 'var(--dark-brown)' }}
          >
            Login
          </Typography>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Email Input */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{ style: { fontFamily: 'Noto Nastaliq Urdu, sans-serif' } }}
              sx={{ fontFamily: 'Noto Nastaliq Urdu, sans-serif' }}
            />
            {/* Password Input with visibility toggle */}
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{ style: { fontFamily: 'Noto Nastaliq Urdu, sans-serif' } }}
              sx={{ fontFamily: 'Noto Nastaliq Urdu, sans-serif' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* Forgot Password */}
            <Button
              variant="text"
              sx={{ display: 'flex', justifyContent: 'flex-start', color: 'var(--light-brown)', fontFamily: 'Noto Nastaliq Urdu, sans-serif', textTransform: 'none', fontSize: 14 }}
            >
              Forgot Password?
            </Button>
            {/* Submit Button */}
            <Button
              variant="contained"
              sx={{
                bgcolor: 'var(--dark-brown)',
                color: 'var(--light-beige)',
                fontFamily: 'Noto Nastaliq Urdu, sans-serif',
                textTransform: 'none',
                fontSize: 16,
              }}
              fullWidth
              type="submit"
            >
              Login
            </Button>
          </Box>

          {/* Sign Up Button */}
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mt: 2, color: 'var(--dark-brown)', fontFamily: 'Noto Nastaliq Urdu, sans-serif' }}
          >
            Don’t have an account?
            <Button
              variant="text"
              onClick={handleSignUpOpen}
              sx={{ color: 'var(--light-brown)', fontFamily: 'Noto Nastaliq Urdu, sans-serif', textTransform: 'none', fontSize: 14 }}
            >
              Sign up here
            </Button>
          </Typography>
        </Box>
      </Modal>

      {/* SignUp Modal */}
      <SignUp open={openSignUp} onClose={handleSignUpClose} onSwitchToLogin={handleLoginOpen} />
    </>
  );
};

export default Login;
