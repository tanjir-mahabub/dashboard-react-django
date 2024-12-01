import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from '../components/Card';

// Mock the useTheme hook
vi.mock('../hooks/useTheme', () => ({
  default: () => ({
    theme: 'light',
  }),
}));

describe('Card Component', () => {
  it('renders title and value correctly', () => {
    render(<Card title="Revenue" value="$10,000" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$10,000')).toBeInTheDocument();
  });

  it('renders the default icon if no icon is provided', () => {
    render(<Card title="Default Icon Test" value="Test Value" />);
    const defaultIcon = screen.getByTestId('heroicon-question-mark-circle-icon');
    expect(defaultIcon).toBeInTheDocument();
  });

  it('renders the correct icon based on the icon prop', () => {
    render(<Card title="Shopping" value="50 items" icon="ShoppingCartIcon" />);
    const shoppingCartIcon = screen.getByTestId('heroicon-shopping-cart-icon');
    expect(shoppingCartIcon).toBeInTheDocument();
  });

  it('applies the correct color to the icon', () => {
    render(<Card title="Revenue" value="$10,000" icon="CurrencyDollarIcon" />);
    const dollarIcon = screen.getByTestId('heroicon-currency-dollar-icon');
    expect(dollarIcon).toHaveClass('text-green-500');
  });

  it('renders a loading card when loading is true', () => {
    render(<Card title="Loading Card" loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders a custom loading message when loading is true and title is provided', () => {
    render(<Card title="Custom Loading Title" loading={true} />);
    expect(screen.getByText('Custom Loading Title')).toBeInTheDocument();
  });
});
