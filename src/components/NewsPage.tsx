import { useState, useEffect } from 'react';
import { ArrowUpRight, CalendarDays, Share2, Globe, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { NewsPost } from '../lib/types';
import './news-page.css';

// Fallback static data
import secretariatDirectionImage from '../assets/secretariat-direction.jpg';
import marketingDigitalImage from '../assets/marketing-digital.jpg';
import secretariatComptableImage from '../assets/secretariat-comptable.jpg';

const FALLBACK_POSTS: NewsPost[] = [
  {
    id: 'orientation',
    message: "Les inscriptions sont ouvertes. Découvrez nos formations professionnelles et échangez avec notre équipe d'orientation.",
    published_at: '2026-07-24T00:00:00Z',
    image_url: secretariatDirectionImage,
    category: 'Admissions',
    facebook_post_id: null,
    permalink_url: null,
    is_from_facebook: false,
    created_at: '2026-07-24T00:00:00Z',
  },
  {
    id: 'atelier',
    message: "Retour sur une semaine d'ateliers pratiques : nos apprenants mettent leurs compétences en action sur des projets concrets.",
    published_at: '2026-07-18T00:00:00Z',
    image_url: marketingDigitalImage,
    category: 'Vie de campus',
    facebook_post_id: null,
    permalink_url: null,
    is_from_facebook: false,
    created_at: '2026-07-18T00:00:00Z',
  },
  {
    id: 'certification',
    message: "Félicitations à nos apprenants certifiés. Leur parcours marque une nouvelle étape vers une insertion professionnelle durable.",
    published_at: '2026-07-10T00:00:00Z',
    image_url: secretariatComptableImage,
    category: 'Réussite',
    facebook_post_id: null,
    permalink_url: null,
    is_from_facebook: false,
    created_at: '2026-07-10T00:00:00Z',
  },
];

const NewsPage = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      setPosts(FALLBACK_POSTS);
    } else {
      setPosts(data as NewsPost[]);
    }
    setLoading(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <main className="news-page">
      <section className="news-page-intro">
        <div className="news-page-container">
          <div className="news-page-heading">
            <p className="news-page-eyebrow">
              <Share2 size={16} aria-hidden="true" /> Actualités
            </p>
            <h1>La vie de Guims Academy</h1>
            <p>
              Retrouvez les annonces, les réussites de nos apprenants et les moments
              forts de la communauté.
            </p>
          </div>
          <a
            className="news-page-facebook-link"
            href="#"
            aria-label="Ouvrir la page Facebook de Guims Academy"
          >
            <Globe size={18} aria-hidden="true" />
            Facebook
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="news-page-feed" aria-labelledby="news-feed-title">
        <div className="news-page-container">
          <div className="news-page-feed-header">
            <h2 id="news-feed-title">Dernières publications</h2>
            <span>{posts.some(p => p.is_from_facebook) ? '🔄 Synchronisé depuis Facebook' : 'Publications locales'}</span>
          </div>

          {loading ? (
            <div className="admin-loading" style={{ padding: '3rem 0' }}>
              <Loader2 size={32} className="spin" />
              <p>Chargement des actualités...</p>
            </div>
          ) : (
            <div className="news-page-grid">
              {posts.map((post) => (
                <article className="news-post" key={post.id}>
                  {post.image_url && (
                    <img className="news-post-image" src={post.image_url} alt="" />
                  )}
                  <div className="news-post-content">
                    <div className="news-post-meta">
                      <span>
                        {post.is_from_facebook && <Globe size={12} style={{ marginRight: 4 }} />}
                        {post.category}
                      </span>
                      <time dateTime={post.published_at}>
                        <CalendarDays size={15} aria-hidden="true" /> {formatDate(post.published_at)}
                      </time>
                    </div>
                    <p>{post.message}</p>
                    {post.permalink_url ? (
                      <a href={post.permalink_url} target="_blank" rel="noopener noreferrer" className="news-post-link">
                        Lire sur Facebook <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="news-post-source">Publication locale</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default NewsPage;