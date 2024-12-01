import React, { useState, ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    username: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(() => Boolean(localStorage.getItem('authToken')));
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState<boolean>(false);

    const login = async (username: string, password: string): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}api/auth/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error('Invalid username or password');

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify({ username }));
            setAuthenticated(true);
            setUser({ username });
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = (): void => {
        setLoading(true);
        setTimeout(() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setAuthenticated(false);
            setUser(null);
            setLoading(false);
        }, 500);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
