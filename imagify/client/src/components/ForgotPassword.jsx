import { useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data } = await axios.post('/api/user/forgot-password', { email });
            
            if (data.success) {
                setIsSubmitted(true);
                toast.success('Reset instructions sent to your email');
                setEmail(''); // Clear the email input
            } else {
                toast.error(data.message || 'Failed to process request');
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            toast.error(error.response?.data?.message || 'Failed to process request');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email address and we'll send you instructions to reset your password.
                    </p>
                </div>

                {!isSubmitted ? (
                    <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                    isLoading
                                        ? 'bg-indigo-400'
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="text-green-600 mb-4">
                            Check your email for password reset instructions.
                        </p>
                        <p className="text-sm">
                            Didn't receive the email? Check your spam folder or{' '}
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-indigo-600 hover:text-indigo-500"
                            >
                                try again
                            </button>
                        </p>
                    </div>
                )}

                <div className="text-center mt-4">
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;