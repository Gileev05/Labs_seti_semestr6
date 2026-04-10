import React from "react"

function InfoNumber(props) {
    const len = props.value.length;
    const n = parseInt(props.value);
    const root = Math.sqrt(n);
    const flag = Number.isInteger(root);
    return (
        <>
            <p>Число {n}</p>
            <ul>
                <li>{len}</li>
                <li>{n % 2 === 1 ? "число чётное" : "число нечётное"}</li>
                <li>{flag ? "корень " + root : "Нет"}</li>
            </ul>
        </>
    )
}