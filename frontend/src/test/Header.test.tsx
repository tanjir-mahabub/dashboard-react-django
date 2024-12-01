import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { MemoryRouter } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

// Mock `useAuth` hook
vi.mock('../hooks/useAuth', () => ({
    useAuth: vi.fn(),
}));

// Mock `useTheme` hook
vi.mock('../hooks/useTheme', () => ({
    useTheme: vi.fn(),
}));

describe('Header Component', () => {
    it('renders correctly when authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            user: { username: 'testuser' },
            logout: vi.fn(),
        });

        (useTheme as jest.Mock).mockReturnValue({
            theme: 'light',
            toggleTheme: vi.fn(),
        });

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByText('JOB-24FEBFF24')).toBeInTheDocument();
        expect(screen.getByText('Technical Assessment - Dashboard Development')).toBeInTheDocument();
        expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    it('renders correctly when not authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({
            isAuthenticated: false,
        });

        (useTheme as jest.Mock).mockReturnValue({
            theme: 'light',
            toggleTheme: vi.fn(),
        });

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('handles logout click correctly', () => {
        const mockLogout = vi.fn();
        (useAuth as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            user: { username: 'testuser' },
            logout: mockLogout,
        });

        (useTheme as jest.Mock).mockReturnValue({
            theme: 'light',
            toggleTheme: vi.fn(),
        });

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);

        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});
