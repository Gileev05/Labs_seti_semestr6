import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import films from '../data.js';

const imgData = films.filter(item => item.img);

function Gallery() {
    return (
        <Container maxWidth="lg">
            <Box sx={{width: '100%', height: 585, overflowY: 'scroll', m: '20px auto'}}>
                <ImageList
                    variant="masonry"
                    sx={{
                        columnCount: {
                            xs: '1 !important',
                            sm: '2 !important',
                            md: '3 !important',
                        },
                    }}
                    gap={8}>
                    {imgData.map((item, index) => (
                        <ImageListItem key={index}>
                            <img
                                srcSet={item.img}
                                src={item.img}
                                alt={item["Название"]}
                                loading="lazy"
                            />
                            <ImageListItemBar position="bottom" title={item["Название"]} />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </Container>
    );
}

export default Gallery;