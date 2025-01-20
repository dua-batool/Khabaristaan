import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { pdfjs } from 'react-pdf';
import axios from 'axios';
import Header from '../../components/Header/Header';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js`;

const Newspapers = () => {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [thumbnails, setThumbnails] = useState({});

    useEffect(() => {
        const fetchNewspapers = async () => {
            try {
                const response = await axios.get('http://your-backend-api.com/newspapers');
                setPdfFiles(response.data);
            } catch (error) {
                console.error('Error fetching newspapers:', error);
            }
        };

        fetchNewspapers();
    }, []);

    useEffect(() => {
        const generateThumbnails = async () => {
            const thumbnailsObj = {};

            for (const pdf of pdfFiles) {
                try {
                    const pdfDoc = await pdfjs.getDocument(pdf.url).promise;
                    const page = await pdfDoc.getPage(1); // Get the first page
                    const viewport = page.getViewport({ scale: 0.5 }); // Adjust the scale for thumbnail size
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    await page.render({
                        canvasContext: context,
                        viewport: viewport,
                    }).promise;

                    thumbnailsObj[pdf.url] = canvas.toDataURL();
                } catch (error) {
                    console.error(`Error generating thumbnail for ${pdf.url}:`, error);
                    thumbnailsObj[pdf.url] = null;
                }
            }

            setThumbnails(thumbnailsObj);
        };

        if (pdfFiles.length > 0) {
            generateThumbnails();
        }
    }, [pdfFiles]);

    const openPdf = (pdfPath) => {
        window.open(pdfPath, '_blank');
    };

    return (
        <Box className="homepage" style={{ width: '100vw', minHeight: '100vh' }}>
            <Header />

            {/* Title Section */}
            <Box className="title-section" style={{ width: '100vw', textAlign: 'center', marginBottom: '20px' }}>
                <Typography variant="h1" className="date">
                    اخبارات
                </Typography>
            </Box>

            {/* PDF Grid Section */}
            <Grid container spacing={3} justifyContent="center" style={{ padding: '20px' }}>
                {pdfFiles.map((pdf, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={index}
                        onClick={() => openPdf(pdf.url)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Box
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                textAlign: 'center',
                                padding: '10px',
                            }}
                        >
                            {thumbnails[pdf.url] ? (
                                <img
                                    src={thumbnails[pdf.url]}
                                    alt={`PDF ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'contain',
                                    }}
                                />
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    Generating thumbnail...
                                </Typography>
                            )}
                            <Typography variant="body1" style={{ marginTop: '10px' }}>
                                {pdf.title}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Newspapers;
