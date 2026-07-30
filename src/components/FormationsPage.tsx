import { useState } from 'react';
import { Search, BookOpen, ArrowLeft } from 'lucide-react';
import { FORMATIONS } from '../constants';
import ElitePlanCard from './ElitePlanCard';

const getInitialFilter = () => {
  if (window.location.hash === '#formations-entreprises') return 'Entreprises & organisations';
  if (window.location.hash === '#formations-particuliers') return 'Particuliers';
  return 'All';
};

const FormationsPage = () => {
  const [filter, setFilter] = useState(getInitialFilter);
  const [search, setSearch] = useState('');

  const categories = ['All', 'Entreprises & organisations', 'Particuliers'];

  const filteredFormations = FORMATIONS.filter(formation => {
    const matchesCategory = filter === 'All' || formation.audience === filter;
      
    const matchesSearch = formation.title.toLowerCase().includes(search.toLowerCase()) ||
      formation.courses.some(c => c.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const audienceGroups = ['Entreprises & organisations', 'Particuliers'];

  return (
    <div className="formations-page animate-fade-in">
      <div className="formations-hero">
        <div className="container">
          <a href="#" className="back-home-link">
            <ArrowLeft size={16} /> Retour à l'accueil
          </a>
          <div className="formations-page-badge">
            <BookOpen size={20} />
            <span>Nos Programmes</span>
          </div>
          <h1>Nos Formations Certifiantes</h1>
          <p className="formations-subtitle">
            Découvrez nos programmes conçus pour développer les compétences des particuliers et accompagner la performance des entreprises et organisations.
          </p>
        </div>
      </div>

      <div className="container formations-content">
        <div className="filter-search-bar">
          <div className="filter-buttons">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'All' ? 'Toutes les formations' : cat}
              </button>
            ))}
          </div>
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Rechercher une formation, un outil..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filteredFormations.length > 0 ? (
          <div className="formations-catalog-groups">
            {audienceGroups.map((audience) => {
              const formations = filteredFormations.filter((formation) => formation.audience === audience);
              if (formations.length === 0) return null;

              return (
                <section key={audience} className="formations-catalog-group">
                  <h2>{audience}</h2>
                  <div className="formations-grid">
                    {formations.map((formation) => {
                      const whatsappMessage = `Bonjour Guims Academy ! Je suis intéressé(e) par la formation "${formation.title}" et je souhaite m'inscrire.`;
                      const whatsappUrl = `https://wa.me/237655955615?text=${encodeURIComponent(whatsappMessage)}`;

                      return (
                        <ElitePlanCard
                          key={formation.title}
                          imageUrl={formation.image}
                          title={formation.title}
                          subtitle={formation.audience}
                          description={formation.audience === 'Particuliers'
                            ? "Développez des compétences concrètes pour votre parcours professionnel et vos projets."
                            : "Renforcez les compétences de vos équipes avec un programme adapté aux enjeux de votre organisation."}
                          highlights={formation.courses}
                          ctaText="S'inscrire via WhatsApp"
                          onAction={() => window.open(whatsappUrl, '_blank')}
                        />
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="no-results">
            <p>Aucun programme ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormationsPage;