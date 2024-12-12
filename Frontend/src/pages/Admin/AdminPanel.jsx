import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { Box, Typography } from '@mui/material';
import './AdminPanel.css';
import UploadNewspapers from '../../components/Admin/UploadNewspaper';
import DeleteNewspapers from '../../components/Admin/DeleteNewspaper';

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
                return <Typography>Upload Article Content</Typography>;
            case 'uploadEPaper':
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
                        <Typography variant="h2">Upload Newspaper</Typography>
                    </Box>
                    <Box 
                        className={`tab ${activeTab === 'deleteNewspaper' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('deleteNewspaper')}
                    >
                        <Typography variant="h2">Delete Newspaper</Typography>
                    </Box>
                    <Box 
                        className={`tab ${activeTab === 'uploadArticle' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('uploadArticle')}
                    >
                        <Typography variant="h2">Upload Article</Typography>
                    </Box>
                    <Box 
                        className={`tab ${activeTab === 'uploadEPaper' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('uploadEPaper')}
                    >
                        <Typography variant="h2">Upload E-Paper</Typography>
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
