import React from 'react';
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
            <Typography variant='h2'>پاکستان</Typography>
            <Typography variant='h2'>انٹرنیشنل</Typography>
            <Typography variant='h2'>ادبیات</Typography>
            <Typography variant='h2'>رجحانات</Typography>
            <Typography variant='h2'>کلاسیکی ادب</Typography>
            <Typography variant='h2'>ایڈیٹوریل</Typography>
          </Box>
          <Box className="banner">
            <Typography variant="h1" className="brand-name">ذخیرہ خبر</Typography>
          </Box>
        </Box>
      </Box>
  );
};

export default Header;
