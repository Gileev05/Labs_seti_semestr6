import React from 'react';
import Navbar from '../components/Navbar';
import { studios, genres, decades } from "./groupdata";

import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Container, Typography } from '@mui/material';
import MovieGroupChart from "./componrnt/GroupChart";
import MovieGroupGrid from "./componrnt/GroupGrid";


type tSelect = "Студия" | "Жанр" | "Десятилетие";

export default function Chart() {
    const [group, setGroup] = React.useState<tSelect>("Студия");
    const [groupData, setGroupData] = React.useState(studios);

    const handleChange = (event: SelectChangeEvent) => {
        const val = event.target.value as tSelect;
        setGroup(val);
        if (val === "Студия") setGroupData(studios);
        else if (val === "Жанр") setGroupData(genres);
        else if (val === "Десятилетие") setGroupData(decades);
    };

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            <Navbar active="3" />

            <Container sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#00bfff', fontWeight: 'bold', textAlign: 'center' }}>
                    Статистика коллекции по рейтингу
                </Typography>

                <Box sx={{ width: "300px", m: "30px auto" }}>
                    <FormControl fullWidth sx={{ bgcolor: 'white' }}>
                        <InputLabel>Группировать по</InputLabel>
                        <Select value={group} label="Группировать по" onChange={handleChange}>
                            <MenuItem value="Студия">Киностудии</MenuItem>
                            <MenuItem value="Жанр">Жанрам</MenuItem>
                            <MenuItem value="Десятилетие">Десятилетиям</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <MovieGroupChart data={groupData} />
                <Typography variant="h6" sx={{ mt: 5, mb: 2 }}>Подробная таблица:</Typography>
                <MovieGroupGrid data={groupData} />
            </Container>
        </Box>
    );
}