import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Formations from './components/Formations';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import PromotionBanner from './components/PromotionBanner';
import LaureatsPage from './components/LaureatsPage';
import ClientsPage from './components/ClientsPage';
import FormationsPage from './components/FormationsPage';
import './App.css';

function App() {
  const [view, setView] = useState<'home' | 'laureats' | 'clients' | 'formations'>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#laureats') {
        setView('laureats');
        window.scrollTo({ top: 0, behavior: 'instant' as any });
      } else if (hash === '#clients') {
        setView('clients');
        window.scrollTo({ top: 0, behavior: 'instant' as any });
      } else if (hash === '#formations') {
        setView('formations');
        window.scrollTo({ top: 0, behavior: 'instant' as any });
      } else {
        setView('home');
        // If hash refers to a section, let's scroll to it after rendering home
        if (hash && hash !== '#') {
          setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };

    handleHashChange(); // Run on initial load
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="header-wrapper">
        <PromotionBanner />
        <Header />
      </div>
      
      {view === 'laureats' && <LaureatsPage />}
      {view === 'clients' && <ClientsPage />}
      {view === 'formations' && <FormationsPage />}
      
      {view === 'home' && (
        <>
          <Hero />
          <main>
            <About />
            <Formations />
            <Services />
            <Testimonials />
            <Newsletter />
          </main>
        </>
      )}
      
      <Footer />
    </div>
  );
}

export default App;