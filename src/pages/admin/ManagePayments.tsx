import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Payment } from '../../lib/types';

const ManagePayments = () => {
  const [payments, setPayments] = useState<(Payment & { student?: any })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPayments(); }, []);

  const fetchPayments = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('payments')
      .select('*, student:profiles(*)')
      .order('created_at', { ascending: false });
    setPayments((data as any[]) || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('payments').update({ status }).eq('id', id);
    fetchPayments();
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(amount);

  const statusColors: Record<string, string> = {
    pending: '#f59e0b',
    success: '#10b981',
    failed: '#ef4444',
    refunded: '#8b5cf6',
  };

  if (loading) return <div className="admin-loading"><div className="route-loading-spinner" /></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Suivi des Paiements</h1>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>Étudiant</th><th>Montant</th><th>Méthode</th><th>Statut</th><th>Provider</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.student?.full_name || p.student?.email || '—'}</td>
                <td><strong>{formatCurrency(Number(p.amount))}</strong></td>
                <td>{p.method}</td>
                <td>
                  <span className="status-badge" style={{ background: statusColors[p.status] + '20', color: statusColors[p.status] }}>
                    {p.status}
                  </span>
                </td>
                <td>{p.provider_name || '—'}</td>
                <td>{new Date(p.created_at).toLocaleDateString('fr-FR')}</td>
                <td className="admin-actions">
                  {p.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(p.id, 'success')} className="admin-btn-sm success">Valider</button>
                      <button onClick={() => updateStatus(p.id, 'failed')} className="admin-btn-sm danger">Rejeter</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && <p className="admin-empty">Aucun paiement enregistré.</p>}
      </div>
    </div>
  );
};

export default ManagePayments;
