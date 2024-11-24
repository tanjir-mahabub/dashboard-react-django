import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header';
import { renderWithProviders } from './utils.test';

describe('Header Component', () => {
    it('renders the Dashboard title', () => {
        renderWithProviders(<Header />);
        expect(screen.getByText('JOB-24FEBFF24')).toBeInTheDocument(); // Updated to match the title
    });

    it('renders the user profile placeholder', () => {
        renderWithProviders(<Header />);
        expect(screen.getByText('User')).toBeInTheDocument();
    });
});
