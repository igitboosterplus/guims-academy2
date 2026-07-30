import { useState } from 'react';
import { Award, Star, GraduationCap, Search, ArrowLeft, BookOpen, Briefcase, Sparkles, ChevronRight, Network, ExternalLink } from 'lucide-react';
import ElitePlanCard from './ElitePlanCard';
import avatarJean from '../assets/avatar-jean.jpg';
import avatarMarie from '../assets/avatar-marie.jpg';
import avatarAlain from '../assets/avatar-alain.jpg';

const LAUREATS_DATA = [
  {
    name: "Priso Daniel",
    formation: "Secrétariat de Direction",
    promotion: "Promotion 2024",
    status: "Actuellement Assistant Administratif",
    avatar: avatarJean,
    socialProfileUrl: "https://www.linkedin.com/search/results/people/?keywords=Jean%20Dupont",
    text: "Guims Academy m'a permis d'acquérir des compétences pratiques directement exploitables en entreprise. L'accompagnement et les outils fournis m'ont permis d'obtenir un emploi immédiatement après ma formation.",
    rating: 5,
    bio: "Passionné par l'organisation et la gestion administrative, Jean a rejoint Guims Academy pour professionnaliser ses compétences. Rigoureux et doté d'un excellent sens relationnel, il s'est démarqué par sa maîtrise des outils collaboratifs modernes.",
    skills: ["Gestion d'agenda complexe", "Rédaction de rapports professionnels", "Outils de bureautique avancés", "Organisation d'événements d'entreprise", "Gestion de courrier électronique"],
    projects: ["Optimisation du système d'archivage numérique de Guims Group", "Création d'un guide de procédures administratives internes"],
    advice: "Soyez curieux et pratiquez tous les jours sur les ordinateurs mis à disposition. Les formateurs sont là pour vous pousser vers l'excellence."
  },
  {
    name: "Marie Songo",
    formation: "Marketing Digital",
    promotion: "Promotion 2025",
    status: "Community Manager Freelance",
    avatar: avatarMarie,
    socialProfileUrl: "https://www.linkedin.com/search/results/people/?keywords=Marie%20Songo",
    text: "Une formation intense et ultra-pratique. Les projets réels sur lesquels nous avons travaillé m'ont donné la confiance nécessaire pour me lancer à mon propre compte.",
    rating: 5,
    bio: "Marie a toujours eu la fibre créative et le goût des réseaux sociaux. Grâce à sa formation chez Guims Academy, elle a appris à canaliser cette créativité pour concevoir des campagnes digitales performantes et génératrices de résultats.",
    skills: ["Copywriting & Création de contenu", "Gestion de campagnes Ads (Meta, Google)", "SEO & Référencement naturel", "Analyse d'audience et reporting", "Graphisme basique (Canva, Photoshop)"],
    projects: ["Lancement d'une boutique e-commerce de mode locale", "Stratégie Social Media pour une startup agroalimentaire (+40% d'abonnés)"],
    advice: "N'ayez pas peur de tester et de faire des erreurs lors des ateliers. Le marketing digital s'apprend par l'expérimentation constante."
  },
  {
    name: "Alain Essomba",
    formation: "Secrétariat Comptable",
    promotion: "Promotion 2024",
    status: "Comptable junior chez Guims Group",
    avatar: avatarAlain,
    imagePosition: "72% center",
    socialProfileUrl: "https://www.linkedin.com/search/results/people/?keywords=Alain%20Kotto",
    text: "La qualité des cours et le professionnalisme des formateurs sont remarquables. Le réseau de l'école est un véritable accélérateur de carrière pour s'insérer rapidement.",
    rating: 5,
    bio: "Avec un esprit analytique fort, Alain voulait maîtriser les rouages de la comptabilité d'entreprise. Guims Academy lui a fourni les outils logiciels et la logique comptable indispensable pour être opérationnel immédiatement en entreprise.",
    skills: ["Saisie et rapprochement bancaire", "Utilisation avancée du logiciel Sage Saari", "Gestion des déclarations fiscales et sociales", "Établissement des bulletins de paie", "Analyse des bilans financiers"],
    projects: ["Audit et restructuration comptable d'une PME locale", "Automatisation des processus de facturation"],
    advice: "La comptabilité demande de la rigueur et de la concentration. Concentrez-vous sur les ateliers pratiques de Sage."
  },
  {
    name: "Sandrine Eboa",
    formation: "Secrétariat Bureautique",
    promotion: "Promotion 2025",
    status: "Secrétaire de Direction à la SCB",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    socialProfileUrl: "https://www.linkedin.com/search/results/people/?keywords=Sandrine%20Eboa",
    text: "Je recommande vivement Guims Academy. L'infrastructure est moderne et l'apprentissage est axé à 100% sur la pratique professionnelle.",
    rating: 5,
    bio: "Sandrine souhaitait effectuer une reconversion professionnelle rapide. En partant de zéro en informatique, elle a su acquérir en 3 mois l'assurance et la vitesse de travail nécessaires pour gérer un secrétariat moderne avec brio.",
    skills: ["Vitesse de saisie clavier rapide", "Mise en page de documents complexes (Word)", "Création de tableaux de bord Excel", "Gestion du courrier et accueil client", "Outils de visioconférence et cloud"],
    projects: ["Conception de supports visuels de communication d'entreprise", "Création d'une base de données clients sous Excel"],
    advice: "Même en partant de zéro, la méthode pédagogique de Guims Academy et l'accompagnement personnalisé vous permettent d'y arriver sereinement."
  }
];

const LaureatsPage = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedLaureat, setSelectedLaureat] = useState<typeof LAUREATS_DATA[0] | null>(null);

  const categories = ['All', 'Secrétariat', 'Marketing'];

  const filteredLaureats = LAUREATS_DATA.filter(laureat => {
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
                  src={selectedLaureat.avatar}
                  alt={selectedLaureat.name}
                  className="profile-large-avatar"
                  style={selectedLaureat.imagePosition ? { objectPosition: selectedLaureat.imagePosition } : undefined}
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
                <a
                  href={selectedLaureat.socialProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-social-link"
                >
                  <Network size={17} />
                  Voir le profil LinkedIn
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
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
          <a href="#" className="back-home-link">
            <ArrowLeft size={16} /> Retour à l'accueil
          </a>
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

        {filteredLaureats.length > 0 ? (
          <div className="laureats-grid-modern">
            {filteredLaureats.map((laureat, idx) => (
              <ElitePlanCard
                key={idx}
                imageUrl={laureat.avatar}
                imagePosition={laureat.imagePosition}
                title={laureat.name}
                subtitle={`${laureat.promotion} • ${laureat.formation}`}
                description={`"${laureat.text.length > 130 ? laureat.text.substring(0, 130) + '...' : laureat.text}"`}
                highlights={[laureat.status, "Vérifié ⭐"]}
                ctaText="Découvrir le profil"
                onAction={() => {
                  setSelectedLaureat(laureat);
                  window.scrollTo({ top: 0, behavior: 'instant' as any });
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