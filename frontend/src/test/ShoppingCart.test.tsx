import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ShoppingCart from '../components/ShoppingCart';
import { fetchCartData } from '../services/apiServices';

// Mock the `fetchCartData` API function
vi.mock('../services/apiServices', () => ({
    fetchCartData: vi.fn(),
}));

describe('ShoppingCart Component', () => {
    afterEach(() => {
        vi.clearAllMocks(); // Ensure mocks are cleared between tests
    });

    it('renders loading state initially', () => {
        // Mock `useTheme` for light mode
        vi.mock('../hooks/useTheme', () => ({
            default: () => ({
                theme: 'light',
            }),
        }));

        render(<ShoppingCart />);
        expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state when API call fails', async () => {
        // Mock `useTheme` for light mode
        vi.mock('../hooks/useTheme', () => ({
            default: () => ({
                theme: 'light',
            }),
        }));

        (fetchCartData as jest.Mock).mockRejectedValueOnce(new Error('API error'));

        render(<ShoppingCart />);

        await waitFor(() =>
            expect(screen.getByText('Unable to load shopping cart data.')).toBeInTheDocument()
        );
    });

    it('renders cart items when API call succeeds', async () => {
        // Mock `useTheme` for light mode
        vi.mock('../hooks/useTheme', () => ({
            default: () => ({
                theme: 'light',
            }),
        }));

        const mockCartData = [
            { id: 1, name: 'Product A', quantity: 2, price: 25.5 },
            { id: 2, name: 'Product B', quantity: 1, price: 10.0 },
        ];

        (fetchCartData as jest.Mock).mockResolvedValueOnce(mockCartData);

        render(<ShoppingCart />);

        await waitFor(() => {
            expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
            expect(screen.getByText('Product A')).toBeInTheDocument();
            expect(screen.getByText('2 x $25.50')).toBeInTheDocument();
            expect(screen.getByText('Product B')).toBeInTheDocument();
            expect(screen.getByText('1 x $10.00')).toBeInTheDocument();
        });
    });

    it('applies dark mode styles when theme is dark', async () => {
        // Mock `useTheme` for dark mode
        vi.mock('../hooks/useTheme', () => ({
            default: () => ({
                theme: 'dark',
            }),
        }));

        const mockCartData = [
            { id: 1, name: 'Product A', quantity: 2, price: 25.5 },
        ];

        (fetchCartData as jest.Mock).mockResolvedValueOnce(mockCartData);

        render(<ShoppingCart />);

        await waitFor(() => {
            const card = screen.getByText('Shopping Cart').closest('div');
            expect(card).toHaveClass('card-dark');
        });
    });

    it('applies light mode styles when theme is light', async () => {
        // Mock `useTheme` for light mode
        vi.mock('../hooks/useTheme', () => ({
            default: () => ({
                theme: 'light',
            }),
        }));

        const mockCartData = [
            { id: 1, name: 'Product A', quantity: 2, price: 25.5 },
        ];

        (fetchCartData as jest.Mock).mockResolvedValueOnce(mockCartData);

        render(<ShoppingCart />);

        await waitFor(() => {
            const card = screen.getByText('Shopping Cart').closest('div');
            expect(card).toHaveClass('card-light');
        });
    });
});
