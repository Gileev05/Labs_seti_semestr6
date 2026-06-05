import React from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';

import {movies} from "../../data";
import MovieCard from "./MovieCard";

function Content() {
    const leftMovies = [movies[0], movies[1], movies[2]];
    const rightMovies = [movies[5], movies[3], movies[4]];

    return (
        <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
            <Grid container spacing={4}>

                <Grid size={{ xs: 12, md: 4 }}>
                    {leftMovies.map(movie => (
                        <MovieCard key={`left-${movie.id}`} movie={movie} />
                    ))}
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ textAlign: 'center', p: 2, position: 'sticky', top: 20 }}>
                        <Typography variant="h4" gutterBottom>
                            Золотая коллекция советского кино
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
                            Советское кино — уникальное явление мировой культуры, подарившее зрителям множество шедевров, которые до сих пор пользуются любовью миллионов. Эти фильмы не просто развлекали, но и воспитывали, учили добру, справедливости и человечности.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
                            В нашей коллекции представлены лучшие комедии, драмы и мелодрамы, созданные на киностудиях СССР. Многие из этих картин стали настоящими символами эпохи, а фразы из них вошли в повседневную речь.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
                            Несмотря на смену эпох, эти фильмы продолжают жить в сердцах зрителей, передаваясь из поколения в поколение и оставаясь актуальными вне зависимости от времени.
                        </Typography>
                        <Button variant="contained" sx={{ mt: 2, bgcolor: '#00bfff', '&:hover': { bgcolor: 'blue' } }}>
                            Подробнее
                        </Button>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    {rightMovies.map(movie => (
                        <MovieCard key={`right-${movie.id}`} movie={movie} />
                    ))}
                </Grid>

            </Grid>
        </Container>
    );
}

export default Content;