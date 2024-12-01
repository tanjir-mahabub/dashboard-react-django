import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import { fetchMetrics } from '../services/apiServices';

// Mock API service
vi.mock('../services/apiServices', () => ({
    fetchMetrics: vi.fn(),
}));

describe('Dashboard Page', () => {
    it('should display loading spinner initially', () => {
        (fetchMetrics as ReturnType<typeof vi.fn>).mockResolvedValueOnce([]);

        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
        expect(screen.getByRole('status')).toBeInTheDocument(); // Verify the loading spinner is shown
    });

    it('should render metrics cards after data is loaded', async () => {
        const mockMetrics = [
            { title: 'Metric 1', value: 'Value 1', icon: 'Icon 1' },
            { title: 'Metric 2', value: 'Value 2', icon: 'Icon 2' },
        ];

        (fetchMetrics as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockMetrics);

        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Metric 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Metric 2/i)).toBeInTheDocument();
        });
    });

    it('should show an error message if the API call fails', async () => {
        (fetchMetrics as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Failed to fetch metrics'));

        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Failed to load metrics/i)).toBeInTheDocument();
        });
    });
});
