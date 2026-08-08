import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Formation } from '../../lib/types';
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';

const emptyFormation = {
  title: '', description: '', audience: 'Particuliers' as 'Particuliers' | 'Entreprises & organisations',
  image_url: '', price: 0, duration: '', courses: [] as string[], is_active: true,
};

const ManageFormations = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Formation | null>(null);
  const [form, setForm] = useState(emptyFormation);
  const [coursesInput, setCoursesInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchFormations(); }, []);

  const fetchFormations = async () => {
    setLoading(true);
    const { data } = await supabase.from('formations').select('*').order('created_at', { ascending: false });
    setFormations((data as Formation[]) || []);
    setLoading(false);
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyFormation);
    setCoursesInput('');
    setShowModal(true);
  };

  const openEdit = (f: Formation) => {
    setEditing(f);
    setForm({ title: f.title, description: f.description, audience: f.audience, image_url: f.image_url || '', price: f.price, duration: f.duration || '', courses: f.courses, is_active: f.is_active });
    setCoursesInput(f.courses.join(', '));
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const courses = coursesInput.split(',').map(c => c.trim()).filter(Boolean);
    const payload = { ...form, courses, image_url: form.image_url || null };

    if (editing) {
      await supabase.from('formations').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('formations').insert(payload);
    }
    setSaving(false);
    setShowModal(false);
    fetchFormations();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette formation ?')) return;
    await supabase.from('formations').delete().eq('id', id);
    fetchFormations();
  };

  const toggleActive = async (f: Formation) => {
    await supabase.from('formations').update({ is_active: !f.is_active }).eq('id', f.id);
    fetchFormations();
  };

  if (loading) return <div className="admin-loading"><div className="route-loading-spinner" /></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Gestion des Formations</h1>
        <button onClick={openCreate} className="admin-btn-primary"><Plus size={18} /> Ajouter une formation</button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Audience</th>
              <th>Prix (XAF)</th>
              <th>Durée</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formations.map((f) => (
              <tr key={f.id}>
                <td><strong>{f.title}</strong></td>
                <td>{f.audience}</td>
                <td>{f.price.toLocaleString('fr-FR')}</td>
                <td>{f.duration || '—'}</td>
                <td>
                  <span className={`status-badge status-${f.is_active ? 'active' : 'inactive'}`}>
                    {f.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="admin-actions">
                  <button onClick={() => toggleActive(f)} className="admin-btn-icon" title={f.is_active ? 'Désactiver' : 'Activer'}>
                    {f.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button onClick={() => openEdit(f)} className="admin-btn-icon" title="Modifier"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(f.id)} className="admin-btn-icon danger" title="Supprimer"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {formations.length === 0 && <p className="admin-empty">Aucune formation. Cliquez sur "Ajouter" pour commencer.</p>}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editing ? 'Modifier la formation' : 'Nouvelle formation'}</h2>
              <button onClick={() => setShowModal(false)} className="admin-modal-close"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-form-group">
                <label>Titre *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Audience *</label>
                  <select value={form.audience} onChange={(e) => setForm({...form, audience: e.target.value as any})}>
                    <option value="Particuliers">Particuliers</option>
                    <option value="Entreprises & organisations">Entreprises & organisations</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Prix (XAF)</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({...form, price: Number(e.target.value)})} min={0} />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Durée</label>
                  <input type="text" value={form.duration} onChange={(e) => setForm({...form, duration: e.target.value})} placeholder="ex: 3 mois" />
                </div>
                <div className="admin-form-group">
                  <label>URL de l'image</label>
                  <input type="text" value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} placeholder="https://..." />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Cours (séparés par des virgules)</label>
                <input type="text" value={coursesInput} onChange={(e) => setCoursesInput(e.target.value)} placeholder="Cours 1, Cours 2, Cours 3" />
              </div>
              <div className="admin-form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn-secondary">Annuler</button>
                <button type="submit" className="admin-btn-primary" disabled={saving}>
                  {saving ? 'Enregistrement...' : editing ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFormations;
