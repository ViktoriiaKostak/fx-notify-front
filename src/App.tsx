import React from 'react';
import { useEffect } from 'react';
import { CssBaseline, Container, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import RulesPage from './pages/RulesPage';
import EmailForm from './components/EmailForm';
import LoadingPage from './pages/LoadingPage';
import './App.css';

const API_BASE = 'https://fx-back-7e5e55f131eb.herokuapp.com';

const AppContent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        WebApp.ready();

        const initDataUnsafe = WebApp.initDataUnsafe;
        const initData = WebApp.initData;

        if (initDataUnsafe?.user) {
            axios
                .post(`${API_BASE}/auth/telegram`, { initDataRaw: initData })
                .then(() => navigate('/rules'))
                .catch(error => {
                    console.error('Authorization failed:', error);
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <Container
            maxWidth="xs"
            sx={{
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: 3,
            }}
        >
            <Typography
                variant="h5"
                gutterBottom
                textAlign="center"
                sx={{ color: '#34495e' }}
            >
                Telegram Mini App
            </Typography>
            <Routes>
                <Route path="/" element={<LoadingPage />} />
                <Route path="/login" element={<EmailForm />} />
                <Route path="/rules" element={<RulesPage />} />
            </Routes>
        </Container>
    );
};

const App = () => {
    return (
        <Router>
            <CssBaseline />
            <AppContent />
        </Router>
    );
};

export default App;