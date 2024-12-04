import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

const EmailSchema = z.object({
    email: z.string().email('Not a valid email address'),
});

const EmailForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [loading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [telegramId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAndInitializeUser = async () => {
            const storedEmail = localStorage.getItem('userEmail');
            if (storedEmail) {
                window.location.href = '/rules';
                return;
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

    const handleGoToRules = () => {
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
        navigate('/rules');
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

                    <button
                        onClick={handleGoToRules}
                        className="
              w-full bg-green-600 text-white py-3 rounded-lg mt-4
              hover:bg-green-700 transition duration-300
            "
                    >
                        Go to Rules
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailForm;