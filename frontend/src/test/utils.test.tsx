import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../context/ThemeProvider';
import useTheme from '../hooks/useTheme';

import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
};

export const renderWithProviders = (ui: React.ReactElement, darkMode = false) => {
    if (darkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const TestComponent = () => {
    const { theme } = useTheme();
    return <div>Current Theme: {theme}</div>;
};

describe('ThemeProvider', () => {
    it('provides the default theme', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByText('Current Theme: light')).toBeInTheDocument();
    });
});
