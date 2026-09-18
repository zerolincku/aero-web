import { useCallback, useEffect, useRef, useState } from 'react';

type FetchDataRequestKey = string | number | boolean | null | undefined;

type UseFetchDataOptions = {
  requestKey?: FetchDataRequestKey;
};

const toError = (error: unknown): Error =>
  error instanceof Error ? error : new Error(String(error));

export function useFetchData<T>(
  fetcher: () => Promise<T>,
  options: UseFetchDataOptions = {},
) {
  const { requestKey } = options;
  const requestSequence = useRef(0);
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    const sequence = ++requestSequence.current;
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      if (sequence === requestSequence.current) {
        setData(result);
      }
    } catch (fetchError) {
      if (sequence === requestSequence.current) {
        setError(toError(fetchError));
      }
    } finally {
      if (sequence === requestSequence.current) {
        setLoading(false);
      }
    }
  }, [fetcher]);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (active) void execute();
    });

    return () => {
      active = false;
      requestSequence.current += 1;
    };
  }, [execute, requestKey]);

  return {
    data,
    loading,
    isRefreshing: loading && data !== undefined,
    error,
    refetch: execute,
  };
}
