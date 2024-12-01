import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ChartCard from '../components/ChartCard';
import { fetchSalesData } from '../services/apiServices';

// Mock the `useTheme` hook
vi.mock('../hooks/useTheme', () => ({
    useTheme: vi.fn(() => ({
        theme: 'light',
    })),
}));

// Mock the `fetchSalesData` API function
vi.mock('../services/apiServices', () => ({
    fetchSalesData: vi.fn(),
}));

describe('ChartCard Component', () => {
    it('renders a loading state initially', () => {
        render(<ChartCard />);
        expect(screen.getByText('Sales Chart')).toBeInTheDocument();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders the error state when API call fails', async () => {
        (fetchSalesData as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch sales data'));

        render(<ChartCard />);

        await waitFor(() =>
            expect(screen.getByText('Failed to load sales data.')).toBeInTheDocument()
        );
    });

    it('renders the chart with data when API call succeeds', async () => {
        const mockData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [
                {
                    label: 'Sales',
                    data: [100, 200, 150, 300],
                },
            ],
        };

        (fetchSalesData as jest.Mock).mockResolvedValueOnce(mockData);

        render(<ChartCard />);

        await waitFor(() => expect(screen.getByText('Sales Chart')).toBeInTheDocument());

        // Check if the chart is displayed
        expect(screen.getByText('Sales')).toBeInTheDocument(); // Legend or label
    });
});
