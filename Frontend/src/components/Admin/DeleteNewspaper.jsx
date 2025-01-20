import React, { useState, useEffect } from 'react';
import { Box, Typography, Checkbox, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import './DeleteNewspaper.css';

const DeleteNewspapers = () => {
    const [pdfList, setPdfList] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    // Fetch uploaded PDFs from backend
    useEffect(() => {
        axios.get('http://localhost:5000/files')
            .then(response => setPdfList(response.data))
            .catch(error => console.error('Error fetching PDFs:', error));
    }, []);

    // Handle individual checkbox selection
    const handleCheckboxChange = (fileId) => {
        setSelectedFiles(prevSelected =>
            prevSelected.includes(fileId)
                ? prevSelected.filter(id => id !== fileId)
                : [...prevSelected, fileId]
        );
    };

    // Handle select all
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(pdfList.map(file => file._id));
        }
        setSelectAll(!selectAll);
    };

    // Open delete confirmation dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Close delete confirmation dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Handle delete action
    const handleDeleteSelected = () => {
        axios.post('http://localhost:5000/delete', { ids: selectedFiles })
            .then(() => {
                setPdfList(prevList => prevList.filter(file => !selectedFiles.includes(file._id)));
                setSelectedFiles([]);
                setSelectAll(false);
            })
            .catch(error => console.error('Error deleting PDFs:', error));
        setOpenDialog(false);
    };

    return (
        <Box className="delete-body">
            <Typography variant="h2" gutterBottom sx={{ fontFamily: "Georgia", mb: 2 }}>
                Delete Newspaper PDF
            </Typography>
            
            <Typography variant="body1" sx={{ fontFamily: "Georgia", mb: 2 }}>
                Total {selectedFiles.length} items selected
            </Typography>
            
            <Box>
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
                <Typography component="span" sx={{ fontFamily: "Georgia" }}>Select All</Typography>
                <IconButton onClick={handleOpenDialog} color="error" sx={{ ml: 2 }}>
                    <DeleteIcon />
                </IconButton>
            </Box>

            <Box className="pdf-list" sx={{ mt: 2 }}>
                {pdfList.length > 0 ? (
                    pdfList.map((file) => (
                        <Box key={file._id} className="pdf-item" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Checkbox 
                                checked={selectedFiles.includes(file._id)}
                                onChange={() => handleCheckboxChange(file._id)}
                            />
                            <Typography sx={{ fontFamily: "Georgia" }}>{file.filename}</Typography>
                        </Box>
                    ))
                ) : (
                    <Typography sx={{ fontFamily: "Georgia" }}>No PDFs uploaded.</Typography>
                )}
            </Box>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Deleting the selected newspapers is an irreversible action. Are you sure?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteSelected} color="error">Yes, Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DeleteNewspapers;
