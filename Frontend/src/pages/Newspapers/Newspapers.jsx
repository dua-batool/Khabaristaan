import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { pdfjs } from 'react-pdf';
import Header from '../../components/Header/Header';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js`;

const pdfFiles = [
    'one.pdf',
    'two.pdf',
    'three.pdf',
    'four.pdf',
    'five.pdf',
    'six.pdf',
    // Add more PDF file paths here
];

const Newspapers = () => {
    const [thumbnails, setThumbnails] = useState({});

    useEffect(() => {
        const generateThumbnails = async () => {
            const thumbnailsObj = {};

            for (const pdf of pdfFiles) {
                try {
                    const pdfDoc = await pdfjs.getDocument(pdf).promise;
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

                    thumbnailsObj[pdf] = canvas.toDataURL();
                } catch (error) {
                    console.error(`Error generating thumbnail for ${pdf}:`, error);
                    thumbnailsObj[pdf] = null;
                }
            }

            setThumbnails(thumbnailsObj);
        };

        generateThumbnails();
    }, []);

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
                        onClick={() => openPdf(pdf)}
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
                            {thumbnails[pdf] ? (
                                <img
                                    src={thumbnails[pdf]}
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
                                PDF {index + 1}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Newspapers;
