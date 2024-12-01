import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ThemeProvider } from '../provider/ThemeProvider'; // Add ThemeProvider
import { LoaderProvider } from '../provider/LoaderProvider'; // Add LoaderProvider
import { useAuth } from '../hooks/useAuth';
import { useLoader } from '../hooks/useLoader';

// Mock `useAuth` hook
vi.mock('../hooks/useAuth', () => ({
    useAuth: vi.fn(),
}));

// Mock `useLoader` hook
vi.mock('../hooks/useLoader', () => ({
    useLoader: vi.fn(),
}));

describe('Sidebar Component', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly when authenticated', () => {
        (useAuth as vi.Mock).mockReturnValue({ isAuthenticated: true });
        (useLoader as vi.Mock).mockReturnValue({
            showLoader: vi.fn(),
            hideLoader: vi.fn(),
        });

        render(
            <ThemeProvider>
                <LoaderProvider>
                    <MemoryRouter>
                        <Sidebar />
                    </MemoryRouter>
                </LoaderProvider>
            </ThemeProvider>
        );

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('does not render when not authenticated', () => {
        (useAuth as vi.Mock).mockReturnValue({ isAuthenticated: false });

        render(
            <ThemeProvider>
                <LoaderProvider>
                    <MemoryRouter>
                        <Sidebar />
                    </MemoryRouter>
                </LoaderProvider>
            </ThemeProvider>
        );

        expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });

    it('navigates to the correct path and shows the loader', async () => {
        const mockShowLoader = vi.fn();
        const mockHideLoader = vi.fn();

        (useAuth as vi.Mock).mockReturnValue({ isAuthenticated: true });
        (useLoader as vi.Mock).mockReturnValue({
            showLoader: mockShowLoader,
            hideLoader: mockHideLoader,
        });

        render(
            <ThemeProvider>
                <LoaderProvider>
                    <MemoryRouter>
                        <Sidebar />
                    </MemoryRouter>
                </LoaderProvider>
            </ThemeProvider>
        );

        const dashboardButton = screen.getByText('Dashboard');
        fireEvent.click(dashboardButton);

        expect(mockShowLoader).toHaveBeenCalled();

        // Simulate navigation delay
        await waitFor(() => {
            expect(mockHideLoader).toHaveBeenCalled();
        });
    });

    it('toggles the sidebar collapse state', () => {
        (useAuth as vi.Mock).mockReturnValue({ isAuthenticated: true });
        (useLoader as vi.Mock).mockReturnValue({
            showLoader: vi.fn(),
            hideLoader: vi.fn(),
        });

        render(
            <ThemeProvider>
                <LoaderProvider>
                    <MemoryRouter>
                        <Sidebar />
                    </MemoryRouter>
                </LoaderProvider>
            </ThemeProvider>
        );

        const collapseButton = screen.getByText('Collapse');
        fireEvent.click(collapseButton);

        const sidebar = screen.getByRole('navigation');
        expect(sidebar).toHaveClass('w-12');
    });
});
