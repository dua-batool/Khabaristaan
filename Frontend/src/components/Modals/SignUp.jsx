// SignUp.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = ({ open, onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirming password visibility

  const handleRegister = () => {
    // Add registration logic here
    console.log('Register button clicked');
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'var(--light-beige)',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h1" sx={{ fontSize: '24px' }}>
            Register
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mt={2}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            InputLabelProps={{
              style: { fontFamily: 'Noto Nastaliq Urdu' },
            }}
          />
          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              margin="normal"
              label="Enter Password"
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              variant="outlined"
              InputLabelProps={{
                style: { fontFamily: 'Noto Nastaliq Urdu' },
              }}
            />
            <IconButton
              onClick={togglePasswordVisibility}
              sx={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'} // Toggle confirm password visibility
              variant="outlined"
              InputLabelProps={{
                style: { fontFamily: 'Noto Nastaliq Urdu' },
              }}
            />
            <IconButton
              onClick={toggleConfirmPasswordVisibility}
              sx={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: 'var(--light-brown)',
            color: 'white',
            mt: 3,
            '&:hover': { bgcolor: 'var(--dark-brown)' },
          }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Box mt={2} textAlign="center">
          <Typography
            variant="body1"
            sx={{ fontFamily: 'Noto Nastaliq Urdu' }}
          >
            Already have an account?{' '}
            <Button
              variant="text"
              onClick={onSwitchToLogin}
              sx={{
                color: 'var(--dark-brown)',
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Log in
            </Button>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignUp;
