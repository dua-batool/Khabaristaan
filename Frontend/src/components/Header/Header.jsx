import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';

const Header = () => {

  return (
      <Box className="header" style={{ width: '100vw', height: '180px' }}>
        <Box className="header-content">
          <Box className="left-items">
            <Button className="login-button">Login</Button>
            <Box className="search-icon">
                <SearchIcon />
            </Box>
          </Box>
          <Box className="nav-links">
            <Typography variant='h2'>اخبارات</Typography>
            <Link to="/trends" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h2">رجحانات</Typography>
            </Link>
            <Typography variant='h2'>کلاسیفائیڈ</Typography>
            <Typography variant='h2'>ایڈیٹوریل</Typography>
            <Typography variant='h2'>انٹرنیشنل</Typography>
            <Typography variant='h2'>پاکستاں</Typography>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant='h2'>تازہ تریں</Typography>
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
