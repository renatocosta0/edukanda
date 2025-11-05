import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Course } from '../types';
import { handleApiError, type NormalizedError } from '../utils/handleApiError';

export function useUserProgress() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NormalizedError | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .getUserProgress()
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
  }, []);

  return { courses, loading, error };
}
