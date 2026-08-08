import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, BookOpen, CreditCard, MessageSquare, TrendingUp, UserPlus } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeFormations: 0,
    totalPayments: 0,
    unreadMessages: 0,
    recentEnrollments: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentStudents, setRecentStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [
        { count: studentsCount },
        { count: formationsCount },
        { count: paymentsCount },
        { count: messagesCount },
        { count: enrollmentsCount },
        { data: revenueData },
        { data: recentData },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
        supabase.from('formations').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'success'),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('payments').select('amount').eq('status', 'success'),
        supabase.from('profiles').select('*').eq('role', 'student').order('created_at', { ascending: false }).limit(5),
      ]);

      const totalRevenue = revenueData?.reduce((sum: number, p: any) => sum + Number(p.amount), 0) || 0;

      setStats({
        totalStudents: studentsCount || 0,
        activeFormations: formationsCount || 0,
        totalPayments: paymentsCount || 0,
        unreadMessages: messagesCount || 0,
        recentEnrollments: enrollmentsCount || 0,
        totalRevenue,
      });
      setRecentStudents(recentData || []);
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(amount);

  if (loading) {
    return <div className="admin-loading"><div className="route-loading-spinner" /><p>Chargement du tableau de bord...</p></div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Tableau de Bord</h1>
        <p>Vue d'ensemble de Guims Academy</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
            <Users size={24} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats.totalStudents}</span>
            <span className="admin-stat-label">Étudiants inscrits</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
            <BookOpen size={24} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats.activeFormations}</span>
            <span className="admin-stat-label">Formations actives</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
            <CreditCard size={24} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{formatCurrency(stats.totalRevenue)}</span>
            <span className="admin-stat-label">Revenus totaux</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
            <MessageSquare size={24} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats.unreadMessages}</span>
            <span className="admin-stat-label">Messages non lus</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}>
            <TrendingUp size={24} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats.recentEnrollments}</span>
            <span className="admin-stat-label">Inscriptions actives</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(236,72,153,0.1)', color: '#ec4899' }}>
            <UserPlus size={24} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats.totalPayments}</span>
            <span className="admin-stat-label">Paiements réussis</span>
          </div>
        </div>
      </div>

      {/* Recent Students */}
      <div className="admin-section">
        <h2>Derniers étudiants inscrits</h2>
        {recentStudents.length > 0 ? (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Date d'inscription</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s: any) => (
                  <tr key={s.id}>
                    <td>{s.full_name || '—'}</td>
                    <td>{s.email}</td>
                    <td>{s.phone || '—'}</td>
                    <td>{new Date(s.created_at).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-empty">Aucun étudiant inscrit pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
