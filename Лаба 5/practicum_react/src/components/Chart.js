import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
    const [ox, setOx] = useState("Страна");
    const [oy, setOy] = useState([true, false])
    const [graphType, setGraphType] = useState("dotted");

    const handleSubmit = (event) => {
        event.preventDefault();
        setOx(event.target["ox"].value);
        setOy([event.target["oy"][0].checked, event.target["oy"][1].checked])
        setGraphType(event.target["graphType"].value);
    }

    const createArrGraph =(data, key)=>{
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Высота']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }

        if (key === "Год") {
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
            <form onSubmit={ handleSubmit }>
                <p> Значение по оси OX: </p>
                <div>
                    <input type="radio" name="ox" value="Страна" defaultChecked={ ox === "Страна" }/>
                    Страна
                    <br/>
                    <input type="radio" name="ox" value="Год" defaultChecked={ox === "Год"}/>
                    Год
                </div>

                <p> Значение по оси OY </p>
                <div onClick={setColor}>
                    <label style={{ color: CheckboxCheck ? 'red' : 'black' }}>
                    <input type="checkbox" name="oy" defaultChecked={ oy[0] === true } onClick={setColor}/>
                    Максимальная высота <br/>
                    </label>

                    <label style={{ color: CheckboxCheck ? 'red' : 'black' }}>
                    <input  type="checkbox" name="oy" defaultChecked={oy[1] === true} onClick={setColor}/>
                    Минимальная высота
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
            <ChartDraw data={ createArrGraph(props.data, ox) } showValues={oy} graphType={graphType}/>
        </>
    )
}

export default Chart;