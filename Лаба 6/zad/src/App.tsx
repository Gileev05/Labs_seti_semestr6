
import {useState, JSX} from "react";

interface Book {
    title: string;
    author: string;
    price: number;
}

const books: Book[] = [
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

interface ColumnsState {
    title: boolean;
    author: boolean;
    price: boolean;
}

const App = (): JSX.Element => {
    const keys: (keyof Book)[] = Object.keys(books[0]) as (keyof Book)[];
    const startColumn: ColumnsState = {} as ColumnsState;
    keys.forEach((key: keyof Book) => {startColumn[key] = false})

    const [columns, setColumns] = useState<ColumnsState>(startColumn);

    const checkboxChange = (c: React.ChangeEvent<HTMLInputElement>) => {
        setColumns({
            ...columns,
            [c.target.name]: c.target.checked,
        } as ColumnsState);
    };

    return (
        <div className="App">
            {keys.map((key: keyof Book) => (
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
                    {keys.map((key: keyof Book) =>
                        (columns[key] && <th>{key}</th>))}
                </tr>
                </thead>
                <tbody>
                {books.map((book: Book) => (
                    <tr>
                        {keys.map((key: keyof Book) =>
                            (columns[key] && <td>{book[key]}</td>))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
