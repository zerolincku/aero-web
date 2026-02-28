import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { useStore } from '@/store/useStore';

function SidebarHarness() {
  const { toggleSidebar, state } = useSidebar();

  return (
    <>
      <button onClick={toggleSidebar} type="button">
        toggle sidebar
      </button>
      <span data-testid="sidebar-state">{state}</span>
      <Sidebar />
    </>
  );
}

describe('Sidebar interactions', () => {
  beforeEach(() => {
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
  });

  it('can collapse sidebar and open floating sub menu', () => {
    render(
      <MemoryRouter initialEntries={['/system/settings']}>
        <SidebarProvider defaultOpen>
          <SidebarHarness />
        </SidebarProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('expanded');

    fireEvent.click(screen.getByRole('button', { name: /toggle sidebar/i }));
    expect(screen.getByTestId('sidebar-state')).toHaveTextContent('collapsed');

    const beforeOpen = screen.queryAllByText('User List').length;
    fireEvent.click(screen.getByRole('button', { name: 'Management' }));
    const afterOpen = screen.getAllByText('User List').length;
    expect(afterOpen).toBeGreaterThan(beforeOpen);
  });
});
