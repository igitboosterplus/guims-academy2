import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Star, GraduationCap, Search, ArrowLeft, BookOpen, Briefcase, Sparkles, ChevronRight, Network, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Laureat } from '../lib/types';
import ElitePlanCard from './ElitePlanCard';
import avatarJean from '../assets/avatar-jean.jpg';
import avatarMarie from '../assets/avatar-marie.jpg';
import avatarAlain from '../assets/avatar-alain.jpg';
import { useEffect } from 'react';

// Static fallback data
const STATIC_LAUREATS = [
  {
    id: '1', name: "Priso Daniel", formation: "Secrétariat de Direction", promotion: "Promotion 2024",
    status: "Actuellement Assistant Administratif", avatar_url: avatarJean,
    social_profile_url: "https://www.linkedin.com/search/results/people/?keywords=Jean%20Dupont",
    text: "Guims Academy m'a permis d'acquérir des compétences pratiques directement exploitables en entreprise. L'accompagnement et les outils fournis m'ont permis d'obtenir un emploi immédiatement après ma formation.",
    rating: 5, bio: "Passionné par l'organisation et la gestion administrative, Jean a rejoint Guims Academy pour professionnaliser ses compétences.",
    skills: ["Gestion d'agenda complexe", "Rédaction de rapports professionnels", "Outils de bureautique avancés"],
    projects: ["Optimisation du système d'archivage numérique de Guims Group"],
    advice: "Soyez curieux et pratiquez tous les jours.", image_position: null, created_at: '',
  },
  {
    id: '2', name: "Marie Songo", formation: "Marketing Digital", promotion: "Promotion 2025",
    status: "Community Manager Freelance", avatar_url: avatarMarie,
    social_profile_url: "https://www.linkedin.com/search/results/people/?keywords=Marie%20Songo",
    text: "Une formation intense et ultra-pratique. Les projets réels m'ont donné la confiance nécessaire pour me lancer à mon propre compte.",
    rating: 5, bio: "Marie a toujours eu la fibre créative et le goût des réseaux sociaux.",
    skills: ["Copywriting & Création de contenu", "SEO & Référencement naturel", "Analyse d'audience"],
    projects: ["Lancement d'une boutique e-commerce de mode locale"],
    advice: "N'ayez pas peur de tester et de faire des erreurs.", image_position: null, created_at: '',
  },
  {
    id: '3', name: "Alain Essomba", formation: "Secrétariat Comptable", promotion: "Promotion 2024",
    status: "Comptable junior chez Guims Group", avatar_url: avatarAlain, image_position: "72% center",
    social_profile_url: "https://www.linkedin.com/search/results/people/?keywords=Alain%20Kotto",
    text: "La qualité des cours et le professionnalisme des formateurs sont remarquables.",
    rating: 5, bio: "Alain voulait maîtriser les rouages de la comptabilité d'entreprise.",
    skills: ["Saisie et rapprochement bancaire", "Sage Saari", "Déclarations fiscales"],
    projects: ["Audit et restructuration comptable d'une PME locale"],
    advice: "La comptabilité demande de la rigueur.", created_at: '',
  },
];

