import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Grade, Profile, Formation } from '../../lib/types';
import { Plus, Trash2, X } from 'lucide-react';

const ManageGrades = () => {
  const [grades, setGrades] = useState<(Grade & { student?: Profile; formation?: Formation })[]>([]);
  const [students, setStudents] = useState<Profile[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ student_id: '', formation_id: '', module: '', grade: 0, max_grade: 20, comment: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: gradesData }, { data: studentsData }, { data: formationsData }] = await Promise.all([
      supabase.from('grades').select('*, student:profiles(*), formation:formations(*)').order('graded_at', { ascending: false }),
      supabase.from('profiles').select('*').eq('role', 'student').order('full_name'),
      supabase.from('formations').select('*').eq('is_active', true).order('title'),
    ]);
    setGrades((gradesData as any[]) || []);
    setStudents((studentsData as Profile[]) || []);
    setFormations((formationsData as Formation[]) || []);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from('grades').insert({ ...form, graded_at: new Date().toISOString(), comment: form.comment || null });
    setSaving(false);
    setShowModal(false);
    setForm({ student_id: '', formation_id: '', module: '', grade: 0, max_grade: 20, comment: '' });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette note ?')) return;
    await supabase.from('grades').delete().eq('id', id);
    fetchData();
  };

  if (loading) return <div className="admin-loading"><div className="route-loading-spinner" /></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Gestion des Notes</h1>
        <button onClick={() => setShowModal(true)} className="admin-btn-primary"><Plus size={18} /> Saisir une note</button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>Étudiant</th><th>Formation</th><th>Module</th><th>Note</th><th>Commentaire</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {grades.map((g) => (
              <tr key={g.id}>
                <td>{(g.student as any)?.full_name || '—'}</td>
                <td>{(g.formation as any)?.title || '—'}</td>
                <td>{g.module}</td>
                <td className={g.grade >= (g.max_grade / 2) ? 'grade-pass' : 'grade-fail'}>{g.grade}/{g.max_grade}</td>
                <td>{g.comment || '—'}</td>
                <td>{new Date(g.graded_at).toLocaleDateString('fr-FR')}</td>
                <td className="admin-actions">
                  <button onClick={() => handleDelete(g.id)} className="admin-btn-icon danger"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {grades.length === 0 && <p className="admin-empty">Aucune note enregistrée.</p>}
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Saisir une Note</h2>
              <button onClick={() => setShowModal(false)} className="admin-modal-close"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Étudiant *</label>
                  <select value={form.student_id} onChange={(e) => setForm({...form, student_id: e.target.value})} required>
                    <option value="">Sélectionner...</option>
                    {students.map((s) => <option key={s.id} value={s.id}>{s.full_name} ({s.email})</option>)}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Formation *</label>
                  <select value={form.formation_id} onChange={(e) => setForm({...form, formation_id: e.target.value})} required>
                    <option value="">Sélectionner...</option>
                    {formations.map((f) => <option key={f.id} value={f.id}>{f.title}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-form-group">
                <label>Module *</label>
                <input type="text" value={form.module} onChange={(e) => setForm({...form, module: e.target.value})} required placeholder="ex: Algorithmique" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Note *</label>
                  <input type="number" value={form.grade} onChange={(e) => setForm({...form, grade: Number(e.target.value)})} min={0} max={form.max_grade} required />
                </div>
                <div className="admin-form-group">
                  <label>Barème</label>
                  <input type="number" value={form.max_grade} onChange={(e) => setForm({...form, max_grade: Number(e.target.value)})} min={1} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Commentaire</label>
                <textarea value={form.comment} onChange={(e) => setForm({...form, comment: e.target.value})} rows={2} />
              </div>
              <div className="admin-form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn-secondary">Annuler</button>
                <button type="submit" className="admin-btn-primary" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGrades;
