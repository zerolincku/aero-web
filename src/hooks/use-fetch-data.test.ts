import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useFetchData } from './use-fetch-data';

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
};

function createDeferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

describe('useFetchData', () => {
  it('keeps the latest request result when an older request resolves last', async () => {
    const first = createDeferred<string>();
    const second = createDeferred<string>();
    const fetcher = vi.fn<() => Promise<string>>()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise);
    const { result, rerender } = renderHook(
      ({ requestKey }) => useFetchData(fetcher, { requestKey }),
      { initialProps: { requestKey: 'first' } },
    );

    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    rerender({ requestKey: 'second' });
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
    act(() => second.resolve('newest'));

    await waitFor(() => expect(result.current.data).toBe('newest'));
    act(() => first.resolve('stale'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBe('newest');
  });

  it('normalizes rejected non-Error values', async () => {
    const fetcher = vi.fn(() => Promise.reject('request failed'));
    const { result } = renderHook(() => useFetchData(fetcher));

    await waitFor(() => expect(result.current.error).toBeInstanceOf(Error));

    expect(result.current.error?.message).toBe('request failed');
    expect(result.current.loading).toBe(false);
  });
});
