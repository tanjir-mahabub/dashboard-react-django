import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header';

describe('Header Component', () => {
    it('renders the Dashboard title', () => {
        render(<Header />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('renders the user profile placeholder', () => {
        render(<Header />);
        expect(screen.getByText('User')).toBeInTheDocument();
    });
});
