let films = [];

const correspond = {
    "Название": "name",
    "Рейтинг": "rate",
    "Город": "city_filter",
    "Год": ["year_from", "year_to"],
    "Продолжительность": ["duration_from", "duration_to"]
}

const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);
    const header = Object.keys(data[0]);

    const headerRow = createHeaderRow(header);
    table.append(headerRow);

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

const dataFilter = (dataForm) => {

    let dictFilter = {};

    for (const item of dataForm.elements) {

        let valInput = item.value;

        if (item.type === "text") {
            if (item.id === "rate") {
                if (valInput !== '') {
                    valInput = Number(valInput.replace(',', '.'));
                }
            } else {
                valInput = valInput.toLowerCase();
            }
        } else if (item.type === "number") {
            if (valInput !== '') {
                valInput = Number(valInput);
            } else if (item.id.search("from") !== -1) {
                valInput = -Infinity;
            } else if (item.id.search("to") !== -1) {
                valInput = Infinity;
            }
        }

        dictFilter[item.id] = valInput;
    }
    return dictFilter;
}

const filterTable = (data, idTable, dataForm) =>{

    const datafilter = dataFilter(dataForm);

    let tableFilter = data.filter(item => {

        let result = true;

        Object.entries(item).map(([key, val]) => {

            if (typeof val == 'string') {
                result &&= val.toLowerCase().includes(datafilter[correspond[key]])
            }

            if (typeof val === 'number') {
                if (Array.isArray(correspond[key])) {
                    const [fromKey, toKey] = correspond[key];
                    const from = datafilter[fromKey];
                    const to = datafilter[toKey];
                    result &&= val >= from && val <= to;
                } else {
                    const v = datafilter[correspond[key]];
                    result &&= (v === '' || v === undefined) ? true : val === v;
                }
            }

        });

        return result;
    });

    clearTable(idTable);
    createTable(tableFilter, idTable);
}

const clearFilters = (data, idTable, dataForm, sortForm) => {
    for (const item of dataForm.elements) {
        if (item.type !== "button") {
            item.value = '';
        }
    }
    clearTable(idTable);
    createTable(data, idTable);
    if (createSortArr(sortForm).length !== 0) {
        sortTable(idTable, sortForm);
    }
}

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

const setSortSelect = (arr, sortSelect) => {

    sortSelect.append(createOption('Нет', 0));
    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
}

const setSortSelects = (data, dataForm) => {

    const head = Object.keys(data[0]);

    const allSelect = dataForm.getElementsByTagName('select');

    for(let i = 0; i < allSelect.length; i++){
        let item = allSelect[i];
        item.innerHTML = '';
        setSortSelect(head, item);
        if (i > 0) {
            item.disabled = true;
        }
    }
}

const changeNextSelect = (curSelect, nextSelectId) => {

    let nextSelect = document.getElementById(nextSelectId);

    nextSelect.disabled = false;

    nextSelect.innerHTML = curSelect.innerHTML;

    if (curSelect.value != 0) {
        nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
}

const createSortArr = (data) => {
    let sortArr = [];

    const sortSelects = data.getElementsByTagName('select');

    for (const item of sortSelects) {
        const keySort = item.value;
        if (keySort == 0) {
            break;
        }
        const desc = document.getElementById(item.id + 'Desc').checked;
        sortArr.push({
            column: keySort - 1,
            direction: desc
        });
    }
    return sortArr;
};

const sortTable = (idTable, formData) => {

    const sortArr = createSortArr(formData);

    if (sortArr.length === 0) {
        return false;
    }
    let table = document.getElementById(idTable);

    let rowData = Array.from(table.rows);

    const headerRow = rowData.shift();

    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
            const firstCell = first.cells[column].innerHTML;
            const secondCell = second.cells[column].innerHTML;

            const comparison = firstCell.localeCompare(secondCell);

            if (comparison !== 0) {
                return (direction ? -comparison : comparison);
            }
        }
        return 0;
    });

    table.innerHTML = '';
    table.append(headerRow);

    let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });
    table.append(tbody);
}

document.addEventListener("DOMContentLoaded", function() {
    const table = document.querySelector('table');
    table.id = "list";

    const bodyRows = Array.from(table.tBodies[0].rows);
    films = bodyRows.map(r => ({
        "Название": r.cells[0].textContent.trim(),
        "Год": Number(r.cells[1].textContent.trim()),
        "Город": r.cells[2].textContent.trim(),
        "Продолжительность": Number(r.cells[3].textContent.trim()),
        "Рейтинг": Number(String(r.cells[4].textContent).trim().replace(',', '.'))
    }));

    clearTable('list');
    createTable(films, 'list');

    const sortDetails = document.querySelector('details:nth-of-type(3)');
    const selects = sortDetails.getElementsByTagName('select');
    selects[0].id = "fieldsFirst";
    selects[1].id = "fieldsSecond";
    selects[2].id = "fieldsThird";

    document.getElementById('dec_1').id = "fieldsFirstDesc";
    document.getElementById('dec_2').id = "fieldsSecondDesc";
    document.getElementById('dec_3').id = "fieldsThirdDesc";

    setSortSelects(films, sortDetails);

    document.getElementById("fieldsFirst").addEventListener("change", () =>
        (changeNextSelect(document.getElementById("fieldsFirst"), "fieldsSecond"),
            changeNextSelect(document.getElementById("fieldsSecond"), "fieldsThird"))
    );

    document.getElementById("fieldsSecond").addEventListener("change", () =>
        changeNextSelect(document.getElementById("fieldsSecond"), "fieldsThird")
    );

    const filterDetails = document.querySelector('details:nth-of-type(2)');
    const filterForm = { elements: filterDetails.querySelectorAll('input') };

    document.getElementById("build_filter").addEventListener("click", () =>
        (filterTable(films, "list", filterForm),
            createSortArr(sortDetails).length !== 0 ? sortTable("list", sortDetails) : false)
    );

    document.getElementById("clear_filter").addEventListener("click", () =>
        clearFilters(films, "list", filterForm, sortDetails)
    );

    document.getElementById("build_sort").addEventListener("click", () =>
        sortTable("list", sortDetails)
    );

    document.getElementById("clear_sort").addEventListener("click", () => {
        document.getElementById("fieldsFirst").value = 0;
        document.getElementById("fieldsSecond").value = 0;
        document.getElementById("fieldsThird").value = 0;
        document.getElementById("fieldsFirstDesc").checked = false;
        document.getElementById("fieldsSecondDesc").checked = false;
        document.getElementById("fieldsThirdDesc").checked = false;
        changeNextSelect(document.getElementById("fieldsFirst"), "fieldsSecond");
        changeNextSelect(document.getElementById("fieldsSecond"), "fieldsThird");
        filterTable(films, "list", filterForm);
    });
})
