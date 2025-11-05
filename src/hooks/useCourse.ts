import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Course } from '../types';
import { handleApiError, type NormalizedError } from '../utils/handleApiError';

export function useCourse(id?: number) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<NormalizedError | null>(null);

  useEffect(() => {
    if (!id && id !== 0) return;
    let mounted = true;
    setLoading(true);
    api
      .getCourseById(id as number)
      .then((data) => {
        if (!mounted) return;
        setCourse(data || null);
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
  }, [id]);

  return { course, loading, error };
}
