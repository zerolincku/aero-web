import { useCallback, useMemo, useState } from 'react';
import { buildPaginationTokens, type PaginationToken } from '@/lib/pagination';

type UseDataTableOptions<T> = {
  rows: T[];
  initialPageSize?: number;
  pageSizeOptions?: number[];
  maxVisiblePages?: number;
};

type UseDataTableResult<T> = {
  pagedRows: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  pageSizeValue: string;
  pageSizeOptions: number[];
  startItem: number;
  endItem: number;
  paginationTokens: PaginationToken[];
  setPage: (page: number) => void;
  setPageSizeValue: (value: string) => void;
  resetPage: () => void;
};

export function useDataTable<T>({
  rows,
  initialPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  maxVisiblePages = 5,
}: UseDataTableOptions<T>): UseDataTableResult<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeValue, setInternalPageSizeValue] = useState(String(initialPageSize));

  const pageSize = useMemo(
    () => Number.parseInt(pageSizeValue, 10) || initialPageSize,
    [initialPageSize, pageSizeValue],
  );
  const totalItems = rows.length;
  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / pageSize)), [pageSize, totalItems]);
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const pagedRows = useMemo(
    () => rows.slice(startIndex, startIndex + pageSize),
    [pageSize, rows, startIndex],
  );

  const paginationTokens = useMemo(
    () => buildPaginationTokens(safePage, totalPages, maxVisiblePages),
    [maxVisiblePages, safePage, totalPages],
  );

  const setPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const setPageSizeValue = useCallback((value: string) => {
    setInternalPageSizeValue(value);
    setCurrentPage(1);
  }, []);

  const resetPage = useCallback(() => setCurrentPage(1), []);
  const startItem = totalItems === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(startIndex + pageSize, totalItems);

  return useMemo(() => ({
    pagedRows,
    totalItems,
    totalPages,
    currentPage: safePage,
    pageSize,
    pageSizeValue,
    pageSizeOptions,
    startItem,
    endItem,
    paginationTokens,
    setPage,
    setPageSizeValue,
    resetPage,
  }), [
    endItem,
    pageSize,
    pageSizeOptions,
    pageSizeValue,
    pagedRows,
    paginationTokens,
    resetPage,
    startItem,
    safePage,
    setPage,
    setPageSizeValue,
    totalItems,
    totalPages,
  ]);
}
