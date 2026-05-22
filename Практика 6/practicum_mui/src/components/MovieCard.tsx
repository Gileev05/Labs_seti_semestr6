import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Movie } from '../data';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column',  mb: 3 }}>
            <CardMedia
                component="img"
                height="200"
                image={movie.img}
                alt={movie.title}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {movie.fullDesc}
                </Typography>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" size="small" sx={{ bgcolor: '#00bfff', '&:hover': { bgcolor: 'blue' } }}>
                    Подробнее
                </Button>
            </Box>
        </Card>
    );
};

export default MovieCard;