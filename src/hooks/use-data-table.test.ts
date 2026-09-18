import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDataTable } from './use-data-table';

describe('useDataTable', () => {
  it('preserves local pagination behavior', () => {
    const { result } = renderHook(() => useDataTable({
      rows: ['a', 'b', 'c'],
      initialPageSize: 2,
    }));

    expect(result.current.pagedRows).toEqual(['a', 'b']);
    expect(result.current.totalPages).toBe(2);

    act(() => result.current.setPage(2));

    expect(result.current.pagedRows).toEqual(['c']);
    expect(result.current.startItem).toBe(3);
    expect(result.current.isLoading).toBe(false);
  });

  it('loads remote pages and resets to page one when the query changes', async () => {
    const loadPage = vi.fn(async (page: number, pageSize: number) => ({
      items: [`page-${page}`],
      total: pageSize * 2,
    }));
    const { result, rerender } = renderHook(
      ({ queryKey }) => useDataTable({
        loadPage,
        queryKey,
        initialPageSize: 2,
      }),
      { initialProps: { queryKey: 'all' } },
    );

    await waitFor(() => expect(result.current.pagedRows).toEqual(['page-1']));
    act(() => result.current.setPage(2));
    await waitFor(() => expect(result.current.pagedRows).toEqual(['page-2']));

    rerender({ queryKey: 'filtered' });

    await waitFor(() => {
      expect(result.current.currentPage).toBe(1);
      expect(loadPage).toHaveBeenLastCalledWith(1, 2);
    });
  });

  it('keeps visible rows during a silent refresh', async () => {
    const loadPage = vi.fn(async () => ({ items: ['row'], total: 1 }));
    const { result } = renderHook(() => useDataTable({ loadPage }));

    await waitFor(() => expect(result.current.pagedRows).toEqual(['row']));
    act(() => result.current.reload({ silent: true }));

    expect(result.current.pagedRows).toEqual(['row']);
    await waitFor(() => expect(loadPage).toHaveBeenCalledTimes(2));
  });
});
