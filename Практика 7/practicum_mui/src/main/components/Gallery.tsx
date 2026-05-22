import React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, Box, Container } from '@mui/material';
import { movies } from "../../data";
import { Link } from 'react-router-dom';

function Gallery() {
    const galleryData = movies.slice(0, 5);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ width: '100%', height: 'auto', overflowY: 'hidden', m: '0 auto' }}>
                <ImageList
                    variant="masonry"
                    cols={5}
                    gap={12}
                    sx={{
                        columnCount: { xs: '2 !important', sm: '3 !important', md: '5 !important' },
                    }}>
                {galleryData.map((item) => (
                    <Link
                        key={item.id}
                        to={`/movie/${item.id}`}
                        style={{ textDecoration: 'none', display: 'block' }}
                    >
                        <ImageListItem
                            sx={{
                                cursor: 'pointer',
                                '&:hover img': { transform: 'scale(1.02)', transition: '0.3s' }
                            }}
                        >
                            <img
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                                style={{ borderRadius: '8px', width: '100%' }}
                            />
                            {item.shortDesc && (
                                <ImageListItemBar
                                    title={item.title}
                                    subtitle={item.shortDesc}
                                    position="bottom"
                                />
                                )}
                        </ImageListItem>
                    </Link>
                ))}
            </ImageList>
        </Box>
</Container>
);
}

export default Gallery;