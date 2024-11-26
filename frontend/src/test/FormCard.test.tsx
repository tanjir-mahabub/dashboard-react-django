import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import FormCard from '../components/FormCard';
import { renderWithProviders } from './utils.test';

describe('FormCard Component', () => {
    const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => { });

    afterEach(() => {
        consoleLogMock.mockClear();
    });

    it('renders the form fields', () => {
        renderWithProviders(<FormCard />);
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    });

    it('submits the form data', () => {
        renderWithProviders(<FormCard />);
        const nameInput = screen.getByPlaceholderText('Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.click(submitButton);

        expect(consoleLogMock).toHaveBeenCalledWith(
            'Form Data Submitted:',
            { name: 'John Doe', email: 'john@example.com' }
        );
    });

    it('renders correctly in dark mode', () => {
        renderWithProviders(<FormCard />, true);
        expect(screen.getByPlaceholderText('Name')).toHaveClass('text-dark');
    });
});
