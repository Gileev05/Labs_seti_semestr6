import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState, useEffect } from "react";
import Filter from './Filter.js';
import Sort from './Sort.js';

const Table = (props) => {
    const { showPagination = true, amountRows = 15 } = props;

    const [dataTable, setDataTable] = useState(props.data);
    const [filteredData, setFilteredData] = useState(props.data);
    const [activePage, setActivePage] = useState("1");
    const [currentSort, setCurrentSort] = useState(null);

    const compareValues = (aVal, bVal, descending) => {
        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return descending ? bVal - aVal : aVal - bVal;
        }

        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();

        if (descending) {
            return bStr.localeCompare(aStr);
        } else {
            return aStr.localeCompare(bStr);
        }
    };

    useEffect(() => {
        let result = [...filteredData];

        if (currentSort && currentSort.level1 && currentSort.level1.field) {
            result.sort((a, b) => {
                let comparison = compareValues(
                    a[currentSort.level1.field],
                    b[currentSort.level1.field],
                    currentSort.level1.descending
                );
                if (comparison === 0 && currentSort.level2 && currentSort.level2.field) {
                    comparison = compareValues(
                        a[currentSort.level2.field],
                        b[currentSort.level2.field],
                        currentSort.level2.descending
                    );
                }
                if (comparison === 0 && currentSort.level3 && currentSort.level3.field) {
                    comparison = compareValues(
                        a[currentSort.level3.field],
                        b[currentSort.level3.field],
                        currentSort.level3.descending
                    );
                }

                return comparison;
            });
        }

        setDataTable(result);
        setActivePage("1");
    }, [filteredData, currentSort]);

    const updateFilteredData = (value) => {
        setFilteredData(value);
    };

    const updateSort = (sortConfig) => {
        setCurrentSort(sortConfig);
    };

    const n = Math.ceil(dataTable.length / amountRows);
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
                filtering={updateFilteredData}
                data={filteredData}
                fullData={props.data}
            />

            <h4>Сортировка</h4>
            <Sort
                onSort={updateSort}
                currentSort={currentSort}
                fields={Object.keys(props.data[0])}
            />

            <table>
                <TableHead
                    head={Object.keys(props.data[0])}
                    onSort={updateSort}
                    currentSort={currentSort}
                />
                <TableBody
                    body={dataTable}
                    amountRows={showPagination ? amountRows : -1}
                    numPage={activePage}
                />
            </table>

            {showPagination && (
                <div className="pagination">
                    {pages}
                </div>
            )}
        </>
    );
};

export default Table;