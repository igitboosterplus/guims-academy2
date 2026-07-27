import { Gift, ArrowLeft, CheckCircle } from 'lucide-react';
import { FORMATIONS } from '../constants';
import ElitePlanCard from './ElitePlanCard';

const PromotionPage = () => {
  const today = new Date();
  const isWednesday = today.getDay() === 3;

  if (!isWednesday) {
    return (
      <div className="promo-page-container animate-fade-in" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
        <Gift size={48} style={{ color: 'var(--primary)', marginBottom: '1.5rem' }} />
        <h2 style={{ marginBottom: '1rem' }}>La promotion n'est pas disponible aujourd'hui</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Nos offres promotionnelles sont exclusivement disponibles le <strong>mercredi</strong>. Revenez mercredi pour en profiter !
        </p>
        <a href="#" className="btn-primary">Retour à l'accueil</a>
      </div>
    );
  }

  const formatPrice = (val: number) => {
    return val.toLocaleString('fr-FR') + ' FCFA';
  };

  return (
    <div className="promo-page-container animate-fade-in">
      <div className="promo-page-hero">
        <div className="container">
          <a href="#" className="back-home-link">
            <ArrowLeft size={16} /> Retour à l'accueil
          </a>
          
          <div className="promo-badge-large">
            <Gift size={20} />
            <span>Offre Exclusive</span>
          </div>
          
          <h1>La Promotion du Mercredi</h1>
          <p className="promo-hero-subtitle">
            Tous les mercredis, profitez d'une remise exceptionnelle de <strong>-10 000 FCFA</strong> sur l'ensemble de nos formations d'excellence.
          </p>

          <div className="promo-features-grid">
            <div className="promo-feat-item">
              <CheckCircle size={18} className="feat-icon" />
              <span>Réduction immédiate de 10 000 F</span>
            </div>
            <div className="promo-feat-item">
              <CheckCircle size={18} className="feat-icon" />
              <span>Accompagnement personnalisé toujours inclus</span>
            </div>
            <div className="promo-feat-item">
              <CheckCircle size={18} className="feat-icon" />
              <span>Accès au réseau d'emploi Guims Group</span>
            </div>
          </div>
        </div>
      </div>

      <div className="promo-page-content container">
        <h2 className="promo-section-title">Choisissez votre formation en Promotion</h2>
        <p className="promo-section-desc">Cliquez sur la formation de votre choix pour initier votre inscription sur WhatsApp au tarif réduit.</p>
        
        <div className="promo-grid-view">
          {FORMATIONS.map((formation, idx) => {
            const promoPrice = formation.price - 10000;
            const whatsappMessage = `Bonjour Guims Academy ! Je viens depuis la page promotion du site web et je souhaite m'inscrire à la formation "${formation.title}" au tarif réduit du mercredi de ${formatPrice(promoPrice)} (au lieu de ${formatPrice(formation.price)}).`;
            const whatsappUrl = `https://wa.me/237655955615?text=${encodeURIComponent(whatsappMessage)}`;

            return (
              <ElitePlanCard
                key={idx}
                imageUrl={formation.image}
                title={formation.title}
                subtitle={`PROMO • ${formatPrice(promoPrice)} (au lieu de ${formatPrice(formation.price)})`}
                description="Bénéficiez d'une réduction exclusive de -10 000 FCFA sur cette formation certifiante."
                highlights={formation.courses}
                ctaText="Profiter de l'offre"
                onAction={() => window.open(whatsappUrl, '_blank')}
              />
            );
          })}
        </div>
      </div>

      <div className="promo-page-terms container">
        <div className="terms-box">
          <h4>Conditions d'éligibilité :</h4>
          <p>La promotion de -10 000 FCFA est appliquée pour toutes les inscriptions enregistrées le mercredi. L'accompagnement personnalisé et l'accès au réseau d'emploi Guims Group sont entièrement maintenus avec l'offre promotionnelle.</p>
        </div>
      </div>
    </div>
  );
};

export default PromotionPage;