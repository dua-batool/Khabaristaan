import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { Box, Typography } from '@mui/material';
import './AdminPanel.css';
import UploadNewspapers from '../../components/Admin/UploadNewspaper';
import DeleteNewspapers from '../../components/Admin/DeleteNewspaper';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import DescriptionIcon from '@mui/icons-material/Description'; // For e-paper
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('uploadNewspaper'); // Set initial active tab

    // Conditional rendering for content
    const renderContent = () => {
        switch (activeTab) {
            case 'uploadNewspaper':
                return <Typography><UploadNewspapers /></Typography>;
            case 'deleteNewspaper':
                return <Typography><DeleteNewspapers /></Typography>;
            case 'uploadArticle':
                return <Typography><NewspaperIcon /></Typography>;
            case 'deleteArticle':
                return <Typography>Upload E-Paper Content</Typography>;
            default:
                return <Typography>Choose an option from the tabs</Typography>;
        }
    };

    return (
        <>
            <Header />
            <Box className="main">
                <Box className="tabs">
                    <Box 
                        className={`tab ${activeTab === 'uploadNewspaper' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('uploadNewspaper')}
                    >
                        <Box className='tabContent'>
                            <NewspaperIcon />
                            <Typography sx={{ fontFamily: 'Georgia', fontWeight: 400 }} variant="h2">Upload Newspaper</Typography>
                        </Box>
                    </Box>
                    <Box 
                        className={`tab ${activeTab === 'deleteNewspaper' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('deleteNewspaper')}
                    >
                        <Box className='tabContent'>
                            <DeleteIcon />
                            <Typography sx={{ fontFamily: 'Georgia', fontWeight: 400 }} variant="h2">Delete Newspaper</Typography>
                        </Box>
                    </Box>
                    <Box 
                        className={`tab ${activeTab === 'uploadArticle' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('uploadArticle')}
                    >
                        <Box className='tabContent'>
                            <ArticleIcon />
                            <Typography sx={{ fontFamily: 'Georgia', fontWeight: 400 }} variant="h2">Upload Article</Typography>
                        </Box>
                    </Box>
                    <Box 
                        className={`tab ${activeTab === 'deleteArticle' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('deleteArticle')}
                    >
                        <Box className='tabContent'>
                            <DeleteIcon />
                            <Typography sx={{ fontFamily: 'Georgia', fontWeight: 400 }} variant="h2">Delete Article</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className="content">
                    {renderContent()} {/* This will render the content based on the active tab */}
                </Box>
            </Box>
        </>
    );
};

export default AdminPanel;
