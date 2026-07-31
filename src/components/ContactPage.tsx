import { Mail, Phone, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import './contact-page.css';

const ContactPage = () => {
  return (
    <div className="contact-page animate-fade-in">
      <div className="contact-hero">
        <div className="container">
          <a href="#" className="back-home-link">
            <ArrowLeft size={16} /> Retour à l'accueil
          </a>
          <h1>Nous Contacter</h1>
          <p className="contact-subtitle">
            Vous avez une question ? Nous sommes là pour vous répondre.
          </p>
        </div>
      </div>

      <div className="container contact-content">
        <div className="contact-info-grid">
          <div className="contact-card">
            <Phone size={32} className="contact-icon" />
            <h3>Téléphone</h3>
            <p>
              <a href="tel:+237655955615">+237 655 955 615</a>
            </p>
            <p className="contact-meta">Réponse rapide</p>
          </div>

          <div className="contact-card">
            <Mail size={32} className="contact-icon" />
            <h3>Email</h3>
            <p>
              <a href="mailto:contact@guimsacademy.com">
                contact@guimsacademy.com
              </a>
            </p>
            <p className="contact-meta">Envoyez-nous un email</p>
          </div>

          <div className="contact-card">
            <MapPin size={32} className="contact-icon" />
            <h3>Localisation</h3>
            <p>{CONTACT_INFO.location}</p>
            <p className="contact-meta">Ndogbong, Douala, Cameroun</p>
          </div>

          <div className="contact-card">
            <Clock size={32} className="contact-icon" />
            <h3>Horaires</h3>
            <p>Lun - Ven : 8h00 - 18h00</p>
            <p className="contact-meta">Heure locale</p>
          </div>
        </div>

        <div className="contact-section">
          <h2>Envoyez-nous un message</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nom complet</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Votre nom"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="votre.email@exemple.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Sujet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Sujet de votre demande"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Décrivez votre demande..."
                rows={6}
                required
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              Envoyer le message
            </button>
          </form>
        </div>

        <div className="contact-cta">
          <h2>Vous préférez WhatsApp ?</h2>
          <p>Contactez-nous directement via WhatsApp pour une réponse immédiate.</p>
          <a
            href="https://wa.me/237655955615"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-whatsapp-btn"
          >
            Ouvrir WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
