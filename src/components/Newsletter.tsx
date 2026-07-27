import { Mail, ArrowRight } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="section-newsletter">
      <div className="container">
        <div className="newsletter-box">
          <div className="newsletter-content">
            <div className="icon-wrapper">
              <Mail className="newsletter-icon" size={32} />
            </div>
            <h2>Prêt à transformer votre avenir ?</h2>
            <p>Inscrivez-vous à notre newsletter pour recevoir nos actualités, offres exclusives et dates des prochaines sessions de formation Guims Academy.</p>
          </div>
          <div className="newsletter-form-wrapper">
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <input type="email" placeholder="Votre adresse email..." required />
                <button type="submit" className="btn-primary btn-subscribe">
                  <span>S'abonner</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
            <p className="privacy-text">Nous respectons votre vie privée. Pas de spam garanti.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;