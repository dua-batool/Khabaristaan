import React from 'react';
import { Box, Button, Typography, Paper, Avatar, IconButton } from '@mui/material';
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
        {/* <Box flex="1" maxWidth="25%"> */}
        <Box>
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
