import React from 'react';
import { Box, Button, Typography, Paper, Avatar, IconButton, Divider } from '@mui/material';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './Home.css';
import Header from '../../components/Header/Header';

const HomePage = () => {
  const [dateValue, setDateValue] = React.useState(null);
  const [headlineYear, setHeadlineYear] = React.useState(2024); // Default year

  const handleDateChange = (newDate) => {
    if (newDate) {
      setDateValue(newDate);
      setHeadlineYear(newDate.getFullYear()); // Extract year from the selected date
    }
  };

  return (
    <Box className="homepage" style={{ width: '100vw', minHeight: '100vh' }}>

      <Header />

      {/* Title Section */}
      <Box className="title-section" style={{ width: '100vw' }}>

        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            // label="تاریخ منتخب کریں"
            label="Set Date"
            value={dateValue} // state to handle the selected date
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="0px"
                variant="outlined"
                placeholder="dd/mm/yyyy"
              />
            )}
          />
        </LocalizationProvider>

        <Box className="title-text">
          {/* <Typography variant="h1" className="date">ک۲۰۲۴  کی خبریں</Typography> */}
          <Typography variant="h1" className="date">کی خبریں</Typography>
          <Typography variant="h1" className="date">{headlineYear}</Typography>
          {/* <Typography variant="h1" className="date">۲۰۲۴</Typography> */}
        </Box>

      </Box>

      {/* Main Content Section */}
      <Box fullWidth display="flex" className="main-content" gap={2}>
        <Box flex="1" maxWidth="32%" className="sidebar">
        {/* <Box className="sidebar"> */}
            <Typography variant="h1">
            ادارتی پسند
            </Typography>

            <Box className="sidebar-item">
              <Box>
                  <Typography className="category">کھیل</Typography>
                </Box>
              <Box className="sidebar-text">
                <Typography variant="h2">گڈلگ جسٹس یحییٰ آفریدی</Typography>
                <Typography variant="body1" className="author">حامد میر</Typography>
              </Box>
            </Box>

            {/* <Divider sx={{color:"black"}} /> */}

            <Box className="sidebar-item">
              <Box>
                  <Typography className="category">پاکستاں</Typography>
                </Box>
              <Box className="sidebar-text">
                <Typography variant="h2">سیاست ہو تو ایسی</Typography>
                <Typography variant="body1" className="author">سلیم صافی</Typography>
              </Box>
            </Box>

            {/* <Divider sx={{color:"black"}} /> */}

            <Box className="sidebar-item">
              <Box>
                  <Typography className="category">ایڈیٹوریل</Typography>
                </Box>
              <Box className="sidebar-text">
                <Typography variant="h2">دانستہ اور نادانستہ غلطیاں</Typography>
                <Typography variant="body1" className="author">ایس اے زاہد</Typography>
              </Box>
            </Box>

            {/* <Divider sx={{color:"black"}} /> */}

            <Box className="sidebar-item">
              <Box>
                  <Typography className="category">ایڈیٹوریل</Typography>
                </Box>
              <Box className="sidebar-text">
                <Typography variant="h2">گڈلگ جسٹس یحییٰ آفریدی</Typography>
                <Typography variant="body1" className="author">حامد میر</Typography>
              </Box>
            </Box>

            {/* <Divider sx={{color:"black"}} /> */}

            <Box className="sidebar-item">
              <Box>
                  <Typography className="category">کلاسیفائیڈ</Typography>
                </Box>
              <Box className="sidebar-text">
                <Typography variant="h2">گڈلگ جسٹس یحییٰ آفریدی</Typography>
                <Typography variant="body1" className="author">حامد میر</Typography>
              </Box>
            </Box>

        </Box>

        <Box flex="2" maxWidth="60%">
        {/* <Box> */}
          <Box gap={2} sx={{display:'flex', flexDirection:'row'}}>
          <Box flex="2"
            component="img"
            src={"https://via.placeholder.com/400"}
            alt="Content preview"
            sx={{
              width: 400,
              height: 252,
              objectFit: "cover",
            }}
          />
            <Box flex="3" gap={3} className="main-article">
              <Typography variant="body1" className="category">پاکستان</Typography>
              <Typography variant="h2" className="headline">
              بشریٰ بی بی کی رہائی میں گنڈاپور کا کردار، وزیراعلیٰ نے کیا پیشکش کی؟ 
              </Typography>
              <Typography variant="body1" className="description">
              پی ٹی آئی ذرائع نے دی نیوز کو بتایا ہے کہ گنڈا پور کو معلوم تھا کہ بشریٰ بی بی کو کسی اور کیس میں گرفتار نہیں کیا جائے گا، حکام کی جانب سے انہیں آگاہ کیا گیا کہ بشریٰ بی بی کی اڈیالہ جیل سے رہائی کے بعد ان کی محفوظ۔۔۔
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box className="sub-articles2" gap={2} mt={4}>
            <Box className="sub-article2" flex="1">
                <Typography className="category">انٹرنیشنل</Typography>
                <Box 
                  component="img"
                  src={"https://via.placeholder.com/300"}
                  alt="Content preview"
                  sx={{
                    width: 300,
                    height: 140,
                    objectFit: "cover",
                  }}
                />
                <Typography variant="h2" className="headline2">
                بشریٰ بی بی کی رہائی میں گنڈاپور کا کردار، وزیراعلیٰ نے کیا پیشکش کی؟
                </Typography>
            </Box>

            {/* <Divider /> */}
          
            <Box className="sub-article2" flex="1">
                <Typography className="category">انٹرنیشنل</Typography>
                <Box 
                  component="img"
                  src={"https://via.placeholder.com/300"}
                  alt="Content preview"
                  sx={{
                    width: 300,
                    height: 140,
                    objectFit: "cover",
                  }}
                />
                <Typography variant="h2" className="headline2">
                بشریٰ بی بی کی رہائی میں گنڈاپور کا کردار، وزیراعلیٰ نے کیا پیشکش کی؟
                </Typography>
            </Box>

          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
