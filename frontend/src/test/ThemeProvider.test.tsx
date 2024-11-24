import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../context/ThemeProvider';
import useTheme from '../hooks/useTheme';

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
