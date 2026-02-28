import { render, screen } from '@testing-library/react';
import App from '@/App';
import { useStore } from '@/store/useStore';

describe('App auth routing', () => {
  beforeEach(() => {
    useStore.setState({
      isAuthenticated: false,
      currentUser: null,
    });
  });

  it('redirects unauthenticated users to login', async () => {
    window.location.hash = '#/';
    render(<App />);

    expect(await screen.findByText('Welcome back')).toBeInTheDocument();
  });

  it('allows authenticated users to access dashboard', async () => {
    useStore.setState({
      isAuthenticated: true,
      currentUser: {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'Administrator',
        status: 'Active',
      },
    });

    window.location.hash = '#/';
    render(<App />);

    expect(await screen.findByText('Overview of your application state and metrics.')).toBeInTheDocument();
  });
});

