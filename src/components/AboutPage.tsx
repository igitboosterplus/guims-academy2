import { Award, BookOpen, Users, Target, ArrowLeft } from 'lucide-react';
import guimsImage from '../assets/hero.png';
import './about-page.css';

const AboutPage = () => {
  return (
    <div className="about-page animate-fade-in">
      <div className="about-page-hero">
        <div className="container">
          <a href="#" className="back-home-link">
            <ArrowLeft size={16} /> Retour à l'accueil
          </a>
          <h1>À propos de Guims Academy</h1>
          <p className="about-page-subtitle">
            Découvrez notre histoire, notre mission et nos valeurs.
          </p>
        </div>
      </div>

      <div className="container about-page-content">
        {/* Mission Section */}
        <section className="about-section">
          <div className="about-section-grid">
            <div className="about-section-text">
              <h2>Notre Mission</h2>
              <p>
                Guims Academy accompagne particuliers et entreprises avec des programmes pratiques et innovants pour développer les compétences d'aujourd'hui et de demain.
              </p>
              <p>
                Nous croyons en la puissance de l'éducation pour transformer les vies et créer des opportunités durables en Afrique.
              </p>
            </div>
            <div className="about-section-visual">
              <div className="about-icon-box">
                <Target size={48} />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-section">
          <h2 className="about-section-title">Nos Valeurs</h2>
          <div className="about-values-grid">
            <div className="value-card">
              <BookOpen size={32} />
              <h3>Excellence</h3>
              <p>
                Nous nous engageons à fournir une éducation de qualité supérieure adaptée aux besoins du marché.
              </p>
            </div>
            <div className="value-card">
              <Users size={32} />
              <h3>Inclusivité</h3>
              <p>
                Nous croyons que tout le monde mérite accès à une formation de qualité, peu importe son parcours.
              </p>
            </div>
            <div className="value-card">
              <Award size={32} />
              <h3>Pratique</h3>
              <p>
                Nos programmes sont ancrés dans la réalité du terrain avec des projets concrets et applicables.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-section">
          <div className="about-section-grid reverse">
            <div className="about-section-visual">
              <img src={guimsImage} alt="Guims Academy" className="about-section-image" />
            </div>
            <div className="about-section-text">
              <h2>Notre Histoire</h2>
              <p>
                Fondée avec la conviction que l'Afrique a besoin de talents exceptionnels et bien formés, Guims Academy est devenue un centre de référence pour la formation professionnelle en Afrique centrale.
              </p>
              <p>
                Aujourd'hui, nous accompagnons des centaines de particuliers et dizaines d'organisations dans leur transformation digitale et développement de compétences.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="about-stats-section">
          <h2 className="about-section-title">Nos Chiffres</h2>
          <div className="about-stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Apprenants formés</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">20+</div>
              <div className="stat-label">Formations disponibles</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Entreprises partenaires</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Taux de satisfaction</div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="about-section">
          <h2 className="about-section-title">Pourquoi Choisir Guims Academy ?</h2>
          <div className="about-features-list">
            <div className="feature-item">
              <span className="feature-number">1</span>
              <div>
                <h3>Programmes certifiants</h3>
                <p>Formations reconnues internationalement avec certifications professionnelles.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-number">2</span>
              <div>
                <h3>Instructeurs experts</h3>
                <p>Formateurs avec une expérience réelle du terrain et expertise confirmée.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-number">3</span>
              <div>
                <h3>Apprentissage pratique</h3>
                <p>Cas d'usage réels et projets concrets pour une application immédiate.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-number">4</span>
              <div>
                <h3>Insertion professionnelle</h3>
                <p>Mise en relation directe avec notre réseau d'entreprises partenaires.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta-section">
          <h2>Prêt à développer vos compétences ?</h2>
          <p>Découvrez nos formations et rejoignez la communauté Guims Academy.</p>
          <div className="about-cta-buttons">
            <a href="#formations" className="about-cta-primary">
              Voir nos formations
            </a>
            <a href="#contact" className="about-cta-secondary">
              Nous contacter
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
