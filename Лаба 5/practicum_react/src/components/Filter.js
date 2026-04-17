
const Filter = (props) => {

    const handleSubmit= (event) => {
        event.preventDefault();

        const filterField = {
            "Название": event.target["structure"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase(),
            "Год": [event.target["yearFrom"].value, event.target["yearTo"].value],
            "Высота": [event.target["heightFrom"].value, event.target["heightTo"].value]
        };

        let arr = props.fullData;
        for(const key in  filterField) {
            if (key === "Год") {
                const [yearFrom, yearTo] = filterField[key];
                if (yearFrom || yearTo) {
                    arr = arr.filter(item => {
                        const year = parseInt(item[key]);
                        if (yearFrom && yearTo) {
                            return year >= parseInt(yearFrom) && year <= parseInt(yearTo);
                        } else if (yearFrom) {
                            return year >= parseInt(yearFrom);
                        } else if (yearTo) {
                            return year <= parseInt(yearTo);
                        }
                        return true;
                    });
                }
            } else if (key === "Высота") {
                const [heightFrom, heightTo] = filterField[key];
                if (heightFrom || heightTo) {
                    arr = arr.filter(item => {
                        const height = parseFloat(item[key]);
                        if (heightFrom && heightTo) {
                            return height >= parseFloat(heightFrom) && height <= parseFloat(heightTo);
                        } else if (heightFrom) {
                            return height >= parseFloat(heightFrom);
                        } else if (heightTo) {
                            return height <= parseFloat(heightTo);
                        }
                        return true;
                    });
                }
            } else {
                arr = arr.filter(item =>
                    item[key].toLowerCase().includes(filterField[key])
                );
            }
        }
        props.filtering(arr);
    }

    const handleReset = () => {
        const form = document.querySelector('form');
        if (form) form.reset();
        props.filtering(props.fullData);
    }

    return (
        <form onSubmit={ handleSubmit }>
            <p>
                <label>Название:</label>
                <input name="structure" type="text" />
            </p>
            <p>
                <label>Тип:</label>
                <input name="type" type="text" />
            </p>
            <p>
                <label>Страна:</label>
                <input name="country" type="text" />
            </p>
            <p>
                <label>Город:</label>
                <input name="city" type="text" />
            </p>
            <p>
                <label>Год от:</label>
                <input name="yearFrom" type="number" />
            </p>
            <p>
                <label>Год до:</label>
                <input name="yearTo" type="number" />
            </p>
            <p>
                <label>Высота от:</label>
                <input name="heightFrom" type="number" step="0.1" />
            </p>
            <p>
                <label>Высота до:</label>
                <input name="heightTo" type="number" step="0.1" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset" onClick={handleReset}>Очистить фильтр</button>
            </p>
        </form>
    )
}

export default Filter;