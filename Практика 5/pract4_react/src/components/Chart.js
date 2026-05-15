import { useState } from "react";
import ChartDraw from './ChartDraw';
import * as d3 from "d3";

const Chart = (props) => {
    const [ox, setOx] = useState("Город съёмок");
    const [oy, setOy] = useState([true, false])
    const [graphType, setGraphType] = useState("dotted");

    const handleSubmit = (event) => {
        event.preventDefault();
        setOx(event.target["ox"].value);
        setOy([event.target["oy_max"].checked, event.target["oy_min"].checked])
        setGraphType(event.target["graphType"].value);
    }

    const createArrGraph = (data, key) => {
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph = [];
        for (let entry of groupObj) {
            let values = entry[1].map(d => d["Рейтинг (КиноПоиск)"]);
            let minMax = d3.extent(values);
            arrGraph.push({ labelX: entry[0], values: minMax });
        }

        if (key === "Год выпуска") {
            arrGraph.sort((a, b) => a.labelX - b.labelX);
        }

        return arrGraph;
    }

    const CheckboxCheck = !(oy[0] === true) && !(oy[1] === true);

    const setColor = () => {
        d3.selectAll("label").style("color", "black");
    }

    return (
        <>
            <h4>Визуализация</h4>
            <form onSubmit={handleSubmit}>
                <p> Значение по оси OX: </p>
                <div>
                    <input type="radio" name="ox" value="Город съёмок" defaultChecked={ox === "Город съёмок"} />
                    Город съёмок
                    <br />
                    <input type="radio" name="ox" value="Год выпуска" defaultChecked={ox === "Год выпуска"} />
                    Год выпуска
                </div>

                <p> Значение по оси OY </p>
                <div onClick={setColor}>
                    <label style={{ color: CheckboxCheck ? 'red' : 'black' }}>
                        <input type="checkbox" name="oy_max" defaultChecked={oy[0] === true} onClick={setColor} />
                        Максимальный рейтинг <br />
                    </label>

                    <label style={{ color: CheckboxCheck ? 'red' : 'black' }}>
                        <input type="checkbox" name="oy_min" defaultChecked={oy[1] === true} onClick={setColor} />
                        Минимальный рейтинг
                    </label>
                </div>

                <label htmlFor="graphType">Тип графика</label>
                <select id="graphType" name="graphType">
                    <option value="dotted">Точечная</option>
                    <option value="gist">Гистограмма</option>
                </select>

                <p>
                    <button type="submit">Построить </button>
                </p>
            </form>
            <ChartDraw data={createArrGraph(props.data, ox)} showValues={oy} graphType={graphType} />
        </>
    )
}

export default Chart;