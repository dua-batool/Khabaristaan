import { React, useState } from 'react';
import { Box, Button, Typography, TextField, InputAdornment, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';  // Corrected import for CloseIcon
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Trends.css';
import Header from '../../components/Header/Header';

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
                    placeholder="تلاش کریں"
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
                        style: { textAlign: 'right', height: '80px', borderRadius: '50px', },
                    }}
                    inputProps={{
                        style: { direction: 'rtl', height: '80px', borderRadius: '50px' }
                    }}
                />
            </Box>

            <Box className="search-item">
                <TextField
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="تلاش کریں"
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
                        style: { textAlign: 'right', height: '80px', borderRadius: '50px', },
                    }}
                    inputProps={{
                        style: { direction: 'rtl', height: '80px', borderRadius: '50px' }
                    }}
                />
            </Box>
        </Box>


          <Box className="search-filter-section">

            <Box className="dropdowns">
            <FormControl fullWidth>
                <InputLabel id="section-label">قسم</InputLabel>
                <Select
                    labelId="section-label"
                    id="section-select"
                    defaultValue=""
                    label="قسم"
                    className="dropdown"
                    sx={{ width: '200px', textAlign: 'right' }} // Align text to the right
                    IconComponent={ArrowDropDownIcon} // Position icon to the left
                    InputProps={{
                        style: { textAlign: 'right', height: '100px' }, // Right-align the text inside dropdown
                    }}
                >
                    <MenuItem value="">قسم</MenuItem>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="duration-label">مدت: 20 سال</InputLabel>
                <Select
                    labelId="duration-label"
                    id="duration-select"
                    defaultValue=""
                    label="مدت: 20 سال"
                    className="dropdown"
                    sx={{ width: '200px', textAlign: 'right' }} // Align text to the right
                    IconComponent={ArrowDropDownIcon} // Position icon to the left
                    inputProps={{
                        style: { textAlign: 'right' }, // Right-align the text inside dropdown
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
          <Box className="trend-graph-section">
            <Typography className="graph-title">Use over time for: پرنٹ</Typography>
            <Box className="graph-placeholder"> {/* Replace with actual graph component */}
              <img src="graph-placeholder.png" alt="Usage Trend Graph" />
            </Box>
          </Box>
    
          {/* Results Section */}
          <Typography variant="h2" className="category-title">مشہور مختلف مضامین</Typography>
          <Box className="results-section">
            <Box className="left-results">
              <Typography className="result-item">نیب نے آسیہ کے کردار پر سوالات اٹھا دیے</Typography>
              <Button className="category-button">پاکستان</Button>
              <Typography className="result-item">نیب نے آسیہ کے کردار پر سوالات اٹھا دیے</Typography>
              <Button className="category-button">انٹرنیشنل</Button>
              <Typography className="result-item">نیب نے آسیہ کے کردار پر سوالات اٹھا دیے</Typography>
              <Button className="category-button">انٹرنیشنل</Button>
            </Box>
            
            <Box className="right-results">
              <Box className="right-item">
                <Button className="right-category-button">پاکستان</Button>
                <Typography className="right-item-text">پاکستان: ڈیزل قیمتوں کا استحکام چیلنج</Typography>
              </Box>
              <Box className="right-item">
                <Button className="right-category-button">پاکستان</Button>
                <Typography className="right-item-text">پاکستان: ڈیزل قیمتوں کا استحکام چیلنج</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        </Box>
      );
}

export default Trends;