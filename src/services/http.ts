import axios, { type AxiosError, type AxiosInstance } from 'axios';

const BASE_URL: string | undefined = (
  (import.meta as unknown as { env?: { VITE_API_URL?: string } })
).env?.VITE_API_URL;

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor: attach JWT if present
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (!config.headers || !('Content-Type' in config.headers)) {
    // default JSON for requests with body
    if (config.data && typeof config.data === 'object') {
      (config.headers as Record<string, string>)['Content-Type'] = 'application/json';
    }
  }
  return config;
});

// Response interceptor: unwrap data and normalize errors
instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Let callers handle via handleApiError util
    return Promise.reject(error);
  }
);

async function get<T>(path: string): Promise<T> {
  const res = await instance.get<T>(path);
  return res.data as T;
}

async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await instance.post<T>(path, body);
  return res.data as T;
}

async function put<T>(path: string, body?: unknown): Promise<T> {
  const res = await instance.put<T>(path, body);
  return res.data as T;
}

async function patch<T>(path: string, body?: unknown): Promise<T> {
  const res = await instance.patch<T>(path, body);
  return res.data as T;
}

async function del<T>(path: string): Promise<T> {
  const res = await instance.delete<T>(path);
  return res.data as T;
}

export const http = { get, post, put, patch, delete: del };
export { BASE_URL };
