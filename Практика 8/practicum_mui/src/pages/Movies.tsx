import { useParams, Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { movies } from "../data";
import Navbar from "../components/Navbar";

function Movie() {
    const { id } = useParams<{ id: string }>();

    const item = movies.find(m => m.id === id);

    if (!item) {
        return (
            <Box>
                <Navbar active="1" />
                <Container sx={{ mt: 5, textAlign: 'center' }}>
                    <Typography variant="h5" color="error">Фильм не найден</Typography>
                </Container>
            </Box>
    );
    }

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pb: 5 }}>
            <Navbar active="1" />
            <Container sx={{ mt: 3 }}>
                <nav style={{ marginBottom: '20px', fontSize: '14px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#00bfff' }}>Главная</Link> / {item.title}
                </nav>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4,
                        bgcolor: 'white',
                        p: 4,
                        borderRadius: '12px',
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.05)'
                    }}
                >
                    <img
                        src={item.img}
                        alt={item.title}
                        style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div>
                        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                            {item.title}
                        </Typography>

                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, fontStyle: 'italic' }}>
                            {item.shortDesc}
                        </Typography>

                        <Typography variant="body1" sx={{ lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                            {item.fullDesc}
                        </Typography>
                    </div>
                </Box>
            </Container>
        </Box>
);
}

export default Movie;