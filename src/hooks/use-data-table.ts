import { useState } from 'react';
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
  const [pageSizeValue, setPageSizeValue] = useState(String(initialPageSize));

  const pageSize = Number.parseInt(pageSizeValue, 10) || initialPageSize;
  const totalItems = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const pagedRows = rows.slice(startIndex, startIndex + pageSize);

  const paginationTokens = buildPaginationTokens(safePage, totalPages, maxVisiblePages);

  return {
    pagedRows,
    totalItems,
    totalPages,
    currentPage: safePage,
    pageSize,
    pageSizeValue,
    pageSizeOptions,
    startItem: totalItems === 0 ? 0 : startIndex + 1,
    endItem: Math.min(startIndex + pageSize, totalItems),
    paginationTokens,
    setPage: (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    setPageSizeValue: (value) => {
      setPageSizeValue(value);
      setCurrentPage(1);
    },
    resetPage: () => setCurrentPage(1),
  };
}
