import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormCard from '../components/FormCard';

describe('FormCard Component', () => {
    it('renders the form with input fields and submit button', () => {
        render(<FormCard />);
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('handles form submission', () => {
        render(<FormCard />);
        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.click(screen.getByText('Submit'));
        // Add assertions for side effects of form submission if applicable
    });
});
