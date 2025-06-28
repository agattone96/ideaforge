

import React, { useEffect } from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import App from './App'; // Adjust path as necessary
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary


// Mock child components that might have complex logic or side effects
jest.mock('./components/WelcomeScreen', () => () => <div data-testid="welcome-screen">Welcome Screen</div>);
jest.mock('./components/Workbench', () => () => <div data-testid="workbench">Workbench</div>);
// Add mocks for other components like IdeaList, IdeaEditor, SettingsModal, ContactPanel, NotificationArea if they cause issues or for isolation

describe('App Component', () => {
  beforeEach(() => {
    // Ensure localStorage is in a known state for view determination
    localStorage.clear();
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
        configurable: true,
        value: true,
    });
  });

  test('renders WelcomeScreen initially if it is the first visit', async () => {
    // isFirstVisit will be true by default after localStorage.clear()
    render(<App />);
    // Wait for initial loader to hide
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 600)); // Wait for initialLoadComplete timeout + buffer
    });
    expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
  });

  test('renders Workbench if not the first visit', async () => {
    localStorage.setItem('IDEA_FORGE_LOCAL_FIRST_VISIT_DONE', 'true');
    render(<App />);
     // Wait for initial loader to hide
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
    });
    expect(screen.getByTestId('workbench')).toBeInTheDocument();
    expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
  });

  test('shows settings and contact buttons after initial load and not on welcome screen', async () => {
    localStorage.setItem('IDEA_FORGE_LOCAL_FIRST_VISIT_DONE', 'true');
    render(<App />);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
    });
    expect(screen.getByLabelText('Open Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Open Contact Panel')).toBeInTheDocument();
  });

  test('displays initial connection status', async () => {
    render(<App />);
    // Status is updated in useEffect, so it might appear after initial render
    const statusElement = document.getElementById('connection-status');
    expect(statusElement).toBeInTheDocument();
    // Allow useEffect to run
     await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Short wait for useEffect
    });
    expect(statusElement?.textContent).toBe('Cosmic Link: Stable');
  });

  describe('ErrorBoundary Integration', () => {
    // Mock console.error to prevent Jest from outputting caught errors during tests
     
    let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;


    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('ErrorBoundary catches errors and displays fallback UI', () => {
      const ThrowErrorComponent = () => {
        useEffect(() => { // Throw error after initial render in an effect
          throw new Error('Test error from child');
        }, []);
        return null;
      };

      render(
        <ErrorBoundary>
          <ThrowErrorComponent />
        </ErrorBoundary>
      );

      // Check for fallback UI elements
      expect(screen.getByText(/Cosmic Anomaly Detected/i)).toBeInTheDocument();
      expect(screen.getByText(/A quantum fluctuation has occurred/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reload Application/i })).toBeInTheDocument();

      // Check if console.error was called by ErrorBoundary's componentDidCatch
      expect(consoleErrorSpy).toHaveBeenCalled();
      // Optionally check the content of the error log
      // e.g., expect(consoleErrorSpy.mock.calls[0][0]).toBeInstanceOf(Error);
      // expect(consoleErrorSpy.mock.calls[0][0].message).toBe('Test error from child');
    });
  });
});