import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from 'react';
import type { PaginatedResult } from '@/api/types';
import { buildPaginationTokens, type PaginationToken } from '@/lib/pagination';

type RemotePageLoader<T> = (
  page: number,
  pageSize: number,
) => Promise<PaginatedResult<T>>;

export type UseDataTableOptions<T> = {
  rows?: readonly T[];
  loadPage?: RemotePageLoader<T>;
  queryKey?: string;
  onLoadError?: (error: unknown) => void;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  maxVisiblePages?: number;
};

type RemotePageState<T> = PaginatedResult<T> & {
  page: number;
  pageSize: number;
  queryKey: string;
};

type ReloadRequest = {
  sequence: number;
  silent: boolean;
};

export type UseDataTableResult<T> = {
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
  isLoading: boolean;
  isRefreshing: boolean;
  loadError: unknown | null;
  reload: (options?: { silent?: boolean }) => void;
  setPage: (page: number) => void;
  setPageSizeValue: (value: string) => void;
  resetPage: () => void;
};

export function useDataTable<T>({
  rows = [],
  loadPage,
  queryKey = '',
  onLoadError,
  initialPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  maxVisiblePages = 5,
}: UseDataTableOptions<T>): UseDataTableResult<T> {
  const [pageState, setPageState] = useState({ page: 1, queryKey });
  const [pageSizeValue, setPageSizeValue] = useState(String(initialPageSize));
  const [remotePage, setRemotePage] = useState<RemotePageState<T> | null>(null);
  const [isLoading, setIsLoading] = useState(loadPage !== undefined);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<unknown | null>(null);
  const [reloadRequest, setReloadRequest] = useState<ReloadRequest>({
    sequence: 0,
    silent: false,
  });
  const requestSequence = useRef(0);
  const loadRemotePage = useEffectEvent((page: number, size: number) =>
    loadPage ? loadPage(page, size) : Promise.resolve(null));
  const notifyLoadError = useEffectEvent((error: unknown) => {
    onLoadError?.(error);
  });

  const pageSize = Number.parseInt(pageSizeValue, 10) || initialPageSize;
  const isRemote = loadPage !== undefined;
  const currentPage = pageState.queryKey === queryKey ? pageState.page : 1;
  const remotePageMatches = remotePage?.queryKey === queryKey
    && remotePage.pageSize === pageSize;
  const totalItems = isRemote
    ? (remotePageMatches ? remotePage.total : 0)
    : rows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const pagedRows = isRemote
    ? (remotePageMatches && remotePage.page === currentPage ? remotePage.items : [])
    : rows.slice(startIndex, startIndex + pageSize);
  const canRefreshSilently = reloadRequest.silent
    && remotePageMatches
    && remotePage?.page === currentPage;

  useEffect(() => {
    if (!isRemote) return;

    let active = true;
    const sequence = ++requestSequence.current;
    const load = async () => {
      if (canRefreshSilently) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
        setLoadError(null);
      }

      try {
        const result = await loadRemotePage(currentPage, pageSize);
        if (!active || sequence !== requestSequence.current || !result) return;

        const lastPage = Math.max(1, Math.ceil(result.total / pageSize));
        if (currentPage > lastPage) {
          setPageState({ page: lastPage, queryKey });
          return;
        }

        const nextPage: RemotePageState<T> = {
          ...result,
          page: currentPage,
          pageSize,
          queryKey,
        };
        setRemotePage(nextPage);
        setLoadError(null);
        setPageState({ page: currentPage, queryKey });
      } catch (error) {
        if (!active || sequence !== requestSequence.current) return;
        if (!canRefreshSilently) {
          setLoadError(error);
        }
        notifyLoadError(error);
      } finally {
        if (active && sequence === requestSequence.current) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    };

    queueMicrotask(() => {
      if (active) void load();
    });

    return () => {
      active = false;
      requestSequence.current += 1;
    };
  }, [canRefreshSilently, currentPage, isRemote, pageSize, queryKey, reloadRequest.sequence]);

  const reload = useCallback((options?: { silent?: boolean }) => {
    if (!isRemote) return;

    setReloadRequest((current) => ({
      sequence: current.sequence + 1,
      silent: options?.silent === true,
    }));
  }, [isRemote]);

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
    isLoading: isRemote && isLoading,
    isRefreshing: isRemote && isRefreshing,
    loadError: isRemote ? loadError : null,
    reload,
    setPage: (page) => {
      if (page >= 1 && page <= totalPages) {
        setPageState({ page, queryKey });
      }
    },
    setPageSizeValue: (value) => {
      setPageSizeValue(value);
      setPageState({ page: 1, queryKey });
    },
    resetPage: () => setPageState({ page: 1, queryKey }),
  };
}
