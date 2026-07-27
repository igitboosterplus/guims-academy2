import { Award, Network, Compass, CheckCircle } from 'lucide-react';

const Services = () => {
  const servicesData = [
    {
      icon: <Award className="service-icon-svg" size={26} />,
      title: "Certifications Internationales",
      description: "Nos formations préparent aux certifications les plus reconnues sur le marché mondial pour garantir vos compétences.",
      bullets: [
        "Reconnaissance globale en entreprise",
        "Préparation rigoureuse aux standards internationaux",
        "Valorisation immédiate de votre profil"
      ]
    },
    {
      icon: <Network className="service-icon-svg" size={26} />,
      title: "Réseau & Offres d'Emploi",
      description: "Guims Academy met à votre disposition des canaux et groupes de diffusion exclusifs publiant régulièrement des opportunités.",
      bullets: [
        "Accès aux groupes dédiés de partage d'offres",
        "Opportunités régulières de stage et d'emploi",
        "Mise en relation directe avec les entreprises"
      ]
    },
    {
      icon: <Compass className="service-icon-svg" size={26} />,
      title: "Coaching d'Insertion Directe",
      description: "Nous assurons votre insertion par des modules intensifs de préparation à la vie active.",
      bullets: [
        "Ateliers pratiques de CV de haut niveau",
        "Simulations réelles d'entretiens",
        "Conseils de création de projet (auto-emploi)"
      ]
    }
  ];

  return (
    <section id="services" className="section-services">
      <div className="container">
        <div className="services-header">
          <span className="badge">Nos Engagements</span>
          <h2 className="section-title">Pourquoi Choisir Guims Academy ?</h2>
          <p>Un encadrement d'excellence et des garanties concrètes pour propulser votre réussite professionnelle.</p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, idx) => (
            <div key={idx} className="card service-card">
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;