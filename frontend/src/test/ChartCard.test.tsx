import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChartCard from '../components/ChartCard';

describe('ChartCard Component', () => {
    it('renders the chart with the title', () => {
        const { getByText } = render(<ChartCard />);
        expect(getByText('Sales Chart')).toBeInTheDocument();
    });
});
