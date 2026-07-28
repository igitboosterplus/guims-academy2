import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import logo from '../assets/logo Guims Acadeny.jpg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || '#');

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

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const currentHash = window.location.hash;
      // Do not auto-update homepage hashes when on a dedicated subpage
      if (['#laureats', '#clients', '#formations'].includes(currentHash)) {
        return;
      }

      const scrollPosition = window.scrollY + 220; // Offset for header height
      const aboutElement = document.getElementById('about');
      const contactElement = document.getElementById('contact');

      if (contactElement && scrollPosition >= contactElement.offsetTop) {
        setActiveHash('#contact');
      } else if (aboutElement && scrollPosition >= aboutElement.offsetTop && scrollPosition < aboutElement.offsetTop + aboutElement.offsetHeight) {
        setActiveHash('#about');
      } else {
        setActiveHash('#');
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    // Initial run to capture state on page load
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const isActive = (href: string) => {
    if (href === '#' || href === '') {
      return activeHash === '#' || activeHash === '';
    }
    return activeHash === href;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : 'transparent'} ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
      <div className="container nav-content">
        <a href="#" className="logo">
          <img
            src={logo}
            alt="Guims Academy"
            className={isScrolled ? "logo-img-small" : "logo-img"}
            style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </a>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-only">
          {NAV_LINKS.map((link) => {
            const isEtudiants = link.name === "Espace Etudiants";
            const activeClass = isActive(link.href) ? "active" : "";
            const className = isEtudiants 
              ? `nav-clients-btn ${activeClass}` 
              : activeClass;

            return (
              <a
                key={link.href}
                href={link.href}
                className={className}
              >
                {link.name}
              </a>
            );
          })}
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
            {NAV_LINKS.map((link) => {
              const isEtudiants = link.name === "Espace Etudiants";
              const activeClass = isActive(link.href) ? "active" : "";
              const className = isEtudiants 
                ? `nav-clients-btn-mobile ${activeClass}` 
                : activeClass;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={className}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;