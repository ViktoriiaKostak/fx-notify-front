import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UpdateEmail: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyboardShow = () => setIsKeyboardOpen(true);
        const handleKeyboardHide = () => setIsKeyboardOpen(false);

        window.addEventListener('keyboardDidShow', handleKeyboardShow);
        window.addEventListener('keyboardDidHide', handleKeyboardHide);

        return () => {
            window.removeEventListener('keyboardDidShow', handleKeyboardShow);
            window.removeEventListener('keyboardDidHide', handleKeyboardHide);
        };
    }, []);

    const handleEmailUpdate = async () => {
        try {
            const telegramId = localStorage.getItem('telegramId');
            if (!telegramId) throw new Error('Telegram ID not found');

            const response = await fetch('https://fx-back-7e5e55f131eb.herokuapp.com/users/add-email', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ telegramId, email }),
            });

            if (!response.ok) throw new Error('Failed to update email');

            localStorage.setItem('userEmail', email);
            setSuccess('Email updated successfully!');
            setError('');
        } catch (e) {
            setError((e as Error).message);
            setSuccess('');
        }
    };

    const handleClearEmail = () => {
        localStorage.removeItem('userEmail');
        setEmail('');
        setSuccess('Email cleared successfully!');
        setError('');
    };

    const handleGoToRules = () => {
        navigate('/rules');
    };

    return (
        <Box
            sx={{
                mt: 4,
                px: 2,
                width: '100%',
                maxWidth: '500px',
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                pb: isKeyboardOpen ? 10 : 2, // Add padding when keyboard is open
                overflowY: isKeyboardOpen ? 'scroll' : 'auto', // Enable scrolling when keyboard is open
            }}
        >
            <Typography variant="h6" gutterBottom>
                Update Email
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleEmailUpdate}
                disabled={!email}
            >
                Update Email
            </Button>
            <Button
                variant="outlined"
                color="warning"
                onClick={handleClearEmail}
            >
                Clear Email
            </Button>
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <Button
                variant="contained"
                color="secondary"
                onClick={handleGoToRules}
            >
                Go to Rules
            </Button>
        </Box>
    );
};

export default UpdateEmail;