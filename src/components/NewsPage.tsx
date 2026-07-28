import { ArrowUpRight, CalendarDays, Share2 } from 'lucide-react';
import secretariatDirectionImage from '../assets/secretariat-direction.jpg';
import marketingDigitalImage from '../assets/marketing-digital.jpg';
import secretariatComptableImage from '../assets/secretariat-comptable.jpg';
import './news-page.css';

type NewsPost = {
  id: string;
  message: string;
  publishedAt: string;
  image: string;
  category: string;
};

// Replace this temporary data with posts returned by the Facebook Graph API.
const previewPosts: NewsPost[] = [
  {
    id: 'orientation',
    message: "Les inscriptions sont ouvertes. Découvrez nos formations professionnelles et échangez avec notre équipe d'orientation.",
    publishedAt: '24 juillet 2026',
    image: secretariatDirectionImage,
    category: 'Admissions',
  },
  {
    id: 'atelier',
    message: "Retour sur une semaine d'ateliers pratiques : nos apprenants mettent leurs compétences en action sur des projets concrets.",
    publishedAt: '18 juillet 2026',
    image: marketingDigitalImage,
    category: 'Vie de campus',
  },
  {
    id: 'certification',
    message: "Félicitations à nos apprenants certifiés. Leur parcours marque une nouvelle étape vers une insertion professionnelle durable.",
    publishedAt: '10 juillet 2026',
    image: secretariatComptableImage,
    category: 'Réussite',
  },
];

const NewsPage = () => {
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
            <Share2 size={18} aria-hidden="true" />
            Facebook
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="news-page-feed" aria-labelledby="news-feed-title">
        <div className="news-page-container">
          <div className="news-page-feed-header">
            <h2 id="news-feed-title">Dernières publications</h2>
            <span>Synchronisation Facebook à venir</span>
          </div>

          <div className="news-page-grid">
            {previewPosts.map((post) => (
              <article className="news-post" key={post.id}>
                <img className="news-post-image" src={post.image} alt="" />
                <div className="news-post-content">
                  <div className="news-post-meta">
                    <span>{post.category}</span>
                    <time dateTime="2026-07-01">
                      <CalendarDays size={15} aria-hidden="true" /> {post.publishedAt}
                    </time>
                  </div>
                  <p>{post.message}</p>
                  <a href="#" className="news-post-link">
                    Lire sur Facebook <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsPage;