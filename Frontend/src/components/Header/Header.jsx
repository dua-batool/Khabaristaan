import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';
import Login from '../Modals/Login'

const Header = () => {
  const location = useLocation(); // Get the current path

  return (
      <Box className="header" style={{ width: '100vw', height: '180px' }}>
        <Box className="header-content">
          <Box className="left-items">
            {/* <Button sx={{fontFamily: 'Georgia', textTransform: 'none', fontSize: '16px'}} className="login-button">Login</Button> */}
            <Login />
            <Link to="/search" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box className="search-icon">
                  <SearchIcon />
              </Box>
            </Link>
          </Box>
          <Box className="nav-links">
          <Box 
              className={`page ${location.pathname === '/collections' ? 'active' : ''}`}>
              <Typography variant='h2'>مجموعے</Typography>
            </Box>
            <Box 
              className={`page ${location.pathname === '/newspapers' ? 'active' : ''}`}>
              <Typography variant='h2'>اخبارات</Typography>
            </Box>
            <Link to="/trends" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box 
                className={`page ${location.pathname === '/trends' ? 'active' : ''}`}>
                <Typography variant="h2">رجحانات</Typography>
              </Box>
            </Link>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box 
                className={`page ${location.pathname === '/' ? 'active' : ''}`}>
                <Typography variant='h2'>خبریں</Typography>
              </Box>
            </Link>
          </Box>
          <Box className="banner">
            <Typography variant="h1" className="brand-name">ذخیرہ خبر</Typography>
          </Box>
        </Box>
      </Box>
  );
};

export default Header;
