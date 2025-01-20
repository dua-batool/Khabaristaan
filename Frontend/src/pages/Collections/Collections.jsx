import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import './Collections.css';
import Header from '../../components/Header/Header';

const Collections = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await axios.get('http://your-backend-api.com/collections');
                setCollections(response.data);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };
        fetchCollections();
    }, []);

    return (
        <Box className="homepage" style={{ width: '100vw', minHeight: '100vh' }}>
            <Header />

            {/* Title Section */}
            <Box className="title-section" style={{ width: '100vw', textAlign: 'center', marginBottom: '20px' }}>
                <Typography variant="h1">مجموعے</Typography>
            </Box>

            {/* Collections Section */}
            <Box className="collection" style={{ width: '88vw', padding: '32px' }}>
                {collections.length > 0 ? (
                    collections.map((collection, index) => (
                        <Box key={index} className="collection-item" style={{ marginBottom: '20px' }}>
                            <Typography variant="h1" className="collection-title">
                                {collection.title}
                            </Typography>
                            <Typography variant="h2" className="amount">
                                {collection.amount}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="h2">کوئی مجموعے دستیاب نہیں</Typography>
                )}
            </Box>
        </Box>
    );
};

export default Collections;
