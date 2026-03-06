document.addEventListener("DOMContentLoaded", function() {
    createTable(buildings, 'list');
    AddFindEvent("find");
    AddClearEvent("clear");
    setSortSelects(buildings, document.getElementById("sort"));

    document.getElementById("fieldsFirst").addEventListener("change", () =>
        changeNextSelect(document.getElementById("fieldsFirst"), "fieldsSecond")
    );

    document.getElementById("sort_button").addEventListener("click", () =>
        sortTable("list", document.getElementById("sort"))
    );

    document.getElementById("reset_sort_button").addEventListener("click", () =>
        clearSorts(buildings, "list", document.getElementById("sort"))
    );
})

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