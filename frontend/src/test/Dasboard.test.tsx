import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Dashboard from '../pages/Dashboard';

describe('Dashboard Page', () => {
    it('renders all metrics', () => {
        render(<Dashboard />);
        expect(screen.getByText('Total Revenue')).toBeInTheDocument();
        expect(screen.getByText('$45,000')).toBeInTheDocument();
        expect(screen.getByText('New Users')).toBeInTheDocument();
        expect(screen.getByText('320')).toBeInTheDocument();
        expect(screen.getByText('Pending Orders')).toBeInTheDocument();
        expect(screen.getByText('45')).toBeInTheDocument();
        expect(screen.getByText('Completed Orders')).toBeInTheDocument();
        expect(screen.getByText('276')).toBeInTheDocument();
    });
});
