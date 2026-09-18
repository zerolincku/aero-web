import { createRef, type ReactNode } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import i18n from '@/i18n';
import AppErrorBoundary, {
  AppErrorBoundary as AppErrorBoundaryBase,
} from './AppErrorBoundary';

function ThrowError(): ReactNode {
  throw new Error('Test error');
}

function renderBoundaryBase(children: ReactNode) {
  const ref = createRef<AppErrorBoundaryBase>();
  render(
    <AppErrorBoundaryBase
      ref={ref}
      t={i18n.t}
      i18n={i18n}
      tReady
    >
      {children}
    </AppErrorBoundaryBase>,
  );
  return ref;
}

describe('AppErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <AppErrorBoundary>
        <div data-testid="child">Normal content</div>
      </AppErrorBoundary>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders error UI when an error is thrown', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AppErrorBoundary>
        <ThrowError />
      </AppErrorBoundary>,
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    spy.mockRestore();
  });

  it('clears the error state when navigating home', async () => {
    const user = userEvent.setup();
    const ref = renderBoundaryBase(<div>Recovered content</div>);

    act(() => {
      ref.current?.setState({ hasError: true });
    });

    await user.click(screen.getByRole('button', { name: /Go Home/i }));

    expect(screen.getByText('Recovered content')).toBeInTheDocument();
    expect(window.location.hash).toBe('#/');
  });
});
