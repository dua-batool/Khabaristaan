import React from 'react';
import { Box, Typography, Divider, FormControl, InputLabel, InputAdornment, MenuItem, Select } from '@mui/material';
import './Search.css';
import Header from '../../components/Header/Header';
import graph from '../../assets/search-graph.png'

const Search = () => {

  return (
    <Box className="homepage" style={{ width: '100vw', minHeight: '100vh' }}>

      <Header />

      {/* Title Section */}
      <Box className="title-section" style={{ width: '100vw' }}>
        <Box className="title-text">
          <Typography variant="h1" className="date">
          “پٹرول”
          </Typography>
        </Box>

      </Box>

      {/* Main Content Section */}
      <Box fullWidth display="flex" className="main-content" gap={2}>
        <Box flex="1" maxWidth="20%" className="sidebar">
        {/* <Box className="sidebar"> */}


        <Box className="dropdowns" fullWidth>
                <FormControl fullWidth sx={{ direction: 'rtl', width: '260px' }}>
                    <InputLabel
                        id="duration-label"
                        sx={{
                            textAlign: 'right',
                            fontSize: '16px',
                            lineHeight: '2.2',
                            marginTop: '-14px',
                        }}
                    >
                        گزشتہ ایک ماہ
                    </InputLabel>
                    <Select
                        labelId="duration-label"
                        id="duration-select"
                        defaultValue=""
                        label="گزشتہ ایک ماہ"
                        className="dropdown"
                        sx={{
                            direction: 'rtl',
                            textAlign: 'right',
                            padding: 0,
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            height: '40px',
                            '.MuiSelect-select': {
                                padding: '4px 8px',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            },
                            '.MuiSelect-icon': {
                                order: -1,
                                marginRight: '8px',
                            },
                        }}
                        MenuProps={{
                            sx: {
                                '& .MuiPaper-root': {
                                    direction: 'rtl',
                                },
                            },
                        }}
                    >
                        <MenuItem value="">مدت: 20 سال</MenuItem>
                        <MenuItem value="5">5 years</MenuItem>
                        <MenuItem value="10">10 years</MenuItem>
                        <MenuItem value="20">20 years</MenuItem>
                    </Select>
                </FormControl>


            </Box>



            <Typography variant="h1">
            متعلقہ موضوعات
            </Typography>

            <Box className="sidebar-item-section">

                <Box className="sidebar-item">
                <Box>
                    <Typography variant="body1">155 نتائج</Typography>
                    </Box>
                <Box className="sidebar-text">
                    <Typography variant="body1">پٹرول کی قیمت</Typography>
                </Box>
                </Box>

                <Box className="sidebar-item">
                <Box>
                    <Typography variant="body1">23 نتائج</Typography>
                    </Box>
                <Box className="sidebar-text">
                    <Typography variant="body1">بڑھتی ہوئی مہنگائی</Typography>
                </Box>
                </Box>

                <Box className="sidebar-item">
                <Box>
                    <Typography variant="body1">18 نتائج</Typography>
                    </Box>
                <Box className="sidebar-text">
                    <Typography variant="body1">حکومت پاکستان</Typography>
                </Box>
                </Box>

                <Box className="sidebar-item">
                <Box>
                    <Typography variant="body1">206 نتائج</Typography>
                    </Box>
                <Box className="sidebar-text">
                    <Typography variant="body1">کار ایندھن</Typography>
                </Box>
                </Box>

            </Box>

        </Box>

        <Box flex="2" maxWidth="60%">
            <Box maxWidth="60%"> 
                <img src={graph} alt="Usage Trend Graph" />
            </Box>

          <Box className="sub-articles" gap={2} mt={4}>
            <Box className="sidebar-item">
                <Box className="date">
                    <Typography variant="h2">
                    ۲۰۲۴.۲.۵
                    </Typography>
                </Box>
                <Box className="sub-article">
                    <Box className="sidebar-text">
                        <Typography sx={{textAlign: 'right',}} variant="h2">گڈلگ جسٹس یحییٰ آفریدی</Typography>
                        <Typography variant="body1" className="author"> پولیس کے مطابق ڈیفنس فیز 5 توحید کمرشل میں فلیٹ سے 3 سے 4 روز پرانی لاش ملی ہے۔</Typography>
                    </Box>
                    <Box>
                    <Typography className="category">کھیل</Typography>
                </Box>
              </Box>
            </Box>

            <Divider />
          
            <Box className="sidebar-item">
                <Box className="date">
                    <Typography variant="h2">
                    ۲۰۲۴.۲.۵
                    </Typography>
                </Box>
                <Box className="sub-article">
                    <Box className="sidebar-text">
                        <Typography sx={{textAlign: 'right',}} variant="h2">سیاست ہو تو ایسی</Typography>
                        <Typography variant="body1" className="author">پولیس نے بتایا کہ مقتول کے جسم پر گولی کا نشان ہے اور مقتول کی شناخت غنی الرحمان کے نام سے ہوئی ہے۔</Typography>
                    </Box>
                    <Box>
                    <Typography className="category">پاکستاں</Typography>
                </Box>
              </Box>
            </Box>

          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
