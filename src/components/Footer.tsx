import logo from '../assets/logo Guims Acadeny.jpg';
import { CONTACT_INFO } from '../constants';
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
        </div>

        <div className="footer-col-contact">
          <h4>Contact</h4>
          <ul className="footer-list contact-list">
            <li>
              <a href="tel:+237655955615">{CONTACT_INFO.phone}</a>
            </li>
            <li>
              <a href="mailto:contact@guimsacademy.com">contact@guimsacademy.com</a>
            </li>
            <li>
              <span>{CONTACT_INFO.location}</span>
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;