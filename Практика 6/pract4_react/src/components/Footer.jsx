import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Footer() {
    return (
        <Box component="footer" sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
                © 2026 Золотая коллекция советского кино
            </Typography>
        </Box>
    );
}

export default Footer;