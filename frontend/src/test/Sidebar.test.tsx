import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Sidebar from '../components/Sidebar';
import { renderWithRouter } from './utils.test';

describe('Sidebar Component', () => {
    it('renders all navigation items', () => {
        renderWithRouter(<Sidebar />);
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
        expect(screen.getByText(/profile/i)).toBeInTheDocument();
        expect(screen.getByText(/settings/i)).toBeInTheDocument();
    });

    it('renders the Dashboard header', () => {
        renderWithRouter(<Sidebar />);
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
});
