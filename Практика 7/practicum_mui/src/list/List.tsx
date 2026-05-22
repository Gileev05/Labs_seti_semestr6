import Navbar from "../components/Navbar";
import MoviesGrid from "./components/MoviesGrid";

function List() {
    return (
        <div>
            <Navbar active="2"/>
            <MoviesGrid/>
        </div>
    );
}

export default List;