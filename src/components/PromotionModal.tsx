import { X, MessageCircle, Gift } from 'lucide-react';
import { FORMATIONS } from '../constants';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromotionModal = ({ isOpen, onClose }: PromotionModalProps) => {
  if (!isOpen) return null;

  const formatPrice = (val: number) => {
    return val.toLocaleString('fr-FR') + ' FCFA';
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content promo-modal animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          <X size={24} />
        </button>
        
        <div className="promo-modal-header">
          <div className="promo-modal-icon-wrapper">
            <Gift className="promo-modal-icon" size={32} />
          </div>
          <h2>Promotion Spéciale du Mercredi</h2>
          <p>
            Chaque mercredi, bénéficiez d'une réduction exceptionnelle de <strong>-10 000 FCFA</strong> sur toutes nos formations !
          </p>
        </div>

        <div className="promo-courses-list">
          {FORMATIONS.map((formation, idx) => {
            const promoPrice = formation.price - 10000;
            const whatsappMessage = `Bonjour Guims Academy ! Je viens depuis le site web et je souhaite m'inscrire à la formation "${formation.title}" en profitant de la promotion du mercredi de ${formatPrice(promoPrice)} (au lieu de ${formatPrice(formation.price)}).`;
            const whatsappUrl = `https://wa.me/237655955615?text=${encodeURIComponent(whatsappMessage)}`;

            return (
              <div key={idx} className="promo-course-row">
                <div className="promo-course-img">
                  <img src={formation.image} alt={formation.title} />
                </div>
                <div className="promo-course-info">
                  <h3>{formation.title}</h3>
                  <div className="promo-course-pricing">
                    <span className="promo-original-price">{formatPrice(formation.price)}</span>
                    <span className="promo-discounted-price">{formatPrice(promoPrice)}</span>
                  </div>
                </div>
                <div className="promo-course-action">
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-whatsapp-promo"
                  >
                    <MessageCircle size={16} />
                    Profiter de l'offre
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="promo-modal-footer">
          <p>* Cette offre est exclusivement réservée aux inscriptions initiées ou validées un mercredi.</p>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;