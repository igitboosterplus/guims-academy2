import { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [promoText, setPromoText] = useState('');
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      setIsAdminRoute(window.location.hash === '#admin');
    };
    checkAdmin();
    window.addEventListener('hashchange', checkAdmin);

    setPromoText(localStorage.getItem('promoText') || "PROMO MERCREDI : <strong>-10 000 FCFA</strong> sur toutes les formations !");

    return () => window.removeEventListener('hashchange', checkAdmin);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('promoText', promoText);
    window.dispatchEvent(new Event('promoTextUpdated'));
    setIsOpen(false);
  };

  if (!isAdminRoute) return null; // Hide completely for normal visitors

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{ 
          position: 'fixed', bottom: '20px', left: '20px', zIndex: 9999, 
          background: '#1a1a1a', color: 'white', padding: '12px', 
          borderRadius: '50%', border: 'none', cursor: 'pointer', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
        title="Ouvrir l'administration"
      >
        <Settings size={22} />
      </button>
    );
  }

  return (
    <div style={{ 
      position: 'fixed', bottom: '20px', left: '20px', zIndex: 9999, 
      background: 'white', padding: '20px', borderRadius: '12px', 
      boxShadow: '0 15px 40px rgba(0,0,0,0.2)', width: '320px', border: '1px solid rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#1a1a1a' }}>Modifier la Bannière</h3>
        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
          <X size={20} />
        </button>
      </div>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ fontSize: '0.85rem', color: '#666' }}>Texte de la promotion (Mercredi) :</label>
        <textarea 
          value={promoText} 
          onChange={(e) => setPromoText(e.target.value)}
          rows={3}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd', width: '100%', fontFamily: 'inherit', fontSize: '0.9rem', resize: 'vertical' }}
        />
        <p style={{ fontSize: '0.75rem', color: '#999', margin: '0 0 5px 0' }}>Astuce: Utilisez &lt;strong&gt;texte&lt;/strong&gt; pour mettre en gras.</p>
        <button type="submit" className="btn-primary" style={{ padding: '10px', width: '100%', borderRadius: '6px' }}>
          Appliquer les modifications
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;