const LaureatsPage = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedLaureat, setSelectedLaureat] = useState<Laureat | null>(null);
  const [laureats, setLaureats] = useState<Laureat[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Secrétariat', 'Marketing'];

  useEffect(() => {
    fetchLaureats();
  }, []);

  const fetchLaureats = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('laureats').select('*').order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      setLaureats(STATIC_LAUREATS as Laureat[]);
    } else {
      setLaureats(data as Laureat[]);
    }
    setLoading(false);
  };

  const filteredLaureats = laureats.filter(laureat => {
    const matchesCategory = filter === 'All' ||
      (filter === 'Secrétariat' && laureat.formation.includes('Secrétariat')) ||
      (filter === 'Marketing' && laureat.formation.includes('Marketing'));

    const matchesSearch = laureat.name.toLowerCase().includes(search.toLowerCase()) ||
      laureat.formation.toLowerCase().includes(search.toLowerCase()) ||
      laureat.status.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (selectedLaureat) {
    return (
      <div className="laureat-profile-page animate-fade-in">
        <div className="laureat-profile-hero">
          <div className="container">
            <button className="back-list-btn" onClick={() => setSelectedLaureat(null)}>
              <ArrowLeft size={16} /> Retour aux lauréats
            </button>
            <div className="profile-header-main">
              <div className="profile-avatar-wrapper">
                <img
                  src={selectedLaureat.avatar_url || ''}
                  alt={selectedLaureat.name}
                  className="profile-large-avatar"
                  style={selectedLaureat.image_position ? { objectPosition: selectedLaureat.image_position } : undefined}
                />
                <div className="profile-award-badge">
                  <Award size={20} />
                </div>
              </div>
              <div className="profile-meta-main">
                <span className="profile-promo-tag">{selectedLaureat.promotion}</span>
                <h1>{selectedLaureat.name}</h1>
                <p className="profile-course-tag">{selectedLaureat.formation}</p>
                <div className="profile-status-box">
                  <Briefcase size={16} />
                  <span>{selectedLaureat.status}</span>
                </div>
                {selectedLaureat.social_profile_url && (
                  <a href={selectedLaureat.social_profile_url} target="_blank" rel="noreferrer" className="profile-social-link">
                    <Network size={17} /> Voir le profil LinkedIn <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container profile-body-container">
          <div className="profile-grid">
            <div className="profile-left-col">
              <div className="profile-card-item bio-card">
                <h3><BookOpen size={18} /> Biographie & Parcours</h3>
                <p>{selectedLaureat.bio}</p>
              </div>
              <div className="profile-card-item testimonial-full-card">
                <h3><Star size={18} /> Témoignage</h3>
                <div className="stars-rating-large">
                  {[...Array(selectedLaureat.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                  ))}
                </div>
                <blockquote className="profile-quote">"{selectedLaureat.text}"</blockquote>
              </div>
            </div>

            <div className="profile-right-col">
              <div className="profile-card-item skills-card">
                <h3><Sparkles size={18} /> Compétences Clés Acquises</h3>
                <div className="profile-skills-list">
                  {selectedLaureat.skills.map((skill, index) => (
                    <span key={index} className="profile-skill-badge">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="profile-card-item projects-card">
                <h3><Briefcase size={18} /> Projets Majeurs Réalisés</h3>
                <ul className="profile-projects-list">
                  {selectedLaureat.projects.map((proj, index) => (
                    <li key={index}>
                      <ChevronRight size={16} className="project-bullet" />
                      <span>{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="profile-card-item advice-card">
                <h3>Conseil pour les futurs étudiants</h3>
                <p className="profile-advice-text">{selectedLaureat.advice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="laureats-page animate-fade-in">
      <div className="laureats-hero">
        <div className="container">
          <Link to="/" className="back-home-link">
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>
          <div className="laureats-badge">
            <GraduationCap size={20} />
            <span>Success Stories</span>
          </div>
          <h1>Nos Promotionnaires & Lauréats</h1>
          <p className="laureats-subtitle">
            Découvrez les visages et les parcours des étudiants talentueux qui ont été formés chez Guims Academy et font aujourd'hui la fierté de notre institution.
          </p>
        </div>
      </div>

      <div className="container laureats-content">
        <div className="filter-search-bar">
          <div className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'All' ? 'Tous les lauréats' : cat}
              </button>
            ))}
          </div>
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un lauréat, une formation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="route-loading-spinner" /><p>Chargement...</p></div>
        ) : filteredLaureats.length > 0 ? (
          <div className="laureats-grid-modern">
            {filteredLaureats.map((laureat) => (
              <ElitePlanCard
                key={laureat.id}
                imageUrl={laureat.avatar_url || ''}
                imagePosition={laureat.image_position || undefined}
                title={laureat.name}
                subtitle={`${laureat.promotion} • ${laureat.formation}`}
                description={`"${laureat.text.length > 130 ? laureat.text.substring(0, 130) + '...' : laureat.text}"`}
                highlights={[laureat.status, "Vérifié ⭐"]}
                ctaText="Découvrir le profil"
                onAction={() => {
                  setSelectedLaureat(laureat);
                  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                }}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>Aucun lauréat trouvé correspondant à vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaureatsPage;