import { createContext } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    user: { username: string } | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
