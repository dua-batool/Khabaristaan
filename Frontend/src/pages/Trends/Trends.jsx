import { React, useState } from 'react';
import { Box, Button, Typography, TextField, InputAdornment, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';  
import { styled } from "@mui/material/styles";
import './Trends.css';
import Header from '../../components/Header/Header';
import graph from '../../assets/search-graph.png';
import KeywordTrendFromCSV from './KeywordTrendFromCSV';

const StyledSelect = styled(Select)(({ theme }) => ({
    "& .MuiSelect-select": {
        padding: "4px 8px", // Adjust padding to reduce space inside
        display: "flex",
        justifyContent: "flex-end", // Align text to the right
        alignItems: "center",
    },
    "& .MuiSvgIcon-root": {
        position: "absolute",
        left: "8px", // Move icon to the left
        right: "unset",
    },
}));

const Trends = () => {
    const [text, setText] = useState('');

    const handleClear = () => {
        setText('');
    };

    return (
        <Box>
        <Header />
        <Box className="container">
          {/* Top Section with Search and Filters */}

          <Box className="search-section">
            <Box className="search-item">
                <TextField
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="موازنہ"
                    sx={{ width: '480px', borderRadius: '50px' }}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <CloseIcon
                                style={{ cursor: 'pointer' }}
                                onClick={handleClear}
                            />
                        </InputAdornment>
                        ),
                        style: { textAlign: 'right', height: '60px', borderRadius: '50px', },
                    }}
                    inputProps={{
                        style: { direction: 'rtl', height: '60px', borderRadius: '50px' }
                    }}
                />
            </Box>

            <Box className="search-item">
                <TextField
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="پٹرول"
                    sx={{ width: '480px', borderRadius: '50px' }}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <CloseIcon
                                style={{ cursor: 'pointer' }}
                                onClick={handleClear}
                            />
                        </InputAdornment>
                        ),
                        style: { textAlign: 'right', height: '60px', borderRadius: '50px' },
                    }}
                    inputProps={{
                        style: { direction: 'rtl', height: '60px', borderRadius: '50px' }
                    }}
                />
            </Box>
        </Box>


          <Box className="search-filter-section">

            <Box className="dropdowns" fullWidth>
                <FormControl fullWidth sx={{ direction: 'rtl', width: '200px' }}>
                    <InputLabel
                        id="section-label"
                        sx={{
                            textAlign: 'right',
                            fontSize: '16px',
                            lineHeight: '2.2',
                            marginTop: '-14px',
                        }}
                    >
                        قسم
                    </InputLabel>
                    <Select
                        labelId="section-label"
                        id="section-select"
                        defaultValue=""
                        label="قسم"
                        className="dropdown"
                        sx={{
                            direction: 'rtl', // Ensures proper alignment for Urdu
                            textAlign: 'right',
                            padding: 0,
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            height: '40px',
                            '.MuiSelect-select': {
                                padding: '4px 8px', // Reduce padding for compact size
                                display: 'flex',
                                justifyContent: 'flex-end', // Aligns text to the right
                                alignItems: 'center',
                            },
                            '.MuiSelect-icon': {
                                order: -1, // Moves the icon to the left
                                marginRight: '8px', // Adds space between icon and text
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
                        <MenuItem value="">قسم</MenuItem>
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ direction: 'rtl', width: '200px' }}>
                    <InputLabel
                        id="duration-label"
                        sx={{
                            textAlign: 'right',
                            fontSize: '16px',
                            lineHeight: '2.2',
                            marginTop: '-14px',
                        }}
                    >
                        مدت: 20 سال
                    </InputLabel>
                    <Select
                        labelId="duration-label"
                        id="duration-select"
                        defaultValue=""
                        label="مدت: 20 سال"
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


          </Box>
    
          {/* Trend Graph Section */}
          {/* <Box className="trend-graph-section">
            <Box > 
              <img src={graph} alt="Usage Trend Graph" width={1200} />
            </Box>
          </Box> */}

          {/* Trend Graph Section */}
        <Box className="trend-graph-section">
            <KeywordTrendFromCSV />
        </Box>
    
          {/* Results Section */}
          <Box className="category-title">
            <Typography variant="h1" >مشہور مختلف مضامین</Typography>
          </Box>

          <Box className="results-section">
            <Box className="left-results">
                <Box className="items">
                    <Typography variant="h2" className="result-item">نیپرا نے آئیسکو پر 5 کروڑ روپے کا جرمانہ لگادیا</Typography>
                    <Typography variant="body1" className="category">انٹرنیشنل</Typography>
                </Box>
                <Box className="items">
                    <Typography variant="h2" className="result-item">نیپرا نے آئیسکو پر 5 کروڑ روپے کا جرمانہ لگادیا</Typography>
                    <Typography variant="body1" className="category">انٹرنیشنل</Typography>
                </Box>
                <Box className="items">
                    <Typography variant="h2" className="result-item">نیپرا نے آئیسکو پر 5 کروڑ روپے کا جرمانہ لگادیا</Typography>
                    <Typography variant="body1" className="category">انٹرنیشنل</Typography>
                </Box>
            </Box>
            
            <Box className="right-results">
                <Box className="items">
                        <Typography variant="h2" className="result-item">پاکستان جوڈیشل کمیشن کا اعلامیہ جاری کردیا گیا</Typography>
                        <Typography variant="body1" className="category">پاکستان</Typography>
                    </Box>
                    <Box className="items">
                        <Typography variant="h2" className="result-item">پاکستان جوڈیشل کمیشن کا اعلامیہ جاری کردیا گیا</Typography>
                        <Typography variant="body1" className="category">پاکستان</Typography>
                    </Box>
                    <Box className="items">
                        <Typography variant="h2" className="result-item">پاکستان جوڈیشل کمیشن کا اعلامیہ جاری کردیا گیا</Typography>
                        <Typography variant="body1" className="category">پاکستان</Typography>
                    </Box>
                </Box>
            </Box>

        </Box>
        </Box>
      );
}

export default Trends;