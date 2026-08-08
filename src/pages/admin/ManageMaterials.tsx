import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { CourseMaterial, Formation } from '../../lib/types';
import { Plus, Trash2, X, FileText } from 'lucide-react';

const ManageMaterials = () => {
  const [materials, setMaterials] = useState<(CourseMaterial & { formation?: Formation })[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ formation_id: '', title: '', description: '', file_url: '', type: 'pdf', module_name: '', order_index: 0 });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: matsData }, { data: formData }] = await Promise.all([
      supabase.from('course_materials').select('*, formation:formations(*)').order('order_index'),
      supabase.from('formations').select('*').eq('is_active', true).order('title'),
    ]);
    setMaterials((matsData as any[]) || []);
    setFormations((formData as Formation[]) || []);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from('course_materials').insert({
      ...form,
      description: form.description || null,
      module_name: form.module_name || null,
    });
    setSaving(false);
    setShowModal(false);
    setForm({ formation_id: '', title: '', description: '', file_url: '', type: 'pdf', module_name: '', order_index: 0 });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce support ?')) return;
    await supabase.from('course_materials').delete().eq('id', id);
    fetchData();
  };

  if (loading) return <div className="admin-loading"><div className="route-loading-spinner" /></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Supports de Cours</h1>
        <button onClick={() => setShowModal(true)} className="admin-btn-primary"><Plus size={18} /> Ajouter un support</button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>Titre</th><th>Formation</th><th>Module</th><th>Type</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {materials.map((m) => (
              <tr key={m.id}>
                <td><FileText size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />{m.title}</td>
                <td>{(m.formation as any)?.title || '—'}</td>
                <td>{m.module_name || '—'}</td>
                <td><span className="admin-badge">{m.type.toUpperCase()}</span></td>
                <td className="admin-actions">
                  <button onClick={() => handleDelete(m.id)} className="admin-btn-icon danger"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {materials.length === 0 && <p className="admin-empty">Aucun support de cours ajouté.</p>}
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Nouveau Support de Cours</h2>
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
              <div className="admin-form-group">
                <label>Titre *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Type</label>
                  <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
                    <option value="pdf">PDF</option>
                    <option value="video">Vidéo</option>
                    <option value="exercise">Exercice</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Module</label>
                  <input type="text" value={form.module_name} onChange={(e) => setForm({...form, module_name: e.target.value})} placeholder="ex: Module 1 - Introduction" />
                </div>
              </div>
              <div className="admin-form-group">
                <label>URL du fichier *</label>
                <input type="url" value={form.file_url} onChange={(e) => setForm({...form, file_url: e.target.value})} required placeholder="https://..." />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={2} />
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

export default ManageMaterials;
