import React from 'react';
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Content from "./components/Content";
import Footer from './components/Footer';

function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar active="1"/>
            <Gallery/>
            <Content/>
            <Footer/>
        </div>
    );
}

export default App;