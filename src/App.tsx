import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TelegramProvider from "./providers /telegram-provider.tsx";


const App: React.FC = () => (
    <TelegramProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    </TelegramProvider>
);

export default App;
