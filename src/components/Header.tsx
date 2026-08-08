import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo Guims Acadeny.png';

const NAV_ITEMS = [
  { name: "Accueil", to: "/" },
  { name: "Nos Formations", to: "/formations" },
  { name: "Nos Lauréats", to: "/laureats" },
  { name: "Actualités", to: "/actualites" },
  { name: "À propos", to: "/a-propos" },
  { name: "Contact", to: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, role } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : 'transparent'} ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo">
          <img
            src={logo}
            alt="Guims Academy"
            className={isScrolled ? "logo-img-small" : "logo-img"}
            style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-only">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => isActive ? 'active' : ''}
              end={item.to === '/'}
            >
              {item.name}
            </NavLink>
          ))}

          {/* Auth-dependent button */}
          {user ? (
            <Link
              to={role === 'admin' ? '/admin' : '/espace-apprenant/dashboard'}
              className="nav-clients-btn"
            >
              <UserIcon size={16} />
              {role === 'admin' ? 'Admin' : 'Mon Espace'}
            </Link>
          ) : (
            <Link to="/connexion" className="nav-clients-btn">
              <LogIn size={16} />
              Espace Apprenants
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => isActive ? 'active' : ''}
                end={item.to === '/'}
              >
                {item.name}
              </NavLink>
            ))}

            {user ? (
              <Link
                to={role === 'admin' ? '/admin' : '/espace-apprenant/dashboard'}
                className="nav-clients-btn-mobile"
              >
                <UserIcon size={16} />
                {role === 'admin' ? 'Admin' : 'Mon Espace'}
              </Link>
            ) : (
              <Link to="/connexion" className="nav-clients-btn-mobile">
                <LogIn size={16} />
                Espace Apprenants
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;