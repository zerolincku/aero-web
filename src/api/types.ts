export type ApiErrorResponse = {
  code: string | number;
  msg: string;
};

export type ApiErrorShape = {
  message: string;
  code?: string | number;
  status?: number;
  raw?: unknown;
};

// Backend pagination payload shape.
export type PageResponse<TData> = {
  total: number;
  page_num: number;
  page_size: number;
  data: TData;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
};

export const toPaginatedResult = <T>(page: PageResponse<T[]>): PaginatedResult<T> => ({
  items: page.data,
  total: page.total,
});
