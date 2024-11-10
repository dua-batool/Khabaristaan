import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import './Home.css';

const HomePage = () => {
  return (
    <Box className="homepage" style={{ width: '100vw', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box className="header">
        <Button className="login-button">Login</Button>
        <Box className="search-icon">🔍</Box>
        <Box className="nav-links">
          <Typography>پاکستان</Typography>
          <Typography>انٹرنیشنل</Typography>
          <Typography>ادبیات</Typography>
          <Typography>رجحانات</Typography>
          <Typography>کلاسیکی ادب</Typography>
          <Typography>ایڈیٹوریل</Typography>
        </Box>
      </Box>

      {/* Title Section */}
      <Box className="title-section">
        <Typography className="brand-name">ذخیرہ خبر</Typography>
        <Typography className="date">۲۰۲۴ کی خبریں</Typography>
      </Box>

      {/* Main Content Section */}
      <Box display="flex" className="main-content" gap={2}>
        <Box flex="1" maxWidth="25%">
          <Paper className="sidebar">
            <Typography className="category">کھیل</Typography>
            <Typography className="headline">اولڈ ٹریفورڈ پسندیدہ</Typography>
            <Typography className="author">کولن جسٹن جمی آندری</Typography>

            <Typography className="category">پاکستان</Typography>
            <Typography className="headline">سیاست ہو تو ایسی</Typography>
            <Typography className="author">سلیم صافی</Typography>

            <Typography className="category">انٹرنیشنل</Typography>
            <Typography className="headline">واقعات اور حادثات ظلمت</Typography>
            <Typography className="author">ایس اے زاہد</Typography>

            {/* Additional items go here */}
          </Paper>
        </Box>

        <Box flex="3" maxWidth="75%">
          <Paper className="main-article">
            <Typography className="category">پاکستان</Typography>
            <Typography className="headline">
              بشری بی ڈی کی بیانی میں گنواروں کا کردار, وزیر اعظم نے کیا پیشکش؟
            </Typography>
            <Typography className="description">
              پلی بی آئی ڈی نے ذرا زور دیا۔ بات کو گنوار کو مسئلہ چہل بیاں دی۔
              کری این کر...
            </Typography>
          </Paper>

          <Box display="flex" gap={2} mt={2}>
            <Box flex="1">
              <Paper className="sub-article">
                <Typography className="category">انٹرنیشنل</Typography>
                <Typography className="headline">
                  بشری بی ڈی کی بیانی میں گنواروں کا کردار
                </Typography>
              </Paper>
            </Box>
            <Box flex="1">
              <Paper className="sub-article">
                <Typography className="category">انٹرنیشنل</Typography>
                <Typography className="headline">
                  بشری بی ڈی کی بیانی میں گنواروں کا کردار
                </Typography>
              </Paper>
            </Box>
            <Box flex="1">
              <Paper className="sub-article">
                <Typography className="category">انٹرنیشنل</Typography>
                <Typography className="headline">
                  بشری بی ڈی کی بیانی میں گنواروں کا کردار
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
