import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AppErrorBoundary from './AppErrorBoundary';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => options?.defaultValue || key,
  }),
  withTranslation: () => (Component: any) => {
    const Translated = (props: any) => <Component t={(k: string, opts: any) => opts?.defaultValue || k} {...props} />;
    return Translated;
  },
}));

const ThrowError = () => {
  throw new Error('Test error');
};

describe('AppErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <AppErrorBoundary>
        <div data-testid="child">Normal content</div>
      </AppErrorBoundary>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders error UI when an error is thrown', () => {
    // Suppress console.error for the expected error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <AppErrorBoundary>
        <ThrowError />
      </AppErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    spy.mockRestore();
  });

  it('allows reloading page', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const originalLocation = window.location;
    delete (window as any).location;
    window.location = { reload: vi.fn() } as any;
    
    render(
      <AppErrorBoundary>
        <ThrowError />
      </AppErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: /Reload/i }));
    expect(window.location.reload).toHaveBeenCalled();

    spy.mockRestore();
    window.location = originalLocation as any;
  });
});
