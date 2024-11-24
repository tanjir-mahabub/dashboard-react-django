
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../components/Card';

describe('Card Component', () => {
    it('renders the card with the title and value', () => {
        render(<Card title="Total Revenue" value="$45,000" />);
        expect(screen.getByText('Total Revenue')).toBeInTheDocument();
        expect(screen.getByText('$45,000')).toBeInTheDocument();
    });

    it('renders the card with an optional icon', () => {
        render(
            <Card
                title="Gift Available"
                value="Yes"
                icon={<span data-testid="icon">🎁</span>}
            />
        );
        expect(screen.getByText('Gift Available')).toBeInTheDocument();
        expect(screen.getByText('Yes')).toBeInTheDocument();
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders a loading state when loading is true', () => {
        render(<Card loading />);
        expect(screen.getByRole('status')).toBeInTheDocument(); // Ensure skeleton loader is present
    });
});
