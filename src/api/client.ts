import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import instance from '@/api/axios';
import { normalizeApiError } from '@/api/error';
import type { PageResponse } from '@/api/types';

type QueryParams = Record<string, string | number | boolean | null | undefined>;

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await instance.request<T, AxiosResponse<T>>(config);
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    request<T>({ ...config, method: 'get', url }),
  getPage: <TData>(
    url: string,
    params?: QueryParams,
    config?: AxiosRequestConfig,
  ): Promise<PageResponse<TData>> =>
    request<PageResponse<TData>>({ ...config, method: 'get', url, params }),
  post: <TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => request<TResponse>({ ...config, method: 'post', url, data }),
  put: <TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => request<TResponse>({ ...config, method: 'put', url, data }),
  patch: <TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => request<TResponse>({ ...config, method: 'patch', url, data }),
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    request<T>({ ...config, method: 'delete', url }),
};
