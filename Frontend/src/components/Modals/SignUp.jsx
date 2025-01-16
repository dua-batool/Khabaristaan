// SignUp.jsx
import React from 'react';
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const SignUp = ({ open, onClose, onSwitchToLogin }) => {
  const handleRegister = () => {
    // Add registration logic here
    console.log('Register button clicked');
  };

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
          <TextField
            fullWidth
            margin="normal"
            label="Enter Password"
            type="password"
            variant="outlined"
            InputLabelProps={{
              style: { fontFamily: 'Noto Nastaliq Urdu' },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            variant="outlined"
            InputLabelProps={{
              style: { fontFamily: 'Noto Nastaliq Urdu' },
            }}
          />
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
