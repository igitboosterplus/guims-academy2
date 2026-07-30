import { useState } from 'react';
import { Lock, Mail, ArrowRight, ArrowLeft, Shield, Clock, BookOpen, Download } from 'lucide-react';

const ClientsPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("Identifiants incorrects ou compte non encore activé. Veuillez contacter le secrétariat administratif.");
    }, 1500);
  };

  return (
    <div className="clients-page animate-fade-in">
      <div className="laureats-hero">
        <div className="container">
          <a href="#" className="back-home-link">
            <ArrowLeft size={16} /> Retour à l'accueil
          </a>
          <div className="laureats-badge">
            <Lock size={20} />
            <span>Portail Sécurisé</span>
          </div>
          <h1>Espace Clients & Apprenants</h1>
          <p className="laureats-subtitle">
            Un accès dédié aux particuliers et aux collaborateurs en formation pour suivre les parcours, consulter les calendriers et télécharger les documents utiles.
          </p>
        </div>
      </div>

      <div className="container clients-content">
        <div className="clients-grid-layout">
          {/* Login Form */}
          <div className="login-box card">
            <h2>Connexion Portail</h2>
            <p className="login-subtitle">Entrez vos identifiants fournis lors de votre inscription.</p>
            
            {message && (
              <div className="alert-message error">
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="login-input-group">
                <label>Adresse e-mail de formation :</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="ex: jean.dupont@guimsacademy.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="login-input-group">
                <label>Mot de passe / Code d'accès :</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary login-btn" disabled={loading}>
                {loading ? "Connexion en cours..." : "Accéder à mon espace"} <ArrowRight size={18} />
              </button>
            </form>
            
            <div className="login-footer-info">
              <p>Mot de passe oublié ? Contactez le support technique de l'académie.</p>
            </div>
          </div>

          {/* Features Column */}
          <div className="portal-features-column">
            <h2>Que permet votre espace apprenant ?</h2>
            <p className="features-desc">Un portail numérique pour accompagner chaque parcours individuel ou parcours de formation en entreprise.</p>

            <div className="feature-item-row">
              <div className="feature-icon-circle">
                <BookOpen size={20} />
              </div>
              <div className="feature-text-block">
                <h3>Supports de Cours & Exercices</h3>
                <p>Retrouvez l'intégralité des modules théoriques, les supports PDF de vos formateurs et les exercices pratiques hebdomadaires.</p>
              </div>
            </div>

            <div className="feature-item-row">
              <div className="feature-icon-circle">
                <Clock size={20} />
              </div>
              <div className="feature-text-block">
                <h3>Emplois du temps & Calendriers</h3>
                <p>Consultez en temps réel les horaires de vos cours physiques ou en ligne, les dates d'examens et les projets de fin de module.</p>
              </div>
            </div>

            <div className="feature-item-row">
              <div className="feature-icon-circle">
                <Download size={20} />
              </div>
              <div className="feature-text-block">
                <h3>Documents administratifs</h3>
                <p>Téléchargez vos attestations d'inscription, vos bulletins de notes, et suivez la validation de vos dossiers d'examens officiels MINEFOP.</p>
              </div>
            </div>

            <div className="feature-item-row">
              <div className="feature-icon-circle">
                <Shield size={20} />
              </div>
              <div className="feature-text-block">
                <h3>Sécurité et Confidentialité</h3>
                <p>Vos données scolaires et personnelles sont sécurisées conformément aux normes de protection des données en vigueur.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;