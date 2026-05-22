import React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, Box, Container } from '@mui/material';
import { movies } from '../data';

function Gallery() {

    const galleryData = movies.slice(0, 5);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ width: '100%', height: 'auto', overflowY: 'hidden', m: '0 auto'}}>
                <ImageList
                    variant="masonry"
                    cols={5}
                    gap={12}
                    sx={{
                        columnCount: { xs: '2 !important', sm: '3 !important', md: '5 !important' },
                    }}

                >
                    {galleryData.map((item) => (
                        <ImageListItem
                            key={item.id}
                            sx={{
                                '&:last-child': {
                                    columnSpan: { xs: 'all', sm: 'none' },
                                    width: { xs: '50%', sm: '100%' },
                                    mx: { xs: 'auto', sm: 0 }
                                }
                            }}
                        >
                                <img
                                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.img}?w=248&fit=crop&auto=format`}
                                    alt={item.title}
                                    loading="lazy"
                                    style={{
                                        borderRadius: '8px'
                                    }}
                                />
                                {item.shortDesc && (
                                    <ImageListItemBar
                                        title={item.title}
                                        subtitle={item.shortDesc}
                                        position="bottom"
                                    />
                                )}

                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </Container>
    );
}

export default Gallery;