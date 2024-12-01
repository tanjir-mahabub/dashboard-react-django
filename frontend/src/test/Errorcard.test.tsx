import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorCard from '../components/ErrorCard';

// Mock the `useTheme` hook
vi.mock('../hooks/useTheme', () => ({
    default: vi.fn(() => ({
        theme: 'light', // Default theme for testing
    })),
}));

describe('ErrorCard Component', () => {
    it('renders with the default title and provided message', () => {
        render(<ErrorCard message="Something went wrong!" />);

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
        const icon = screen.getByRole('img', { hidden: true }); // Check for the ExclamationCircleIcon
        expect(icon).toBeInTheDocument();
    });

    it('renders with a custom title and provided message', () => {
        render(<ErrorCard title="Custom Error" message="Custom error message!" />);

        expect(screen.getByText('Custom Error')).toBeInTheDocument();
        expect(screen.getByText('Custom error message!')).toBeInTheDocument();
        const icon = screen.getByRole('img', { hidden: true });
        expect(icon).toBeInTheDocument();
    });

    it('applies dark mode styles when theme is dark', () => {
        // Mock dark theme for this test
        vi.mock('../hooks/useTheme', () => ({
            default: vi.fn(() => ({
                theme: 'dark',
            })),
        }));

        render(<ErrorCard message="Dark mode error" />);

        const card = screen.getByText('Error').closest('div');
        expect(card).toHaveClass('card-dark');
    });

    it('applies light mode styles when theme is light', () => {
        render(<ErrorCard message="Light mode error" />);

        const card = screen.getByText('Error').closest('div');
        expect(card).toHaveClass('card-light');
    });
});
