import { AxiosError } from 'axios';
import type { ApiErrorResponse, ApiErrorShape } from '@/api/types';

const isApiErrorResponse = (payload: unknown): payload is ApiErrorResponse => {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }

  const obj = payload as Record<string, unknown>;
  const hasCode = typeof obj.code === 'string' || typeof obj.code === 'number';
  const hasMsg = typeof obj.msg === 'string';
  return hasCode && hasMsg;
};

export class ApiRequestError extends Error {
  public readonly code?: string | number;
  public readonly status?: number;
  public readonly raw?: unknown;

  public constructor(shape: ApiErrorShape) {
    super(shape.message);
    this.name = 'ApiRequestError';
    this.code = shape.code;
    this.status = shape.status;
    this.raw = shape.raw;
  }
}

export const normalizeApiError = (error: unknown): ApiRequestError => {
  if (error instanceof ApiRequestError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const payload = error.response?.data;
    const status = error.response?.status;

    if (isApiErrorResponse(payload)) {
      return new ApiRequestError({
        message: payload.msg,
        code: payload.code,
        status,
        raw: payload,
      });
    }

    return new ApiRequestError({
      message: error.message || 'Request failed',
      status,
      raw: payload,
    });
  }

  if (error instanceof Error) {
    return new ApiRequestError({
      message: error.message,
      raw: error,
    });
  }

  return new ApiRequestError({
    message: 'Unknown request error',
    raw: error,
  });
};
