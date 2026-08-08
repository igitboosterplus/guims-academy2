import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Schedule, Formation } from '../../lib/types';
import { Plus, Trash2, X } from 'lucide-react';

const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const ManageSchedules = () => {
  const [schedules, setSchedules] = useState<(Schedule & { formation?: Formation })[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ formation_id: '', day_of_week: 1, start_time: '08:00', end_time: '10:00', room: '', subject: '', teacher_name: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: schedData }, { data: formData }] = await Promise.all([
      supabase.from('schedules').select('*, formation:formations(*)').order('day_of_week').order('start_time'),
      supabase.from('formations').select('*').eq('is_active', true).order('title'),
    ]);
    setSchedules((schedData as any[]) || []);
    setFormations((formData as Formation[]) || []);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from('schedules').insert({ ...form, room: form.room || null, teacher_name: form.teacher_name || null });
    setSaving(false);
    setShowModal(false);
    setForm({ formation_id: '', day_of_week: 1, start_time: '08:00', end_time: '10:00', room: '', subject: '', teacher_name: '' });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce créneau ?')) return;
    await supabase.from('schedules').delete().eq('id', id);
    fetchData();
  };

  if (loading) return <div className="admin-loading"><div className="route-loading-spinner" /></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Emplois du Temps</h1>
        <button onClick={() => setShowModal(true)} className="admin-btn-primary"><Plus size={18} /> Ajouter un créneau</button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>Formation</th><th>Jour</th><th>Horaires</th><th>Matière</th><th>Salle</th><th>Formateur</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {schedules.map((s) => (
              <tr key={s.id}>
                <td>{(s.formation as any)?.title || '—'}</td>
                <td>{DAYS[s.day_of_week]}</td>
                <td>{s.start_time} — {s.end_time}</td>
                <td>{s.subject}</td>
                <td>{s.room || '—'}</td>
                <td>{s.teacher_name || '—'}</td>
                <td className="admin-actions">
                  <button onClick={() => handleDelete(s.id)} className="admin-btn-icon danger"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {schedules.length === 0 && <p className="admin-empty">Aucun créneau défini.</p>}
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Nouveau Créneau</h2>
              <button onClick={() => setShowModal(false)} className="admin-modal-close"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-form-group">
                <label>Formation *</label>
                <select value={form.formation_id} onChange={(e) => setForm({...form, formation_id: e.target.value})} required>
                  <option value="">Sélectionner...</option>
                  {formations.map((f) => <option key={f.id} value={f.id}>{f.title}</option>)}
                </select>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Jour *</label>
                  <select value={form.day_of_week} onChange={(e) => setForm({...form, day_of_week: Number(e.target.value)})}>
                    {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Matière *</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} required />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Heure de début</label><input type="time" value={form.start_time} onChange={(e) => setForm({...form, start_time: e.target.value})} /></div>
                <div className="admin-form-group"><label>Heure de fin</label><input type="time" value={form.end_time} onChange={(e) => setForm({...form, end_time: e.target.value})} /></div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Salle</label><input type="text" value={form.room} onChange={(e) => setForm({...form, room: e.target.value})} /></div>
                <div className="admin-form-group"><label>Formateur</label><input type="text" value={form.teacher_name} onChange={(e) => setForm({...form, teacher_name: e.target.value})} /></div>
              </div>
              <div className="admin-form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn-secondary">Annuler</button>
                <button type="submit" className="admin-btn-primary" disabled={saving}>{saving ? 'Enregistrement...' : 'Ajouter'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSchedules;
