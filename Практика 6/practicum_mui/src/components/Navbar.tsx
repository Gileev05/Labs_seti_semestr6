import React from 'react';
import { AppBar, Toolbar, Container, Typography, Box, Button, IconButton, Drawer, MenuList, MenuItem, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface NavbarProps {
    active: string;
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: '8px 12px',
}));

const Navbar: React.FC<NavbarProps> = ({ active }) => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const mainColor = '#00bfff';

    return (
        <AppBar position="static" sx={{ boxShadow: 0, bgcolor: 'transparent', mt: '28px' }}>
            <Container maxWidth="xl">
                <StyledToolbar>
                    <Typography variant="h6" sx={{ color: mainColor, fontWeight: 'bold' }}>
                        Советские фильмы - золотая коллекция
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Button variant={active === "1" ? "contained" : "text"} sx={{ bgcolor: active === "1" ? mainColor : 'transparent', color: active === "1" ? 'white' : 'inherit' }}>Главная</Button>
                        <Button variant={active === "2" ? "contained" : "text"} sx={{ color: 'black' }}>Фильмы</Button>
                        <Button variant={active === "3" ? "contained" : "text"} sx={{ color: 'black' }}>Режиссеры</Button>
                        <Button variant={active === "4" ? "contained" : "text"} sx={{ color: 'black' }}>История</Button>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuList>
                                    <MenuItem sx={{ backgroundColor: mainColor, color: 'white' }}>Главная</MenuItem>
                                    <MenuItem>Фильмы</MenuItem>
                                    <MenuItem>Режиссеры</MenuItem>
                                    <MenuItem>История</MenuItem>
                                </MenuList>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;