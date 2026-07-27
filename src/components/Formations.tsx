import { FORMATIONS } from '../constants';
import ElitePlanCard from './ElitePlanCard';

const Formations = () => {
  return (
    <section id="formations-preview" className="section-formations">
      <div className="container">
        <div className="section-header">
          <span className="badge">Nos Domaines</span>
          <h2 className="section-title">Domaines de Formation</h2>
          <p>Des programmes d'excellence conçus pour propulser votre carrière.</p>
        </div>
        
        <div className="formations-grid">
          {FORMATIONS.map((formation, idx) => (
            <FormationCard key={idx} {...formation} />
          ))}
        </div>
        
        <div className="formations-footer">
          <a href="#formations" className="btn-primary">Consulter le catalogue complet</a>
        </div>
      </div>
    </section>
  );
};

interface FormationCardProps {
  title: string;
  image: string;
  courses: string[];
  price: number;
}

const FormationCard = ({ title, image, courses, price }: FormationCardProps) => {
  const formatPrice = (val: number) => {
    return val.toLocaleString('fr-FR') + ' FCFA';
  };

  const whatsappMessage = `Bonjour Guims Academy ! Je viens depuis le site web et je souhaite obtenir des informations et m'inscrire à la formation "${title}" au tarif de ${formatPrice(price)}.`;
  const whatsappUrl = `https://wa.me/237655955615?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <ElitePlanCard
      imageUrl={image}
      title={title}
      subtitle={`Formation • ${formatPrice(price)}`}
      description="Développez des compétences professionnelles de haut niveau en 3 mois de pratique intensive."
      highlights={courses}
      ctaText="S'inscrire sur WhatsApp"
      onAction={() => window.open(whatsappUrl, '_blank')}
    />
  );
};

export default Formations;