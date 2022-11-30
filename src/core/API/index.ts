import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { API_TIMEOUT, API_BASE_URL } from './config';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

export const getOptions = (
  moreOptions?: AxiosRequestConfig<any>
): AxiosRequestConfig<any> => ({
  headers: {
    Authorization: `Bearer ${window?.localStorage.getItem('jwt') || ''}`,
  },
  ...moreOptions,
});

export function get<R>(
  url: string,
  options?: AxiosRequestConfig<any>
): Promise<AxiosResponse<R>> {
  return instance.get(url, getOptions(options));
}

export function post<B, R = {}>(
  url: string,
  body: B,
  options?: AxiosRequestConfig<any>
): Promise<AxiosResponse<R>> {
  return instance.post(url, body, getOptions(options));
}

export function put<B, R = {}>(
  url: string,
  body: B,
  options?: AxiosRequestConfig<any>
): Promise<AxiosResponse<R>> {
  return instance.put(url, body, getOptions(options));
}

export function patch<B, R = {}>(
  url: string,
  body: B,
  options?: AxiosRequestConfig<any>
): Promise<AxiosResponse<R>> {
  return instance.patch(url, body, getOptions(options));
}

export function del<R = {}>(
  url: string,
  options?: AxiosRequestConfig<any>
): Promise<AxiosResponse<R>> {
  return instance.delete(url, getOptions(options));
}
