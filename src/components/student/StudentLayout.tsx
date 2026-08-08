import { useAuth } from '../../contexts/AuthContext';
import { GraduationCap, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo Guims Acadeny.png';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout = ({ children }: StudentLayoutProps) => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/connexion');
  };

  return (
    <div className="student-layout">
      <header className="student-header">
        <div className="student-header-inner">
          <a href="/" className="student-header-logo">
            <img src={logo} alt="Guims Academy" className="student-logo-img" />
          </a>
          <div className="student-header-center">
            <GraduationCap size={20} />
            <span>Espace Apprenant</span>
          </div>
          <div className="student-header-right">
            <span className="student-header-name">{profile?.full_name}</span>
            <button onClick={handleSignOut} className="student-logout-btn" title="Se déconnecter">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>
      <main className="student-main">
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;
