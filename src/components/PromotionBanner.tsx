import { useState, useEffect } from 'react';
import { Calendar, Sparkles, Award, ShieldCheck } from 'lucide-react';
import { nextIntakeLong } from '../constants';

const PromotionBanner = () => {
  const [isWednesday, setIsWednesday] = useState(false);

  useEffect(() => {
    const today = new Date();
    setIsWednesday(today.getDay() === 3); // 3 = Mercredi
  }, []);

  const content = (
    <>
      <div className="promo-item">
        <Calendar size={14} className="promo-icon" />
        <span>Prochaine rentrée : <strong>{nextIntakeLong}</strong></span>
      </div>
      <span className="promo-bullet">•</span>
      <div className="promo-item highlight">
        <Award size={14} className="promo-icon" />
        <span>Diplômes certifiés par l'État </span>
      </div>
      <span className="promo-bullet">•</span>
      <div className="promo-item">
        <ShieldCheck size={14} className="promo-icon" />
        <span>Inscriptions ouvertes — <strong>Places limitées</strong> !</span>
      </div>
      <span className="promo-bullet">•</span>
      {isWednesday && (
        <>
          <div className="promo-item highlight">
            <Sparkles size={14} className="promo-icon" style={{ color: '#ffcc00' }} />
            <span>PROMO MERCREDI : <strong>-5 000 FCFA</strong> sur votre Inscriptions !</span>
          </div>
          <span className="promo-bullet">•</span>
        </>
      )}
    </>
  );

  return (
    <div className="promo-banner">
      <div className="promo-marquee-container">
        <div className="promo-marquee-track">
          <div className="promo-marquee-content">
            {content}
            {content}
          </div>
          <div className="promo-marquee-content" aria-hidden="true">
            {content}
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;