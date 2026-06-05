import movies from "../moviesTable";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function MoviesGrid() {
    const rows: GridRowsProp = movies;
    const columns: GridColDef[] = [
        { field: 'Название', headerName: 'Название', flex: 1.2 },
        { field: 'Жанр', headerName: 'Жанр', flex: 0.8 },
        { field: 'Режиссёр', headerName: 'Режиссёр', flex: 0.8 },
        { field: 'Год', headerName: 'Год', flex: 0.4 },
        { field: 'Студия', headerName: 'Киностудия', flex: 0.8 },
    ];

    return (
        <Container maxWidth="lg" sx={{ height: '700px', mt: '20px' }}>
            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                showToolbar={true}
            />
        </Container>
    );
}

export default MoviesGrid;