// src/typography.jsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Nastaliq Urdu, sans-serif', // Add the font family here
    body1: {
      fontSize: 16, // Body text font size
    },
    h1: {
      fontFamily: 'Noto Nastaliq Urdu, sans-serif', // Ensure it's applied to Heading 1
      fontSize: 28, // Heading 1 font size
    },
    h2: {
      fontFamily: 'Noto Nastaliq Urdu, sans-serif',
      fontSize: 20, // Subheading font size
    },
  },
});

export default theme;
