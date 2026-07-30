import logo from '../assets/logo Guims Acadeny.jpg';
import { NAV_LINKS, FORMATIONS } from '../constants';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-premium" id="contact">
      <div className="container footer-grid-container">
        <div className="footer-col-brand">
          <img src={logo} alt="Guims Academy" className="footer-logo" />
          <p className="footer-brand-desc">
            Guims Academy accompagne particuliers et entreprises avec des programmes pratiques pour développer les compétences d'aujourd'hui et de demain.
          </p>
          <div className="footer-brand-meta">
            <span>Guims Academy fait partie de <strong>Guims Group</strong>.</span>
          </div>
        </div>

        <div className="footer-col-links">
          <h4>Navigation</h4>
          <ul className="footer-list">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-col-courses">
          <h4>Formations</h4>
          <ul className="footer-list">
            {FORMATIONS.map((f, i) => (
              <li key={i}>
                <a href="#formations">{f.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col-contact">
          <h4>Contact & Accès</h4>
          <ul className="footer-list contact-list">
            <li>
              <span className="contact-label">Email :</span>
              <a href="mailto:contact@guimsacademy.com">contacts@guimsacademy.com</a>
            </li>
            <li>
              <span className="contact-label">Téléphone :</span>
              <a href="tel:+237657293923">+237 657 293 923</a> - <a href="tel:+237696299916">+237 696 299 916</a>
            </li>
            <li>
              <span className="contact-label">Localisation :</span>
              <span>Ndogbong Carrefour Conquête, Douala, Cameroun</span>
            </li>
            <li>
              <span className="contact-label">Horaires :</span>
              <span>Lun - Ven : 8h00 - 18h00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="footer-premium-divider" />
        <div className="footer-premium-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} Guims Academy. Tous droits réservés.</p>
          <div className="footer-socials">
            <a href="https://wa.me/237655955615" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <span className="social-sep">|</span>
            <a href="#contact">Contact Direct</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;