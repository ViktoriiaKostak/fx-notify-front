import React, { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { z } from 'zod';

const EmailSchema = z.object({
    email: z.string().email('Not a valid email address'),
});

const EmailForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [telegramId, setTelegramId] = useState<number | null>(null);

    useEffect(() => {
        const checkAndInitializeUser = async () => {
            const storedEmail = localStorage.getItem('userEmail');

            const initDataUnsafe = WebApp.initDataUnsafe;
            const telegramUserId = initDataUnsafe?.user?.id;

            if (storedEmail) {
                window.location.href = '/rules';
                return;
            }

            if (telegramUserId) {
                setTelegramId(telegramUserId);

                try {
                    const response = await fetch('https://fx-back-7e5e55f131eb.herokuapp.com/users/check-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ telegramId: telegramUserId })
                    });

                    const result = await response.json();

                    if (result.user.email) {
                        localStorage.setItem('userEmail', result.email);
                        window.location.href = '/rules';
                    } else {
                        setLoading(false);
                    }
                } catch (err) {
                    console.error('Error when check email:', err);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        checkAndInitializeUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const validatedData = EmailSchema.parse({ email });

            if (telegramId) {
                const response = await fetch('https://fx-back-7e5e55f131eb.herokuapp.com/users/add-email', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        telegramId,
                        email: validatedData.email
                    })
                });

                if (!response.ok) {
                    throw new Error('Cannot add email to user');
                }

                localStorage.setItem('userEmail', email);

                window.location.href = '/rules';
            } else {
                throw new Error('Telegram ID is not set');
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('There was an error');
            }

            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                        Enter Your Email
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email"
                                required
                                className={`
                  w-full px-4 py-3 border rounded-lg
                  ${error ? 'border-red-500' : 'border-gray-300'}
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                `}
                            />
                            {error && (
                                <p className="text-red-500 text-sm mt-2">{error}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="
                w-full bg-blue-600 text-white py-3 rounded-lg
                hover:bg-blue-700 transition duration-300
              "
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmailForm;