import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '../pages/Dashboard'; // Import the Dashboard component
import * as apiService from '../services/apiServices'; // Import the API service to mock

// Mock the fetchMetrics function
vi.spyOn(apiService, 'fetchMetrics').mockResolvedValue([
    { title: 'Total Revenue', value: '$45,000' },
    { title: 'New Users', value: '320' },
    { title: 'Pending Orders', value: '45' },
    { title: 'Completed Orders', value: '276' },
]);

describe('Dashboard Page', () => {
    it('renders all metrics', async () => {
        // Render the Dashboard component
        render(<Dashboard />);

        // Assert that metrics are displayed correctly
        const totalRevenueElement = await screen.findByText('Total Revenue');
        const totalRevenueValue = await screen.findByText('$45,000');

        expect(totalRevenueElement).toBeInTheDocument();
        expect(totalRevenueValue).toBeInTheDocument();
    });
});
