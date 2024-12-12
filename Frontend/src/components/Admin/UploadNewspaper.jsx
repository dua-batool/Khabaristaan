import React, { useState, useRef } from 'react';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import './UploadNewspaper.css';

const UploadNewspapers = () => {
    const [pdfFile, setPdfFile] = useState(null);  // State to store the uploaded PDF file
    const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility
    const fileInputRef = useRef(null); // Ref to file input element

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(URL.createObjectURL(file)); // Store the file URL to display it
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    // Handle the upload button click
    const handleUploadClick = () => {
        setOpenSnackbar(true); // Open Snackbar when the upload button is clicked
        setPdfFile(null); // Reset the uploaded PDF file so the user can upload another
        fileInputRef.current.value = null; // Reset the file input field
    };

    // Close the Snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box className="upload-body">
            <Box className="upload-newspaper">
                <Typography variant="h2" gutterBottom>
                    Upload Newspaper PDF
                </Typography>
                
                <Button sx={{ backgroundColor: 'var(--dark-brown)', fontFamily: 'Georgia', textTransform: 'none'}} variant="contained" component="label">
                    Choose PDF
                    <input 
                        ref={fileInputRef} // Attach the ref to the file input
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

            {/* Disabled button until the PDF is uploaded */}
            <Button 
                sx={{ backgroundColor: 'var(--dark-brown)', fontFamily: 'Georgia', marginTop: 2, textTransform: 'none' }} 
                variant="contained" 
                disabled={!pdfFile}  // Disable button if no PDF is uploaded
                onClick={handleUploadClick} // Show snackbar on upload button click
            >
                Upload
            </Button>

            {/* Snackbar for success message */}
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={3000} // Automatically hide after 3 seconds
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    PDF uploaded successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UploadNewspapers;
