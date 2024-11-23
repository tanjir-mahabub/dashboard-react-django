// src/components/Card.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card Component', () => {
    it('renders the card with the correct title and value', () => {
        render(<Card title="Total Credit" value="$1500" />);
        expect(screen.getByText('Total Credit')).toBeInTheDocument();
        expect(screen.getByText('$1500')).toBeInTheDocument();
    });

    it('renders the card with an optional icon', () => {
        render(<Card title="Gift Available" value="Yes" icon={<span>🎁</span>} />);
        expect(screen.getByText('🎁')).toBeInTheDocument();
    });
});
