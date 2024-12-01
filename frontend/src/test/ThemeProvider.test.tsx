import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useTheme from '../hooks/useTheme';
import { ThemeProvider } from '../provider/ThemeProvider';

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
