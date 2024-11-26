import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import RealTimeDataCard from '../components/RealTimeDataCard';

describe('RealTimeDataCard', () => {
    const fetchSpy = vi.spyOn(global, 'fetch');

    it('renders real-time data after fetching', async () => {
        fetchSpy.mockResolvedValueOnce({
            json: async () => ({
                cpuUsage: 45,
                memoryUsage: 65,
                activeUsers: 150,
            }),
        } as Response);

        render(<RealTimeDataCard />);

        await waitFor(() => {
            expect(screen.getByText((_, element) => element?.textContent === 'CPU Usage: 45%')).toBeInTheDocument();
            expect(screen.getByText((_, element) => element?.textContent === 'Memory Usage: 65%')).toBeInTheDocument();
            expect(screen.getByText((_, element) => element?.textContent === 'Active Users: 150')).toBeInTheDocument();
        });

        expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    it('renders error state if fetching fails', async () => {
        fetchSpy.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<RealTimeDataCard />);

        expect(await screen.findByText('Unable to load real-time data.')).toBeInTheDocument();
        expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
        fetchSpy.mockClear();
    });
});
