import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ShoppingCart from '../components/ShoppingCart';
import * as apiService from '../services/apiServices';

// Mock the API service with a spy
vi.mock('../services/apiServices', { spy: true });

describe('ShoppingCart Component', () => {
    it('renders fetched cart items', async () => {
        // Spy on the actual function
        const spy = vi.spyOn(apiService, 'fetchCartData');

        // Mock resolved value
        spy.mockResolvedValue([
            { id: 1, name: 'Apple', quantity: 3, price: 1.99 },
            { id: 2, name: 'Banana', quantity: 5, price: 0.99 },
        ]);

        await act(async () => {
            render(<ShoppingCart />);
        });

        // Wait for the items to appear in the DOM
        await waitFor(() => {
            expect(screen.getByText('Apple')).toBeInTheDocument();
            expect(screen.getByText('3 x $1.99')).toBeInTheDocument();
            expect(screen.getByText('Banana')).toBeInTheDocument();
            expect(screen.getByText('5 x $0.99')).toBeInTheDocument();
        });

        // Ensure the spy was called
        expect(spy).toHaveBeenCalledTimes(1);
    });

    // it('handles fetch errors gracefully', async () => {
    //     const spy = vi.spyOn(apiService, 'fetchCartData');
    //     spy.mockRejectedValue(new Error('Failed to fetch cart data'));

    //     await act(async () => {
    //         render(<ShoppingCart />);
    //     });

    //     await waitFor(() => {
    //         expect(screen.getByText('Unable to load shopping cart data.')).toBeInTheDocument();
    //     });

    //     // Ensure the spy was called
    //     expect(spy).toHaveBeenCalledTimes(1);
    // });
    
});
