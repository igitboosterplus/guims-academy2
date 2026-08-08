import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-premium">
      <div className="container footer-grid-container">
        <div className="footer-col-brand">
          <h4>Guims Academy</h4>
          <p className="footer-brand-desc">{CONTACT_INFO.slogan}</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <ul className="footer-list">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/formations">Formations</Link></li>
            <li><Link to="/laureats">Lauréats</Link></li>
            <li><Link to="/actualites">Actualités</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="footer-list contact-list">
            <li><span>{CONTACT_INFO.phone}</span></li>
            <li><span>{CONTACT_INFO.email}</span></li>
            <li><span>{CONTACT_INFO.location}</span></li>
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="footer-premium-divider"></div>
        <div className="footer-premium-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} Guims Academy. Tous droits réservés.</p>
          <div className="footer-socials">
            {/* Social links can go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;