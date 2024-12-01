// components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/dashboard'); // Redirect to dashboard on successful login
        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div
            className={`w-full h-[85vh] p-5 flex justify-center items-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
        >
            <div className={`p-6 rounded-md shadow-lg w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && (
                    <div
                        className={`mb-4 p-4 text-sm rounded-md ${isDarkMode ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800'
                            }`}
                    >
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode
                                    ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-400'
                                    : 'bg-gray-50 border-gray-300 focus:ring-purple-500'
                                }`}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode
                                    ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-400'
                                    : 'bg-gray-50 border-gray-300 focus:ring-purple-500'
                                }`}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
