import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { NewsPost } from '../../lib/types';
import { Plus, Pencil, Trash2, X, Globe } from 'lucide-react';

const emptyPost = { message: '', image_url: '', category: 'Général', published_at: new Date().toISOString().split('T')[0], is_from_facebook: false, permalink_url: '', facebook_post_id: '' };

const ManageNews = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<NewsPost | null>(null);
  const [form, setForm] = useState(emptyPost);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from('news_posts').select('*').order('published_at', { ascending: false });
    setPosts((data as NewsPost[]) || []);
    setLoading(false);
  };

  const openCreate = () => { setEditing(null); setForm(emptyPost); setShowModal(true); };

  const openEdit = (p: NewsPost) => {
    setEditing(p);
    setForm({
      message: p.message, image_url: p.image_url || '', category: p.category,
      published_at: p.published_at.split('T')[0], is_from_facebook: p.is_from_facebook,
      permalink_url: p.permalink_url || '', facebook_post_id: p.facebook_post_id || '',
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, image_url: form.image_url || null, permalink_url: form.permalink_url || null, facebook_post_id: form.facebook_post_id || null };

    if (editing) {
      await supabase.from('news_posts').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('news_posts').insert(payload);
    }
    setSaving(false);
    setShowModal(false);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette actualité ?')) return;
    await supabase.from('news_posts').delete().eq('id', id);
    fetchPosts();
  };

  if (loading) return <div className="admin-loading"><div className="route-loading-spinner" /></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Gestion des Actualités</h1>
        <button onClick={openCreate} className="admin-btn-primary"><Plus size={18} /> Ajouter une actualité</button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Message</th>
              <th>Catégorie</th>
              <th>Date</th>
              <th>Source</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="admin-td-text">{p.message.length > 80 ? p.message.substring(0, 80) + '...' : p.message}</td>
                <td>{p.category}</td>
                <td>{new Date(p.published_at).toLocaleDateString('fr-FR')}</td>
                <td>{p.is_from_facebook ? <span className="admin-badge facebook"><Globe size={14} /> Facebook</span> : <span className="admin-badge local">Manuel</span>}</td>
                <td className="admin-actions">
                  <button onClick={() => openEdit(p)} className="admin-btn-icon" title="Modifier"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(p.id)} className="admin-btn-icon danger" title="Supprimer"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p className="admin-empty">Aucune actualité. Ajoutez-en une ou synchronisez Facebook.</p>}
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editing ? 'Modifier l\'actualité' : 'Nouvelle actualité'}</h2>
              <button onClick={() => setShowModal(false)} className="admin-modal-close"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-form-group">
                <label>Message *</label>
                <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows={4} required />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Catégorie</label>
                  <input type="text" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} placeholder="Admissions, Vie de campus..." />
                </div>
                <div className="admin-form-group">
                  <label>Date de publication</label>
                  <input type="date" value={form.published_at} onChange={(e) => setForm({...form, published_at: e.target.value})} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>URL de l'image</label>
                <input type="text" value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} placeholder="https://..." />
              </div>
              <div className="admin-form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn-secondary">Annuler</button>
                <button type="submit" className="admin-btn-primary" disabled={saving}>{saving ? 'Enregistrement...' : editing ? 'Mettre à jour' : 'Publier'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;
