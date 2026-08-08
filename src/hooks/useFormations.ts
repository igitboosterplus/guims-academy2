import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Formation } from '../lib/types';

export function useFormations(options?: { audience?: string; activeOnly?: boolean; limit?: number }) {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFormations = async () => {
    setLoading(true);
    let query = supabase.from('formations').select('*');

    if (options?.activeOnly !== false) {
      query = query.eq('is_active', true);
    }
    if (options?.audience) {
      query = query.eq('audience', options.audience);
    }
    query = query.order('created_at', { ascending: false });
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error: err } = await query;

    if (err) {
      setError(err.message);
      setFormations([]);
    } else {
      setFormations((data as Formation[]) || []);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFormations();
  }, [options?.audience, options?.activeOnly, options?.limit]);

  return { formations, loading, error, refetch: fetchFormations };
}
