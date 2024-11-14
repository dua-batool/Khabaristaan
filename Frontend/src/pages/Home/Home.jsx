import React from 'react';
import { Box, Button, Typography, Paper, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './Home.css';
import Header from '../../components/Header/Header';

const HomePage = () => {
  const [dateValue, setDateValue] = React.useState(null);

  return (
    <Box className="homepage" style={{ width: '100vw', minHeight: '100vh' }}>
      
      <Header />

      {/* Title Section */}
      <Box className="title-section" style={{ width: '100vw' }}>
        <Typography variant="h1" className="date">ک۲۰۲۴ کی خبریں</Typography>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          // label="تاریخ منتخب کریں"
          label="Set Date"
          value={dateValue} // state to handle the selected date
          onChange={(newDate) => setDateValue(newDate)} // function to set the selected date
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

        {/* <Box flex="3" maxWidth="75%"> */}
        <Box>
          <Box sx={{display:'flex', flexDirection:'row'}}>
          <Box
            component="img"
            src={"https://via.placeholder.com/400"}
            alt="Content preview"
            sx={{
              width: 400,
              height: 280,
              objectFit: "cover",
            }}
          />
            <Box className="main-article">
              <Typography variant="body1" className="category">پاکستان</Typography>
              <Typography variant="h2" className="headline">
                بشری بی ڈی کی بیانی میں گنواروں کا کردار, وزیر اعظم نے کیا پیشکش؟
              </Typography>
              <Typography variant="body1" className="description">
                پلی بی آئی ڈی نے ذرا زور دیا۔ بات کو گنوار کو مسئلہ چہل بیاں دی۔
                کری این کر...
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
