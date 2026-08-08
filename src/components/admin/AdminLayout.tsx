import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard, BookOpen, Users, Newspaper, Award, Calendar,
  FileText, CreditCard, MessageSquare, Settings, LogOut, Home
} from 'lucide-react';
import logo from '../../assets/logo Guims Acadeny.png';

const ADMIN_NAV = [
  { to: '/admin', icon: <LayoutDashboard size={18} />, label: 'Tableau de bord', end: true },
  { to: '/admin/formations', icon: <BookOpen size={18} />, label: 'Formations' },
  { to: '/admin/etudiants', icon: <Users size={18} />, label: 'Étudiants' },
  { to: '/admin/actualites', icon: <Newspaper size={18} />, label: 'Actualités' },
  { to: '/admin/notes', icon: <Award size={18} />, label: 'Notes' },
  { to: '/admin/emplois-du-temps', icon: <Calendar size={18} />, label: 'Emplois du temps' },
  { to: '/admin/supports', icon: <FileText size={18} />, label: 'Supports de cours' },
  { to: '/admin/paiements', icon: <CreditCard size={18} />, label: 'Paiements' },
  { to: '/admin/messages', icon: <MessageSquare size={18} />, label: 'Messages' },
  { to: '/admin/parametres', icon: <Settings size={18} />, label: 'Paramètres du site' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/connexion');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <img src={logo} alt="Guims Academy" className="admin-sidebar-logo" />
          <span className="admin-sidebar-title">Admin Panel</span>
        </div>

        <nav className="admin-sidebar-nav">
          {ADMIN_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <a href="/" className="admin-nav-item" target="_blank" rel="noopener noreferrer">
            <Home size={18} />
            <span>Voir le site</span>
          </a>
          <button onClick={handleSignOut} className="admin-nav-item admin-logout-btn">
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
          <div className="admin-user-info">
            <span>{profile?.full_name || 'Admin'}</span>
            <small>{profile?.email}</small>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
