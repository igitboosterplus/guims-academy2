import { TESTIMONIALS } from '../constants';
import ElitePlanCard from './ElitePlanCard';

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-testimonials">
      <div className="container">
        <div className="section-header">
          <span className="badge">Témoignages</span>
          <h2 className="section-title">Ce que disent nos apprenants</h2>
          <p>Leur réussite professionnelle est notre plus grande fierté.</p>
        </div>
        
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <ElitePlanCard
              key={idx}
              imageUrl={t.avatar}
              imagePosition={t.imagePosition}
              title={t.name}
              subtitle={t.role}
              description={`"${t.text}"`}
              highlights={["Note : 5/5 ⭐", "Alumni Certifié"]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;