import React, { useState, FormEvent } from 'react';
import { z } from 'zod';

// Zod schema for email validation
const EmailSchema = z.object({
    email: z.string().email('Invalid email address')
});

// Define props interface
interface EmailFormProps {
    telegramId?: number;
}

const EmailForm: React.FC<EmailFormProps> = ({ telegramId }) => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Validate email using Zod
            const validatedData = EmailSchema.parse({ email });

            // Trigger device vibration if supported
            if ('vibrate' in navigator) {
                navigator.vibrate(50); // Short vibration
            }

            setLoading(true);
            setError(null);

            // If telegramId is provided, send to backend
            if (telegramId) {
                const response = await fetch('https://fx-back-7e5e55f131eb.herokuapp.com/users/add-email', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify({ telegramId, email: validatedData.email })
                });

                if (!response.ok) {
                    throw new Error('Failed to submit email');
                }
            }

            // Store email in local storage
            localStorage.setItem('userEmail', email);

            // Navigate to next page
            window.location.href = '/rules';
        } catch (err) {
            // Handle Zod validation errors
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message);
            } else if (err instanceof Error) {
                setError(err.message || 'Failed to submit email. Please try again.');
            } else {
                setError('An unexpected error occurred');
            }

            // Additional vibration for error
            if ('vibrate' in navigator) {
                navigator.vibrate([50, 50, 50]); // Error vibration pattern
            }

            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
                    <div className="p-8 space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Enter Your Email
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                We'll use this to keep you updated
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className={`
                      w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
                      ${error
                                            ? 'border-red-500 text-red-600 focus:ring-2 focus:ring-red-200'
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                        }
                      focus:outline-none 
                      placeholder-gray-400
                    `}
                                    />
                                    {error && (
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-red-500"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                {error && (
                                    <p className="mt-2 text-sm text-red-600 animate-pulse">
                                        {error}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                  w-full py-3 rounded-xl text-white font-bold uppercase tracking-wider 
                  transition-all duration-300 ease-in-out transform
                  ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-95'
                                }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  shadow-lg hover:shadow-xl
                `}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin h-5 w-5 mr-3"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Submitting...
                                    </div>
                                ) : (
                                    'Continue'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Your email is safe with us 🔒
                </div>
            </div>
        </div>
    );
};

export default EmailForm;