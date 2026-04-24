import './App.css';
import React, { useState, createContext } from 'react';

const words = [
    'Конспект. Лекция. Задание. Отчёт',
    'Экзамен. Зачёт. Тестирование',
    'HTML. CSS. Bootstrap. Pug. Stylus. JavaScript'
];

function App() {

    const ColorContext = createContext();
    const [color, setColor] = useState('black');

    const ColorChange = () => {
        const inputValue = document.getElementById('colorInput').value;
        setColor(inputValue);
    };

    return (
        <ColorContext.Provider value={color}>
            <div className="App">
                Цвет
                <input id="colorInput" type="text"/>
                <button onClick={ColorChange}>Изменить</button>
                <br/>
                {words.map((word) => (
                    <table>
                        <tbody>
                        {word.split('.').map((st) => (
                            <tr>
                                <td style={{color: color, borderColor: color}}>{st.trim()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ))}
            </div>
        </ColorContext.Provider>
    );
}

export default App;