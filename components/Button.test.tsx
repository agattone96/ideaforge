import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// Removed redundant: import '@testing-library/jest-dom';
import { describe, test, expect, jest } from '@jest/globals';
import Button from './Button'; // Adjust path as necessary

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-theme-accent-primary'); // Default variant updated in component
    expect(buttonElement).toHaveClass('px-5 py-2 text-sm'); // Default size is md
  });

  test('applies variant styles correctly', () => {
    render(<Button variant="outline">Outline Button</Button>);
    const buttonElement = screen.getByText(/outline button/i);
    expect(buttonElement).toHaveClass('border-theme-accent-primary text-theme-accent-primary');
  });

  test('applies size styles correctly', () => {
    render(<Button size="lg">Large Button</Button>);
    const buttonElement = screen.getByText(/large button/i);
    expect(buttonElement).toHaveClass('px-6 py-2.5 text-base');
  });

  test('renders left and right icons', () => {
    const LeftIcon = () => <svg data-testid="left-icon" />;
    const RightIcon = () => <svg data-testid="right-icon" />;
    render(
      <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
        Button with Icons
      </Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText(/disabled button/i);
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('disabled:opacity-50');
  });

  test('shows loading state when isLoading prop is true', () => {
    render(<Button isLoading>Loading...</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.querySelector('svg.animate-spin')).toBeInTheDocument();
    expect(buttonElement).toBeDisabled(); // Should also be disabled when loading
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument(); // Children are replaced by spinner
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    fireEvent.click(screen.getByText(/clickable/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick handler when disabled and clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled</Button>);
    fireEvent.click(screen.getByText(/disabled/i));
    expect(handleClick).not.toHaveBeenCalled();
  });
});