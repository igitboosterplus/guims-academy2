import { useState } from 'react';
import { Search, BookOpen, ArrowLeft } from 'lucide-react';
import { FORMATIONS } from '../constants';
import ElitePlanCard from './ElitePlanCard';

const FormationsPage = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Secrétariat', 'Marketing'];

  const filteredFormations = FORMATIONS.filter(formation => {
    const matchesCategory = filter === 'All' || 
      (filter === 'Secrétariat' && formation.title.includes('Secrétariat')) ||
      (filter === 'Marketing' && formation.title.includes('Marketing'));
      
    const matchesSearch = formation.title.toLowerCase().includes(search.toLowerCase()) ||
      formation.courses.some(c => c.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const formatPrice = (val: number) => {
    return val.toLocaleString('fr-FR') + ' FCFA';
  };

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
            Découvrez nos formations professionnelles intensives, conçues par des experts pour vous donner des compétences pratiques immédiatement applicables sur le marché du travail.
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
          <div className="formations-grid">
            {filteredFormations.map((formation, idx) => {
              const whatsappMessage = `Bonjour Guims Academy ! Je suis intéressé(e) par la formation "${formation.title}" et je souhaite m'inscrire.`;
              const whatsappUrl = `https://wa.me/237655955615?text=${encodeURIComponent(whatsappMessage)}`;

              return (
                <ElitePlanCard
                  key={idx}
                  imageUrl={formation.image}
                  title={formation.title}
                  subtitle={`Formation • ${formatPrice(formation.price)}`}
                  description="Développez des compétences professionnelles de haut niveau en 3 mois de pratique intensive."
                  highlights={formation.courses}
                  ctaText="S'inscrire via WhatsApp"
                  onAction={() => window.open(whatsappUrl, '_blank')}
                />
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