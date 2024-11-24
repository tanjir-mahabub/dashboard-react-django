import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../components/Card';

describe('Card Component', () => {
  it('renders with the correct title and value', () => {
    render(<Card title="Total Revenue" value="$45,000" />);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$45,000')).toBeInTheDocument();
  });
});
