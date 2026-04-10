import { useState } from "react";

const books = [
    {
        title: "book1",
        author: "Johan1",
        price: 581.5,
    },
    {
        title: "book2",
        author: "Johan2",
        price: 581.5,
    },
    {
        title: "book3",
        author: "Johan3",
        price: 581.5,
    },
    {
        title: "book4",
        author: "Johan4",
        price: 581.5,
    },
    {
        title: "book5",
        author: "Johan5",
        price: 581.5,
    }
];

function App() {
    const keys = Object.keys(books[0]);
    const startColumn = [];
    keys.forEach(key => {startColumn[key] = true})

    const [columns, setColumns] = useState({startColumn});

    const checkboxChange = (c) => {
        setColumns({
            ...columns,
            [c.target.name]: c.target.checked,
        });
    };

    return (
        <div className="App">
            {keys.map((key) => (
                <p>
                    <label>{key}</label>
                    <input
                        type="checkbox"
                        name={key}
                        checked={columns[key]}
                        onChange={checkboxChange}
                    />
                </p>
            ))}

            <table>
                <thead>
                <tr>
                    {keys.map((key) => (columns[key] && <th>{key}</th>))}
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr>
                        {keys.map((key) => (columns[key] && <td>{book[key]}</td>))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;