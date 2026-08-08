import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { ContactMessage } from '../../lib/types';
import { Mail, MailOpen, Trash2 } from 'lucide-react';

const ContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    setMessages((data as ContactMessage[]) || []);
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce message ?')) return;
    await supabase.from('contact_messages').delete().eq('id', id);
    setSelected(null);
    fetchMessages();
  };

  const openMessage = async (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.is_read) {
      await markAsRead(msg.id);
    }
  };

  if (loading) return <div className="admin-loading"><div className="route-loading-spinner" /></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Messages de Contact</h1>
        <span className="admin-badge">{messages.filter(m => !m.is_read).length} non lu(s)</span>
      </div>

      <div className="messages-layout">
        <div className="messages-list">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-item ${!msg.is_read ? 'unread' : ''} ${selected?.id === msg.id ? 'selected' : ''}`}
              onClick={() => openMessage(msg)}
            >
              <div className="message-item-icon">
                {msg.is_read ? <MailOpen size={18} /> : <Mail size={18} />}
              </div>
              <div className="message-item-content">
                <div className="message-item-header">
                  <strong>{msg.name}</strong>
                  <span>{new Date(msg.created_at).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="message-item-subject">{msg.subject}</div>
                <div className="message-item-preview">{msg.message.substring(0, 60)}...</div>
              </div>
            </div>
          ))}
          {messages.length === 0 && <p className="admin-empty">Aucun message reçu.</p>}
        </div>

        {selected && (
          <div className="message-detail">
            <div className="message-detail-header">
              <h2>{selected.subject}</h2>
              <button onClick={() => handleDelete(selected.id)} className="admin-btn-icon danger"><Trash2 size={16} /></button>
            </div>
            <div className="message-detail-meta">
              <span><strong>De :</strong> {selected.name} ({selected.email})</span>
              <span><strong>Date :</strong> {new Date(selected.created_at).toLocaleString('fr-FR')}</span>
            </div>
            <div className="message-detail-body">
              <p>{selected.message}</p>
            </div>
            <a href={`mailto:${selected.email}`} className="admin-btn-primary" style={{ display: 'inline-flex', marginTop: '1rem' }}>
              <Mail size={16} /> Répondre par email
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
