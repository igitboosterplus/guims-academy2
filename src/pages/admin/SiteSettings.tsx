import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { SiteSetting } from '../../lib/types';
import { Save, Settings } from 'lucide-react';

const DEFAULT_SETTINGS = [
  { key: 'promo_text', label: 'Texte de la bannière promotionnelle', type: 'textarea' },
  { key: 'phone', label: 'Numéro de téléphone', type: 'text' },
  { key: 'email', label: 'Email de contact', type: 'email' },
  { key: 'location', label: 'Adresse / Localisation', type: 'text' },
  { key: 'slogan', label: 'Slogan du site', type: 'text' },
  { key: 'facebook_page_id', label: 'Facebook Page ID', type: 'text' },
  { key: 'facebook_page_token', label: 'Facebook Page Access Token', type: 'password' },
];

const SiteSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase.from('site_settings').select('*');
    const map: Record<string, string> = {};
    (data as SiteSetting[] || []).forEach((s) => { map[s.key] = s.value; });
    setSettings(map);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    for (const [key, value] of Object.entries(settings)) {
      await supabase.from('site_settings').upsert({ key, value }, { onConflict: 'key' });
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="admin-loading"><div className="route-loading-spinner" /></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1><Settings size={24} /> Paramètres du Site</h1>
      </div>

      <form onSubmit={handleSave} className="admin-settings-form">
        {DEFAULT_SETTINGS.map((setting) => (
          <div key={setting.key} className="admin-form-group">
            <label>{setting.label}</label>
            {setting.type === 'textarea' ? (
              <textarea
                value={settings[setting.key] || ''}
                onChange={(e) => setSettings({ ...settings, [setting.key]: e.target.value })}
                rows={3}
              />
            ) : (
              <input
                type={setting.type}
                value={settings[setting.key] || ''}
                onChange={(e) => setSettings({ ...settings, [setting.key]: e.target.value })}
              />
            )}
          </div>
        ))}

        <div className="admin-form-actions">
          {saved && <span className="admin-success-message">✓ Paramètres sauvegardés !</span>}
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            <Save size={18} />
            {saving ? 'Enregistrement...' : 'Sauvegarder'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SiteSettings;
