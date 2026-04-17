import './CSS/App.css';
import films from './data.js';
import Table from './components/Table.js';

function App() {
    return (
        <div className="App">
            <h1>Список советских фильмов</h1>
            <Table
                data={films}
                amountRows={15}
                showPagination={false}
            />
        </div>
    );
}

export default App;