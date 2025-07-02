



import React, { useEffect } from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App'; // Adjust path as necessary
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary
import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';


// Mock child components that might have complex logic or side effects
jest.mock('./components/LandingPage', () => ({ onEnterForge, onTryDemo }: { onEnterForge: () => void, onTryDemo: () => void }) => <div data-testid="landing-page"><button onClick={onEnterForge}>Enter</button><button onClick={onTryDemo}>Demo</button></div>);
jest.mock('./components/Workbench', () => () => <div data-testid="workbench">Workbench</div>);
// Add mocks for other components like IdeaList, IdeaEditor, SettingsModal, ContactPanel, NotificationArea if they cause issues or for isolation

describe('App Component', () => {
  beforeEach(() => {
    // Ensure localStorage is in a known state for view determination
    localStorage.clear();
  });

  test('renders LandingPage initially if it is the first visit', async () => {
    // isFirstVisit will be true by default after localStorage.clear()
    render(<App />);
    expect(screen.getByTestId('landing-page')).toBeInTheDocument();
  });

  test('renders Workbench after entering from LandingPage if not first visit', async () => {
    localStorage.setItem('IDEA_FORGE_LOCAL_FIRST_VISIT_DONE', 'true');
    render(<App />);
    // The view should still be 'landing' initially
    expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    
    // Simulate user clicking "Enter the Forge"
    await act(async () => {
        fireEvent.click(screen.getByRole('button', {name: /Enter/i}));
    });

    // Now the view should change to 'projectManager' which renders Workbench
    expect(screen.getByTestId('workbench')).toBeInTheDocument();
    expect(screen.queryByTestId('landing-page')).not.toBeInTheDocument();
  });

  test('shows settings and contact buttons after entering the app', async () => {
    render(<App />);
    
    await act(async () => {
        fireEvent.click(screen.getByRole('button', {name: /Enter/i}));
    });
    
    expect(screen.getByLabelText('Open Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Open Contact Panel')).toBeInTheDocument();
  });


  describe('ErrorBoundary Integration', () => {
    // Mock console.error to prevent Jest from outputting caught errors during tests
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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