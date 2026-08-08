import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Testimonial } from '../lib/types';

export function useTestimonials(options?: { featuredOnly?: boolean; limit?: number }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    let query = supabase.from('testimonials').select('*');

    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }
    query = query.order('created_at', { ascending: false });
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error: err } = await query;

    if (err) {
      setError(err.message);
      setTestimonials([]);
    } else {
      setTestimonials((data as Testimonial[]) || []);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, [options?.featuredOnly, options?.limit]);

  return { testimonials, loading, error, refetch: fetchTestimonials };
}
