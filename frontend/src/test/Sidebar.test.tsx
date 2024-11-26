import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Sidebar from '../components/Sidebar';
import { ThemeProvider } from '../context/ThemeProvider';

describe('Sidebar Component', () => {
    const renderWithProviders = (ui: React.ReactElement, darkMode = false) => {
        if (darkMode) {
            document.documentElement.classList.add('dark'); // Simulate dark mode
        } else {
            document.documentElement.classList.remove('dark'); // Ensure light mode
        }

        return render(
            <ThemeProvider>
                <BrowserRouter>{ui}</BrowserRouter>
            </ThemeProvider>
        );
    };

    it('renders navigation links', () => {
        renderWithProviders(<Sidebar />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('applies the active link styles correctly', () => {
        renderWithProviders(<Sidebar />);
        const dashboardLink = screen.getByText('Dashboard');
        expect(dashboardLink).not.toHaveClass('bg-primary');
    });

    it('renders correctly in dark mode', () => {
        renderWithProviders(<Sidebar />, true); // Pass `true` to enable dark mode
        expect(screen.getByText('Sidebar')).toHaveClass('dark:text-light');
    });

    it('renders correctly in light mode', () => {
        renderWithProviders(<Sidebar />, false); // Ensure light mode
        expect(screen.getByText('Sidebar')).toHaveClass('text-dark');
    });
});
