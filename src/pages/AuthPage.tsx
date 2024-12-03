import React, { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

const AuthPage: React.FC = () => {
    useEffect(() => {
        WebApp.ready();

        const initData = WebApp.initData; // Отримує підписані дані
        if (initData) {
            fetch('https://fx-back-7e5e55f131eb.herokuapp.com/auth/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ initDataRaw: initData }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Authorization successful:', data);
                    } else {
                        console.error('Authorization failed:', data);
                    }
                })
                .catch(error => console.error('Authorization error:', error));
        }
    }, []);

    return (
        <div className="auth-container">
            <h1>Welcome to Telegram Mini App</h1>
            <p>Authorizing...</p>
        </div>
    );
};

export default AuthPage;
