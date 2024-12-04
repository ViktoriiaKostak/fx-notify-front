import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const UpdateEmail: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
            setSuccess('Email updated successfully!');
            setError('');
        } catch (e) {
            setError((e as Error).message);
            setSuccess('');
        }
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
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
        </Box>
    );
};

export default UpdateEmail;
