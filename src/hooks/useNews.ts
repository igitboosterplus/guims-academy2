import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { NewsPost } from '../lib/types';

export function useNews(limit?: number) {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    let query = supabase
      .from('news_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error: err } = await query;

    if (err) {
      setError(err.message);
      setPosts([]);
    } else {
      setPosts((data as NewsPost[]) || []);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [limit]);

  return { posts, loading, error, refetch: fetchNews };
}
