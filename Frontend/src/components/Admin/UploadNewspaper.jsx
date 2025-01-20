import React, { useState, useRef } from 'react';
import { Box, Button, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
// import './UploadNewspaper.css';
import './style.css';

const UploadNewspapers = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState({ open: false, message: '', severity: '' });
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(URL.createObjectURL(file));
        } else {
            setOpenSnackbar({ open: true, message: 'Please upload a valid PDF file.', severity: 'error' });
            fileInputRef.current.value = null;
        }
    };

    // Handle the upload button click
    const handleUploadClick = () => {
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setOpenSnackbar({ open: true, message: 'PDF uploaded successfully!', severity: 'success' });
            localStorage.setItem('uploadedPdf', pdfFile); // Store PDF in local storage
            setPdfFile(null);
            fileInputRef.current.value = null;
            setLoading(false);
        }, 2000);
    };

    // Close the Snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar({ open: false, message: '', severity: '' });
    };

    return (
        <Box className="body-content">
            <Box className="upload-newspaper">
                <Typography variant="h2" gutterBottom>
                    Upload Newspaper PDF
                </Typography>

                <Button sx={{ backgroundColor: 'var(--dark-brown)', fontFamily: 'Georgia', textTransform: 'none' }}
                    variant="contained"
                    component="label"
                >
                    Choose PDF
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        hidden
                    />
                </Button>
            </Box>

            {pdfFile ? (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>Uploaded PDF:</Typography>
                    <embed
                        src={pdfFile}
                        type="application/pdf"
                        width="100%"
                        height="400px"
                    />
                </Box>
            ) : (
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    No PDF uploaded yet.
                </Typography>
            )}

            <Button
                sx={{ backgroundColor: 'var(--dark-brown)', fontFamily: 'Georgia', marginTop: 2, textTransform: 'none' }}
                variant="contained"
                disabled={!pdfFile || loading}
                onClick={handleUploadClick}
            >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Upload'}
            </Button>

            <Snackbar
                open={openSnackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={openSnackbar.severity} sx={{ width: '100%' }}>
                    {openSnackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UploadNewspapers;
