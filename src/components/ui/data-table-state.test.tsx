import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  DataTableEmptyRow,
  DataTableErrorRow,
  DataTableLoadingRow,
} from './data-table-state';

function renderTableRow(row: React.ReactNode) {
  return render(
    <table>
      <tbody>{row}</tbody>
    </table>,
  );
}

describe('data table state rows', () => {
  it('announces loading state', () => {
    renderTableRow(<DataTableLoadingRow colSpan={3} label="Loading rows" />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading rows');
  });

  it('renders an empty state inside the table', () => {
    renderTableRow(<DataTableEmptyRow colSpan={3} title="No rows" />);

    expect(screen.getByText('No rows')).toBeInTheDocument();
  });

  it('exposes a retry action for errors', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    renderTableRow(
      <DataTableErrorRow
        colSpan={3}
        title="Request failed"
        retryLabel="Retry"
        onRetry={onRetry}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Retry' }));

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
