import { useParams, Link } from 'react-router-dom';
import {
    Box, Container
} from '@mui/material';
import structures from "../data";
import Navbar from "../components/Navbar";

function Building() {
    const { id } = useParams();
    const item = structures[Number(id)];

    return (
        <Box>
            <Navbar active="1"/>
            <Container maxWidth="lg" sx={{ mt: 3 }}>
                <nav style={{ marginBottom: '20px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#5d8aa8' }}>Главная</Link> / {item.title}
                </nav>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4 }}>
                    <img src={item.img} alt="" />
                    <div>
                        <h2>{item.title}</h2>
                        {item.description.map((text, i) => <p key={i}>{text}</p>)}
                    </div>
                </Box>
            </Container>
        </Box>
    );
}

export default Building;