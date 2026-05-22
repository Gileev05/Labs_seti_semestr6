import React, { ComponentProps } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Drawer from '@mui/material/Drawer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button variant={active === "1" ? "contained" : "text"} color="info" size="medium">
                                Главная
                            </Button>
                        </Link>
                        <Link to="/list" style={{ textDecoration: 'none' }}>
                            <Button variant={active === "2" ? "contained" : "text"} color="info" size="medium" sx={{ ml: 1 }}>
                                Фильмы
                            </Button>
                        </Link>
                        <Link to="/chart" style={{ textDecoration: 'none' }}>
                            <Button variant={active === "3" ? "contained" : "text"} color="info" size="medium" sx={{ ml: 1 }}>
                                Диаграммы
                            </Button>
                        </Link>
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
                                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <MenuItem sx={{ '&:hover': { backgroundColor: mainColor, color: 'white' } }}>
                                            Главная
                                        </MenuItem>
                                    </Link>
                                    <Link to="/list" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <MenuItem sx={{ '&:hover': { backgroundColor: mainColor, color: 'white' } }}>
                                            Фильмы
                                        </MenuItem>
                                    </Link>
                                    <Link to="/chart" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <MenuItem sx={{ '&:hover': { backgroundColor: mainColor, color: 'white' } }}>
                                            Диаграммы
                                        </MenuItem>
                                    </Link>
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