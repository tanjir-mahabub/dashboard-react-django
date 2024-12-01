import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChartCard from '../components/ChartCard';
import * as apiServices from '../services/apiServices';

// Mock the `useTheme` hook
vi.mock('../hooks/useTheme', () => ({
    default: vi.fn(() => ({
        theme: 'light',
        toggleTheme: vi.fn(),
    })),
}));

describe('ChartCard Component', () => {
    it('renders a loading state initially', () => {
        render(<ChartCard />);
        expect(screen.getByText('Sales Chart')).toBeInTheDocument();

        // Use queryByText for Loading... and fallback to other queries if needed
        const loadingIndicator = screen.queryByText('Loading...');
        expect(loadingIndicator).toBeInTheDocument();
    });

    it('renders the error state when API call fails', async () => {
        vi.spyOn(apiServices, 'fetchSalesData').mockRejectedValueOnce(new Error('Failed to fetch sales data'));

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

        vi.spyOn(apiServices, 'fetchSalesData').mockResolvedValueOnce(mockData);

        render(<ChartCard />);

        await waitFor(() => expect(screen.getByText('Sales Chart')).toBeInTheDocument());

        // Check if the chart is displayed
        expect(screen.getByText('Sales')).toBeInTheDocument();
    });
});
