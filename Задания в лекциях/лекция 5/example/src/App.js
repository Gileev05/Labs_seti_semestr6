import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { PageOne, PageTwo } from './Components/Pages';
import {MainPage} from './Components/MainPage';
import './App.css';

const App = () => {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="one" element={<PageOne/>}/>
                <Route path="two" element={<PageTwo/>}/>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
