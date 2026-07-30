import { CheckCircle } from 'lucide-react';
import secretariatDirectionImg from '../assets/secretariat-direction.jpg';
import marketingDigitalImg from '../assets/marketing-digital.jpg';
import secretariatComptableImg from '../assets/secretariat-comptable.jpg';

const Services = () => {
  const servicesData = [
    {
      image: secretariatDirectionImg,
      imageAlt: "Professionnels en formation",
      title: "Formations certifiantes",
      description: "Des parcours pratiques pour renforcer les compétences des particuliers et développer les équipes en entreprise.",
      bullets: [
        "Programmes adaptés aux métiers",
        "Certification valorisable",
        "Accompagnement par des experts"
      ]
    },
    {
      image: marketingDigitalImg,
      imageAlt: "Atelier de marketing digital",
      title: "Compétences pour la performance",
      description: "Des ateliers concrets pour gagner en autonomie, faire évoluer une carrière ou soutenir la transformation de votre entreprise.",
      bullets: [
        "Mises en situation réelles",
        "Outils utilisés en entreprise",
        "Résultats applicables immédiatement"
      ]
    },
    {
      image: secretariatComptableImg,
      imageAlt: "Professionnel travaillant sur des outils de gestion",
      title: "Accompagnement sur mesure",
      description: "Un suivi adapté à votre projet professionnel, à votre reconversion ou aux besoins de formation de vos collaborateurs.",
      bullets: [
        "Conseils personnalisés",
        "Formats individuels ou en équipe",
        "Passerelle vers l'emploi et les projets"
      ]
    }
  ];

  return (
    <section id="services" className="section-services">
      <div className="container">
        <div className="services-header">
          <span className="badge">Nos Engagements</span>
          <h2 className="section-title">Pourquoi Choisir Guims Academy ?</h2>
          <p>Des parcours concrets pour faire progresser les particuliers et renforcer les compétences des entreprises.</p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, idx) => (
            <article key={idx} className="service-card">
              <img className="service-card-image" src={service.image} alt={service.imageAlt} />
              <div className="service-content-wrapper">
                <h3>{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <ul className="service-bullets">
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>
                      <CheckCircle className="bullet-icon-check" size={14} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;