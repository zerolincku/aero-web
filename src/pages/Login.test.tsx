import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { useStore } from '../store/useStore';
import * as authApi from '../api/modules/auth';

vi.mock('../api/modules/auth', () => ({
  loginWithPassword: vi.fn(),
}));

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStore.setState({ isAuthenticated: false, currentUser: null });
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  it('renders login form', () => {
    renderLogin();
    expect(screen.getByLabelText('login.email')).toBeInTheDocument();
    expect(screen.getByLabelText('login.password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'common.actions.signIn' })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const mockSession = {
      accessToken: 'mock-token',
      user: { id: '1', email: 'admin@example.com', name: 'Admin', role: 'Admin', status: 'Active' as const },
    };
    vi.mocked(authApi.loginWithPassword).mockResolvedValueOnce(mockSession);

    renderLogin();

    const emailInput = screen.getByLabelText('login.email');
    const passwordInput = screen.getByLabelText('login.password');
    const submitButton = screen.getByRole('button', { name: 'common.actions.signIn' });

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    
    await waitFor(() => {
      expect(authApi.loginWithPassword).toHaveBeenCalledWith({
        email: 'admin@example.com',
        password: 'password',
      });
      expect(useStore.getState().isAuthenticated).toBe(true);
    });
  });

  it('handles failed login', async () => {
    vi.mocked(authApi.loginWithPassword).mockRejectedValueOnce(new Error('Invalid credentials'));

    renderLogin();

    const submitButton = screen.getByRole('button', { name: 'common.actions.signIn' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authApi.loginWithPassword).toHaveBeenCalled();
      expect(useStore.getState().isAuthenticated).toBe(false);
    });
  });
});
