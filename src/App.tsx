import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WebApp from "@twa-dev/sdk";

const App: React.FC = () => {
    useEffect(() => {
        WebApp.ready();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </Router>
    );
};

export default App;