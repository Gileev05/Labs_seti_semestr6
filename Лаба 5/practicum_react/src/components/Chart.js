import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
    const [ox, setOx] = useState("Страна");
    const [oy, setOy] = useState([true, false])

    const handleSubmit = (event) => {
        event.preventDefault();
        setOx(event.target["ox"].value);
        setOy([event.target["oy"][0].checked, event.target["oy"][1].checked])
    }

    const createArrGraph =(data, key)=>{
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Высота']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }
        return arrGraph;
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
                    <input type="radio" name="ox" value="Год" />
                    Год
                </div>

                <p> Значение по оси OY </p>
                <div>
                    <input type="checkbox" name="oy" defaultChecked={ oy[0] === true } />
                    Максимальная высота <br/>
                    <input  type="checkbox" name="oy" />
                    Минимальная высота
                </div>

                <p>
                    <button type="submit">Построить </button>
                </p>
            </form>
            <ChartDraw data={ createArrGraph(props.data, ox) } />
        </>
    )
}

export default Chart;