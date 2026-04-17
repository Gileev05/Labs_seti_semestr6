const Filter = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        const filterField = {
            "Название": event.target["name"].value.toLowerCase(),
            "Год выпуска": [event.target["yearFrom"].value, event.target["yearTo"].value],
            "Город съёмок": event.target["city"].value.toLowerCase(),
            "Продолжительность(мин.)": [event.target["durationFrom"].value, event.target["durationTo"].value],
            "Рейтинг (КиноПоиск)": [event.target["ratingFrom"].value, event.target["ratingTo"].value]
        };

        let arr = props.fullData;
        for(const key in filterField) {
            if (key === "Год выпуска") {
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
            } else if (key === "Продолжительность(мин.)") {
                const [durationFrom, durationTo] = filterField[key];
                if (durationFrom || durationTo) {
                    arr = arr.filter(item => {
                        const duration = parseFloat(item[key]);
                        if (durationFrom && durationTo) {
                            return duration >= parseFloat(durationFrom) && duration <= parseFloat(durationTo);
                        } else if (durationFrom) {
                            return duration >= parseFloat(durationFrom);
                        } else if (durationTo) {
                            return duration <= parseFloat(durationTo);
                        }
                        return true;
                    });
                }
            } else if (key === "Рейтинг (КиноПоиск)") {
                const [ratingFrom, ratingTo] = filterField[key];
                if (ratingFrom || ratingTo) {
                    arr = arr.filter(item => {
                        const rating = parseFloat(item[key]);
                        if (ratingFrom && ratingTo) {
                            return rating >= parseFloat(ratingFrom) && rating <= parseFloat(ratingTo);
                        } else if (ratingFrom) {
                            return rating >= parseFloat(ratingFrom);
                        } else if (ratingTo) {
                            return rating <= parseFloat(ratingTo);
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
        <form onSubmit={handleSubmit}>
            <p>
                <label>Название:</label>
                <input name="name" type="text" />
            </p>
            <p>
                <label>Год выпуска от:</label>
                <input name="yearFrom" type="number" />
            </p>
            <p>
                <label>Год выпуска до:</label>
                <input name="yearTo" type="number" />
            </p>
            <p>
                <label>Город съёмок:</label>
                <input name="city" type="text" />
            </p>
            <p>
                <label>Продолжительность от:</label>
                <input name="durationFrom" type="number" />
            </p>
            <p>
                <label>Продолжительность до:</label>
                <input name="durationTo" type="number" />
            </p>
            <p>
                <label>Рейтинг от:</label>
                <input name="ratingFrom" type="number" step="0.1" />
            </p>
            <p>
                <label>Рейтинг до:</label>
                <input name="ratingTo" type="number" step="0.1" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset" onClick={handleReset}>Очистить фильтр</button>
            </p>
        </form>
    )
}

export default Filter;