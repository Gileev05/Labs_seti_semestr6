import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState } from "react";
import Filter from './Filter.js';

const Table = (props) => {

    const { showPagination = true } = props;

    const [dataTable, setDataTable] = useState(props.data);
    const [activePage, setActivePage] = useState("1");

    const updateDataTable = (value) => setDataTable(value);

    const n = Math.ceil(dataTable.length / props.amountRows);
    const arr = Array.from({ length: n }, (v, i) => i + 1);

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const pages = arr.map((item, index) => (
        <span
            key={index}
            className={item == activePage ? 'active' : ''}
            onClick={changeActive}>
            {item}
        </span>
    ));

    return(
        <>
            <h4>Фильтры</h4>
            <Filter
                filtering={ updateDataTable }
                data={dataTable}
                fullData={props.data}
            />

            <table>
                <TableHead head={ Object.keys(props.data[0]) } />
                <TableBody
                    body={dataTable}
                    amountRows={showPagination ? props.amountRows : -1}
                    numPage={activePage}/>
            </table>

            {showPagination && (
                <div className="pagination">
                    {pages}
                </div>
            )}
        </>
    )
}

export default Table;