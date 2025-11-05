import type { AxiosError } from 'axios';

export interface NormalizedError {
  status?: number;
  title: string;
  message: string;
}

export function handleApiError(err: unknown): NormalizedError {
  const fallback: NormalizedError = {
    title: 'Erro inesperado',
    message: 'Algo deu errado. Tente novamente mais tarde.',
  };

  if (!err) return fallback;

  const axiosErr = err as AxiosError<any>;
  if (axiosErr.isAxiosError) {
    const status = axiosErr.response?.status;
    const data = axiosErr.response?.data as any;

    return {
      status,
      title: data?.title || 'Erro na requisição',
      message: data?.message || axiosErr.message || fallback.message,
    };
  }

  if (err instanceof Error) {
    return { title: 'Erro', message: err.message };
  }

  return fallback;
}
