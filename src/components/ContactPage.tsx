import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CONTACT_INFO } from '../constants';
import './contact-page.css';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const { error: dbError } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      is_read: false,
    });

    if (dbError) {
      setError('Une erreur est survenue. Veuillez réessayer ou nous contacter par WhatsApp.');
      setSubmitting(false);
    } else {
      setSubmitted(true);
      setSubmitting(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="contact-page animate-fade-in">
      <div className="contact-hero">
        <div className="container">
          <Link to="/" className="back-home-link">
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>
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
                contacts@guimsacademy.com
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

          {submitted ? (
            <div className="contact-success">
              <CheckCircle size={48} />
              <h3>Message envoyé !</h3>
              <p>Votre message a bien été reçu. Nous vous répondrons dans les plus brefs délais.</p>
              <button onClick={() => setSubmitted(false)} className="contact-submit-btn" style={{ marginTop: '1rem' }}>
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {error && <div className="alert-message error"><span>{error}</span></div>}
              <div className="form-group">
                <label htmlFor="name">Nom complet</label>
                <input type="text" id="name" name="name" placeholder="Votre nom" required
                  value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="votre.email@exemple.com" required
                  value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input type="text" id="subject" name="subject" placeholder="Sujet de votre demande" required
                  value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Décrivez votre demande..." rows={6} required
                  value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} />
              </div>
              <button type="submit" className="contact-submit-btn" disabled={submitting}>
                {submitting ? <><Loader2 size={18} className="spin" /> Envoi en cours...</> : 'Envoyer le message'}
              </button>
            </form>
          )}
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
