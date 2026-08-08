import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, BookOpen, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatPrice } from '../lib/payment';
import type { Formation } from '../lib/types';
import ElitePlanCard from './ElitePlanCard';
import PaymentModal from './PaymentModal';

// Fallback static data for when Supabase is not configured
import { FORMATIONS as STATIC_FORMATIONS } from '../constants';

const FormationsPage = () => {
  const params = useParams();
  const initialFilter = params.filter === 'entreprises' ? 'Entreprises & organisations'
    : params.filter === 'particuliers' ? 'Particuliers'
    : 'All';

  const [filter, setFilter] = useState(initialFilter);
  const [search, setSearch] = useState('');
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentFormation, setPaymentFormation] = useState<Formation | null>(null);

  const categories = ['All', 'Entreprises & organisations', 'Particuliers'];

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('formations')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      // Fallback to static data
      setFormations(STATIC_FORMATIONS.map((f, i) => ({
        id: String(i),
        title: f.title,
        description: '',
        audience: f.audience as any,
        image_url: f.image,
        price: 0,
        duration: null,
        courses: f.courses,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })));
    } else {
      setFormations(data as Formation[]);
    }
    setLoading(false);
  };

  const filteredFormations = formations.filter(formation => {
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
          <Link to="/" className="back-home-link">
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>
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

        {loading ? (
          <div className="admin-loading"><div className="route-loading-spinner" /><p>Chargement des formations...</p></div>
        ) : filteredFormations.length > 0 ? (
          <div className="formations-catalog-groups">
            {audienceGroups.map((audience) => {
              const groupFormations = filteredFormations.filter((f) => f.audience === audience);
              if (groupFormations.length === 0) return null;

              return (
                <section key={audience} className="formations-catalog-group">
                  <h2>{audience}</h2>
                  <div className="formations-grid">
                    {groupFormations.map((formation) => {
                      const whatsappMessage = `Bonjour Guims Academy ! Je suis intéressé(e) par la formation "${formation.title}" et je souhaite m'inscrire.`;
                      const whatsappUrl = `https://wa.me/237655955615?text=${encodeURIComponent(whatsappMessage)}`;

                      return (
                        <ElitePlanCard
                          key={formation.id}
                          imageUrl={formation.image_url || ''}
                          title={formation.title}
                          subtitle={`${formation.audience}${formation.price > 0 ? ` • ${formatPrice(formation.price)}` : ''}`}
                          description={formation.description || (formation.audience === 'Particuliers'
                            ? "Développez des compétences concrètes pour votre parcours professionnel et vos projets."
                            : "Renforcez les compétences de vos équipes avec un programme adapté aux enjeux de votre organisation.")}
                          highlights={formation.courses}
                          ctaText={formation.price > 0 ? "Payer en ligne" : "S'inscrire via WhatsApp"}
                          onAction={() => {
                            if (formation.price > 0) {
                              setPaymentFormation(formation);
                            } else {
                              window.open(whatsappUrl, '_blank');
                            }
                          }}
                          secondaryAction={formation.price > 0 ? {
                            text: "S'inscrire via WhatsApp",
                            onClick: () => window.open(whatsappUrl, '_blank'),
                          } : undefined}
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

      {/* Payment Modal */}
      {paymentFormation && (
        <PaymentModal
          isOpen={!!paymentFormation}
          onClose={() => setPaymentFormation(null)}
          formation={paymentFormation}
        />
      )}
    </div>
  );
};

export default FormationsPage;