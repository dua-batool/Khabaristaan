import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './UploadArticle.css';
import axios from 'axios'; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';  
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';  

const UploadArticle = () => {
    const [headline, setHeadline] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [publishedDate, setPublishedDate] = useState(null);  
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle image upload
    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...selectedFiles]);
    };

    // Remove selected image
    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    // Handle form submission (upload article data)
    const handleUpload = async () => {
        if (!headline || !content || !publishedDate) { 
            setOpenSnackbar(true);
            return;
        }

        setLoading(true); // Set loading state when submission starts

        const formData = new FormData();
        formData.append('headline', headline);
        formData.append('content', content);
        formData.append('publishedDate', publishedDate);  

        // Append images to formData, only if images exist
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            // Make a POST request to the backend
            const response = await axios.post('/your-backend-api-endpoint', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });

            console.log('Article uploaded:', response.data);
        
            // Reset form fields after successful upload
            setHeadline('');
            setContent('');
            setPublishedDate(null);
            setImages([]);
            setLoading(false); // Reset loading state
        } catch (error) {
            console.error('Error uploading article:', error);
            setLoading(false); // Reset loading state
        }
    };

    return (
        <Box className="upload-body">
            <Typography variant="h2" gutterBottom sx={{ fontFamily: 'Georgia', mb: 2 }}>
                Upload Article
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.6 }}>
            <TextField
                label="Article Headline"
                variant="outlined"
                fullWidth
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                sx={{ mb: 2, fontFamily: 'Georgia' }}
                className="custom-textfield"
                InputProps={{
                    sx: { lineHeight: '2', fontFamily: 'Georgia' },
                }}
                InputLabelProps={{
                    sx: { fontFamily: 'Georgia' },
                }}
            />

            {/* Published Date Field */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Published Date"
                    value={publishedDate}
                    onChange={(newValue) => setPublishedDate(newValue)}
                    className="custom-textfield"
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            required 
                            sx={{ mb: 2, fontFamily: 'Georgia' }} 
                            className="custom-textfield" 
                        />
                    )}
                />
            </LocalizationProvider>
            </Box>

            <TextField
                label="Article Content"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{ mb: 2, fontFamily: 'Georgia' }}
                className="custom-textfield"
                InputProps={{
                    sx: { lineHeight: '2', fontFamily: 'Georgia' },
                }}
                InputLabelProps={{
                    sx: { fontFamily: 'Georgia' },
                }}
            />

            <Button
                variant="outlined"
                component="label"
                sx={{
                    mb: 2,
                    color: 'var(--dark-brown)',
                    borderColor: 'var(--dark-brown)',
                    fontFamily: 'Georgia',
                    textTransform: 'none',
                }}
            >
                Upload Images (Optional)
                <input type="file" accept="image/*" hidden multiple onChange={handleImageChange} />
            </Button>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                {images.map((image, index) => (
                    <Box key={index} sx={{ position: 'relative' }}>
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
                        />
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                            }}
                            onClick={() => handleRemoveImage(index)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Box>

            <Button
                variant="contained"
                sx={{
                    backgroundColor: 'var(--dark-brown)',
                    fontFamily: 'Georgia',
                    textTransform: 'none',
                }}
                onClick={handleUpload}
                disabled={loading || !headline || !content || !publishedDate} // Disable button when loading or fields are empty
            >
                {loading ? 'Uploading...' : 'Upload'}
            </Button>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                    Please fill in all required fields.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UploadArticle;
