import { Link } from 'react-router-dom';
export const MainPage = () => (
    <nav>
        <ul>
            <li>
                <Link to="/one">Первая страница</Link>
            </li>
            <li>
                <Link to="/two">Вторая страница</Link>
            </li>
        </ul>
    </nav>
);