import { useEffect, useState, useCallback } from 'react';
import { api } from '../services/api';
import type { User } from '../types';
import { handleApiError, type NormalizedError } from '../utils/handleApiError';

export function useUser(userId?: number) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<NormalizedError | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getUser(userId);
      setUser(data);
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const update = useCallback(async (data: Partial<User>) => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const updated = await api.updateUser(user.id, data);
      setUser(updated);
      setError(null);
      return updated;
    } catch (err) {
      setError(handleApiError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { user, loading, error, refresh, update };
}
