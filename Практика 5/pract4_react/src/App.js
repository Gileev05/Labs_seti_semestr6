import './CSS/App.css';
import films from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { useState } from 'react';

function App() {
    const [filteredDataForChart, setFilteredDataForChart] = useState(films);
    const [filteredDataForTable, setFilteredDataForTable] = useState(films);

    const handleTableFilter = (data) => {
        setFilteredDataForTable(data);
        setFilteredDataForChart(data);
    };

    return (
        <div className="App">
            <h1>Список советских фильмов</h1>

            <div>
                <Chart data={filteredDataForChart} />
            </div>

            <h2>Таблица фильмов</h2>
            <Table
                data={films}
                amountRows={15}
                showPagination={false}
                onFilterChange={handleTableFilter}
            />
        </div>
    );
}

export default App;