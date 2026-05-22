import React from 'react';
import { Typography, Box } from '@mui/material';

function Footer() {
    return (
        <Box component="footer" sx={{ textAlign: 'center', py: 3, mt: 'auto', bgcolor: '#f5f5f5' }}>
            <Typography variant="body2" color="text.secondary">
                © 2026 Золотая коллекция советского кино
            </Typography>
        </Box>
    );
}

export default Footer;