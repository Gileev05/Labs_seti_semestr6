const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);
    const header = Object.keys(data[0]);

    /* создание шапки таблицы */
    const headerRow = createHeaderRow(header);
    table.append(headerRow);

    /* создание тела таблицы */
    const bodyRows = createBodyRows(data);
    table.append(bodyRows);
};

const createHeaderRow = (headers) => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerHTML = header;
        tr.append(th);
    });
    return tr;
};

const createBodyRows = (rows) => {
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(field => {
            const td = document.createElement('td');
            td.innerHTML = field;
            tr.append(td);
        })
        tbody.append(tr);
    });
    return tbody;
}

const clearTable = (idTable) => {
    document.getElementById(idTable).innerHTML = '';
}