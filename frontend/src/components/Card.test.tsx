import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides extended matchers like toBeInTheDocument
import Card from './Card';
import { describe, expect, it } from 'vitest';
import React from 'react';

describe('Card Component', () => {
  it('renders the card with the correct title and value', () => {
    render(<Card title="Total Credit" value="$1500" />);
    // Assert that the title is displayed
    expect(screen.getByText('Total Credit')).toBeInTheDocument();
    // Assert that the value is displayed
    expect(screen.getByText('$1500')).toBeInTheDocument();
  });

  it('renders the card with an optional icon', () => {
    render(<Card title="Gift Available" value="Yes" icon={<span>🎁</span>} />);
    // Assert that the icon is displayed
    expect(screen.getByText('🎁')).toBeInTheDocument();
  });
});