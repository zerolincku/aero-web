import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemePicker } from './ThemePicker';
import { useStore } from '../store/useStore';
import { SidebarProvider } from './ui/sidebar';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ThemePicker', () => {
  beforeEach(() => {
    useStore.setState({ theme: 'system',    themeColor: 'zinc', });
  });

  it('renders theme picker trigger', () => {
    render(
      <SidebarProvider>
        <ThemePicker isCollapsed={false} />
      </SidebarProvider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('allows changing theme', () => {
    render(
      <SidebarProvider>
        <ThemePicker isCollapsed={false} />
      </SidebarProvider>
    );
    
    // Open dropdown
    fireEvent.click(screen.getByRole('button'));
    
    // Click dark theme
    fireEvent.click(screen.getByRole('button', { name: /common\.theme\.dark/i }));
    
    expect(useStore.getState().theme).toBe('dark');
  });

  it('allows changing theme color', () => {
    render(
      <SidebarProvider>
        <ThemePicker isCollapsed={false} />
      </SidebarProvider>
    );
    
    // Open dropdown
    fireEvent.click(screen.getByRole('button'));
    
    // Click blue color
    fireEvent.click(screen.getByRole('button', { name: /sidebar\.accentColor blue/i }));
    
    expect(useStore.getState().themeColor).toBe('blue');
  });
});
