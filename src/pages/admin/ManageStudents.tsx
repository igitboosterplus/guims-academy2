import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Profile, Formation } from '../../lib/types';
import { Trash2, X, UserPlus } from 'lucide-react';

const ManageStudents = () => {
  const [students, setStudents] = useState<Profile[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ email: '', password: '', full_name: '', phone: '', formation_id: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: studentsData }, { data: formationsData }] = await Promise.all([
      supabase.from('profiles').select('*').eq('role', 'student').order('created_at', { ascending: false }),
      supabase.from('formations').select('*').eq('is_active', true).order('title'),
    ]);
    setStudents((studentsData as Profile[]) || []);
    setFormations((formationsData as Formation[]) || []);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    // Create auth user via Supabase Admin (requires service_role for production)
    // For now, we use signUp which the student can also use
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: newStudent.email,
      password: newStudent.password,
      options: {
        data: {
          full_name: newStudent.full_name,
          role: 'student',
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setSaving(false);
      return;
    }

    // Update profile with phone and formation
    if (authData.user) {
      await supabase.from('profiles').update({
        phone: newStudent.phone || null,
        formation_id: newStudent.formation_id || null,
      }).eq('id', authData.user.id);

      // Create enrollment if formation selected
      if (newStudent.formation_id) {
        await supabase.from('enrollments').insert({
          student_id: authData.user.id,
          formation_id: newStudent.formation_id,
          status: 'active',
        });
      }
    }

    setSaving(false);
    setShowModal(false);
    setNewStudent({ email: '', password: '', full_name: '', phone: '', formation_id: '' });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet étudiant ? Cette action est irréversible.')) return;
    // Delete profile (cascade will handle auth user via trigger if configured)
    await supabase.from('profiles').delete().eq('id', id);
    fetchData();
  };

  if (loading) return <div className="admin-loading"><div className="route-loading-spinner" /></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Gestion des Étudiants</h1>
        <button onClick={() => setShowModal(true)} className="admin-btn-primary"><UserPlus size={18} /> Ajouter un étudiant</button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom complet</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Date d'inscription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td><strong>{s.full_name || '—'}</strong></td>
                <td>{s.email}</td>
                <td>{s.phone || '—'}</td>
                <td>{new Date(s.created_at).toLocaleDateString('fr-FR')}</td>
                <td className="admin-actions">
                  <button onClick={() => handleDelete(s.id)} className="admin-btn-icon danger" title="Supprimer"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && <p className="admin-empty">Aucun étudiant inscrit.</p>}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Nouvel Étudiant</h2>
              <button onClick={() => setShowModal(false)} className="admin-modal-close"><X size={20} /></button>
            </div>
            {error && <div className="admin-error">{error}</div>}
            <form onSubmit={handleCreate} className="admin-form">
              <div className="admin-form-group">
                <label>Nom complet *</label>
                <input type="text" value={newStudent.full_name} onChange={(e) => setNewStudent({...newStudent, full_name: e.target.value})} required />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Email *</label>
                  <input type="email" value={newStudent.email} onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} required />
                </div>
                <div className="admin-form-group">
                  <label>Mot de passe *</label>
                  <input type="password" value={newStudent.password} onChange={(e) => setNewStudent({...newStudent, password: e.target.value})} required minLength={6} />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Téléphone</label>
                  <input type="tel" value={newStudent.phone} onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})} placeholder="+237 6XX XXX XXX" />
                </div>
                <div className="admin-form-group">
                  <label>Formation</label>
                  <select value={newStudent.formation_id} onChange={(e) => setNewStudent({...newStudent, formation_id: e.target.value})}>
                    <option value="">— Aucune —</option>
                    {formations.map((f) => (
                      <option key={f.id} value={f.id}>{f.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="admin-form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn-secondary">Annuler</button>
                <button type="submit" className="admin-btn-primary" disabled={saving}>
                  {saving ? 'Création...' : 'Créer le compte'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
