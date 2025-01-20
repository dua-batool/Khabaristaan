import React, { useState, useEffect } from 'react';
import { Box, Typography, Checkbox, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './style.css';

const DeleteArticle = () => {
    const [articleList, setArticleList] = useState([]);
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredArticles, setFilteredArticles] = useState([]);

    // Fetch articles from backend
    useEffect(() => {
        axios.get('http://localhost:5000/articles')
            .then(response => setArticleList(response.data))
            .catch(error => console.error('Error fetching articles:', error));
    }, []);

    // Filter articles based on selected date
    useEffect(() => {
        if (selectedDate) {
            const filtered = articleList.filter(article => {
                const articleDate = new Date(article.publishedDate).toLocaleDateString();
                const selectedDateStr = selectedDate.toLocaleDateString();
                return articleDate === selectedDateStr;
            });
            setFilteredArticles(filtered);
        } else {
            setFilteredArticles(articleList); // Show all articles if no date is selected
        }
    }, [selectedDate, articleList]);

    // Handle individual checkbox selection
    const handleCheckboxChange = (articleId) => {
        setSelectedArticles(prevSelected =>
            prevSelected.includes(articleId)
                ? prevSelected.filter(id => id !== articleId)
                : [...prevSelected, articleId]
        );
    };

    // Handle select all
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedArticles([]);
        } else {
            setSelectedArticles(filteredArticles.map(article => article._id));
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
        axios.post('http://localhost:5000/delete-articles', { ids: selectedArticles })
            .then(() => {
                setArticleList(prevList => prevList.filter(article => !selectedArticles.includes(article._id)));
                setSelectedArticles([]);
                setSelectAll(false);
            })
            .catch(error => console.error('Error deleting articles:', error));
        setOpenDialog(false);
    };

    return (
        <Box className="body-content">
            <Typography variant="h2" gutterBottom sx={{ fontFamily: "Georgia", mb: 2 }}>
                Delete Articles
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                {/* Date Filter */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Select Published Date"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        className="custom-textfield"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{ fontFamily: 'Georgia' }}
                                className="custom-textfield" 
                            />
                        )}
                    />
                </LocalizationProvider>

                {/* Filtered Articles Count */}
                {selectedDate && (
                    <Typography variant="body1" sx={{ fontFamily: 'Georgia', mb: 2 }}>
                        Total {filteredArticles.length} articles found for {selectedDate.toLocaleDateString()}
                    </Typography>
                )}

                {/* Select All and Delete Button */}
                <Box>
                    <Checkbox checked={selectAll} onChange={handleSelectAll} />
                    <Typography component="span" sx={{ fontFamily: "Georgia" }}>Select All</Typography>
                    <IconButton onClick={handleOpenDialog} color="error" sx={{ ml: 2 }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Article List */}
            <Box className="article-list" sx={{ mt: 2 }}>
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <Box key={article._id} className="article-item" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Checkbox
                                checked={selectedArticles.includes(article._id)}
                                onChange={() => handleCheckboxChange(article._id)}
                            />
                            <Typography sx={{ fontFamily: 'Georgia' }}>{article.headline}</Typography>
                        </Box>
                    ))
                ) : (
                    <Typography sx={{ fontFamily: "Georgia" }}>No articles found for the selected date.</Typography>
                )}
            </Box>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Deleting the selected articles is an irreversible action. Are you sure?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteSelected} color="error">Yes, Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DeleteArticle;
