import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'Группа', headerName: 'Категория', flex: 1 },
    { field: 'Минимальный рейтинг', headerName: 'Худший рейтинг', flex: 1 },
    { field: 'Максимальный рейтинг', headerName: 'Лучший рейтинг', flex: 1 },
    { field: 'Средний рейтинг', headerName: 'Средний рейтинг', flex: 1 },
];

export default function MovieGroupGrid({ data }: { data: any[] }) {
    return (
        <Container maxWidth="lg" sx={{ height: 400, mb: 10 }}>
            <DataGrid rows={data} columns={columns} hideFooter />
        </Container>
    );
}