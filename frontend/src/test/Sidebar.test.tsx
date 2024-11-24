import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { describe, expect, it } from 'vitest';

describe('Sidebar Component', () => {
    it('renders navigation links', () => {
        render(
            <BrowserRouter>
                <Sidebar />
            </BrowserRouter>
        );
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });
});
