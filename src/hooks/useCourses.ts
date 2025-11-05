import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Course } from '../types';
import { handleApiError, type NormalizedError } from '../utils/handleApiError';

export function useCourses(params?: { category?: string; search?: string }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .getCourses(params?.category, params?.search)
      .then((data) => {
        if (!mounted) return;
        setCourses(data);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(handleApiError(err));
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [params?.category, params?.search]);

  return { courses, loading, error };
}
