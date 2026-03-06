const correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}

/* Структура возвращаемого ассоциативного массива:
{
    input_id: input_value,
    ...
}
*/
const dataFilter = (dataForm) => {

    let dictFilter = {};

    for (const item of dataForm.elements) {

        let valInput = item.value;

        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        } else if (item.type === "number") {
            if (valInput !== '') {
                valInput = Number(valInput);
            } else if (item.id.search("From") !== -1) {
                valInput = -Infinity;
            } else if (item.id.search("To") !== -1) {
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

                const [fromKey, toKey] = correspond[key];

                const from = datafilter[fromKey];
                const to = datafilter[toKey];

                result &&= val >= from && val <= to;
            }

        });

        return result;
    });

    clearTable(idTable);
    createTable(tableFilter, idTable);
}

const clearFilters = (data, idTable, dataForm) => {
    for (const item of dataForm.elements) {
        if (item.type !== "button") {
            item.value = '';
        }
    }
    clearTable(idTable);
    createTable(data, idTable);
    sortTable("list", document.getElementById("sort"))
}

const AddFindEvent = (id) => {
    document.getElementById(id).addEventListener('click', () =>
        filterTable(buildings, "list", document.getElementById("filter"))
    );
}

const AddClearEvent = (id) => {
    document.getElementById(id).addEventListener('click', () =>
        clearFilters(buildings, "list", document.getElementById("filter"))
    );
}