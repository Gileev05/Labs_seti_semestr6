import Container from '@mui/material/Container';
import {filmsTable} from '../data.js';
import Table from './Table.js';

function Content() {
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <h1>Список советских фильмов</h1>
            <Table
                data={filmsTable}
                amountRows={15}
                showPagination={false}
            />
        </Container>
    );
}

export default Content;