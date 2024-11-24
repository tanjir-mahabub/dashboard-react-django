import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header';
import { renderWithProviders } from './utils.test';

describe('Header Component', () => {
    it('renders the Dashboard title', () => {
        renderWithProviders(<Header />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('renders the user profile placeholder', () => {
        renderWithProviders(<Header />);
        // Debugging: Print the DOM structure if the test fails
        screen.debug();
        expect(screen.getByText('User')).toBeInTheDocument();
    });
});
