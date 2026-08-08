import { FORMATIONS } from '../constants';
import ElitePlanCard from './ElitePlanCard';

const Formations = () => {
  return (
    <section id="formations-preview" className="section-formations">
      <div className="container">
        <div className="section-header">
          <span className="badge">Nos Domaines</span>
          <h2 className="section-title">Domaines de Formation</h2>
          <p>Des programmes pratiques pour propulser les particuliers, accompagner les entreprises, et des parcours en ligne pour apprendre à votre rythme.</p>
        </div>
        
        <div className="formations-grid">
          {FORMATIONS.filter((formation) => formation.audience === 'Particuliers').slice(0, 4).map((formation, idx) => (
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
  audience: string;
  title: string;
  image: string;
  courses: string[];
}

const FormationCard = ({ title, image, courses }: FormationCardProps) => {
  const whatsappMessage = `Bonjour Guims Academy ! Je souhaite obtenir des informations et m'inscrire à la formation "${title}".`;
  const whatsappUrl = `https://wa.me/237655955615?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <ElitePlanCard
      imageUrl={image}
      title={title}
      subtitle="Formation certifiante"
      description="Développez des compétences immédiatement utiles pour votre carrière, votre activité ou vos équipes."
      highlights={courses}
      ctaText="S'inscrire sur WhatsApp"
      onAction={() => window.open(whatsappUrl, '_blank')}
    />
  );
};

export default Formations;