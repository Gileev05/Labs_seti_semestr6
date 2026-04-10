import React from "react";

function GetTemp(props) {

    const valueK = props.valueK;
    const valueF = props.valueF;

    const tempKtoC = Number(valueK) - 273.15;
    const tempFtoC = (Number(valueF) - 32) / 1.8;

    return (
        <>
            <p onClick={ alert(`${valueK} = ${tempFtoC}`) }>Температура {valueK} K</p>
            <p onClick={ alert(`${valueF} = ${tempKtoC}`) }>Температура {valueF} F</p>
        </>
    )
}