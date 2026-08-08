import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useStudentData } from '../hooks/useStudentData';
import { BookOpen, Calendar, Award, FileText, User, TrendingUp, Download, Clock } from 'lucide-react';

type Tab = 'overview' | 'materials' | 'schedule' | 'grades' | 'documents' | 'profile';

const DAYS_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const { profile, signOut } = useAuth();
  const { enrollment, materials, schedules, grades, documents, loading } = useStudentData();

  const averageGrade = grades.length > 0
    ? (grades.reduce((sum, g) => sum + (g.grade / g.max_grade) * 20, 0) / grades.length).toFixed(1)
    : null;

  const tabs = [
    { id: 'overview' as Tab, label: 'Vue d\'ensemble', icon: <TrendingUp size={18} /> },
    { id: 'materials' as Tab, label: 'Supports de cours', icon: <BookOpen size={18} /> },
    { id: 'schedule' as Tab, label: 'Emploi du temps', icon: <Calendar size={18} /> },
    { id: 'grades' as Tab, label: 'Notes & Bulletins', icon: <Award size={18} /> },
    { id: 'documents' as Tab, label: 'Documents', icon: <FileText size={18} /> },
    { id: 'profile' as Tab, label: 'Mon Profil', icon: <User size={18} /> },
  ];

  if (loading) {
    return (
      <div className="student-dashboard-loading">
        <div className="route-loading-spinner" />
        <p>Chargement de votre espace...</p>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      {/* Tab Navigation */}
      <div className="student-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`student-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="student-tab-content">
        {/* ============ OVERVIEW ============ */}
        {activeTab === 'overview' && (
          <div className="student-overview">
            <h2>Bienvenue, {profile?.full_name || 'Apprenant'} 👋</h2>

            {enrollment?.formation ? (
              <div className="overview-cards">
                <div className="overview-card highlight-card">
                  <BookOpen size={24} />
                  <div>
                    <h3>Formation en cours</h3>
                    <p className="overview-value">{(enrollment.formation as any).title}</p>
                    <span className={`status-badge status-${enrollment.status}`}>
                      {enrollment.status === 'active' ? 'En cours' : enrollment.status === 'pending' ? 'En attente' : enrollment.status}
                    </span>
                  </div>
                </div>

                <div className="overview-card">
                  <Award size={24} />
                  <div>
                    <h3>Moyenne générale</h3>
                    <p className="overview-value">{averageGrade ? `${averageGrade}/20` : 'Aucune note'}</p>
                  </div>
                </div>

                <div className="overview-card">
                  <FileText size={24} />
                  <div>
                    <h3>Supports disponibles</h3>
                    <p className="overview-value">{materials.length} document{materials.length > 1 ? 's' : ''}</p>
                  </div>
                </div>

                <div className="overview-card">
                  <Calendar size={24} />
                  <div>
                    <h3>Cours cette semaine</h3>
                    <p className="overview-value">{schedules.length} séance{schedules.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overview-empty">
                <p>Aucune inscription active. Veuillez contacter l'administration.</p>
              </div>
            )}

            {/* Quick schedule preview */}
            {schedules.length > 0 && (
              <div className="overview-section">
                <h3><Clock size={18} /> Prochains cours</h3>
                <div className="quick-schedule">
                  {schedules.slice(0, 3).map((s) => (
                    <div key={s.id} className="quick-schedule-item">
                      <span className="schedule-day">{DAYS_FR[s.day_of_week]}</span>
                      <span className="schedule-subject">{s.subject}</span>
                      <span className="schedule-time">{s.start_time} - {s.end_time}</span>
                      {s.room && <span className="schedule-room">Salle {s.room}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============ MATERIALS ============ */}
        {activeTab === 'materials' && (
          <div className="student-materials">
            <h2><BookOpen size={22} /> Supports de Cours</h2>
            {materials.length > 0 ? (
              <div className="materials-list">
                {materials.map((mat) => (
                  <div key={mat.id} className="material-card">
                    <div className="material-icon">
                      {mat.type === 'pdf' ? <FileText size={24} /> :
                       mat.type === 'video' ? <BookOpen size={24} /> :
                       mat.type === 'exercise' ? <Award size={24} /> :
                       <FileText size={24} />}
                    </div>
                    <div className="material-info">
                      <h4>{mat.title}</h4>
                      {mat.module_name && <span className="material-module">{mat.module_name}</span>}
                      {mat.description && <p>{mat.description}</p>}
                      <span className="material-type-badge">{mat.type.toUpperCase()}</span>
                    </div>
                    <a href={mat.file_url} target="_blank" rel="noopener noreferrer" className="material-download-btn">
                      <Download size={18} />
                      Télécharger
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <BookOpen size={48} />
                <p>Aucun support de cours disponible pour le moment.</p>
              </div>
            )}
          </div>
        )}

        {/* ============ SCHEDULE ============ */}
        {activeTab === 'schedule' && (
          <div className="student-schedule">
            <h2><Calendar size={22} /> Emploi du Temps</h2>
            {schedules.length > 0 ? (
              <div className="schedule-grid">
                {[1, 2, 3, 4, 5, 6].map((dayNum) => {
                  const daySchedules = schedules.filter((s) => s.day_of_week === dayNum);
                  if (daySchedules.length === 0) return null;
                  return (
                    <div key={dayNum} className="schedule-day-column">
                      <h3 className="schedule-day-header">{DAYS_FR[dayNum]}</h3>
                      {daySchedules
                        .sort((a, b) => a.start_time.localeCompare(b.start_time))
                        .map((s) => (
                          <div key={s.id} className="schedule-block">
                            <div className="schedule-block-time">
                              {s.start_time} — {s.end_time}
                            </div>
                            <div className="schedule-block-subject">{s.subject}</div>
                            {s.teacher_name && <div className="schedule-block-teacher">{s.teacher_name}</div>}
                            {s.room && <div className="schedule-block-room">Salle {s.room}</div>}
                          </div>
                        ))}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <Calendar size={48} />
                <p>Aucun emploi du temps défini pour votre formation.</p>
              </div>
            )}
          </div>
        )}

        {/* ============ GRADES ============ */}
        {activeTab === 'grades' && (
          <div className="student-grades">
            <h2><Award size={22} /> Notes & Résultats</h2>
            {averageGrade && (
              <div className="grades-average-card">
                <span>Moyenne générale</span>
                <span className="grades-average-value">{averageGrade}/20</span>
              </div>
            )}
            {grades.length > 0 ? (
              <div className="grades-table-wrapper">
                <table className="grades-table">
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th>Note</th>
                      <th>Barème</th>
                      <th>Commentaire</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((g) => (
                      <tr key={g.id}>
                        <td>{g.module}</td>
                        <td className={g.grade >= (g.max_grade / 2) ? 'grade-pass' : 'grade-fail'}>
                          {g.grade}
                        </td>
                        <td>/{g.max_grade}</td>
                        <td>{g.comment || '—'}</td>
                        <td>{new Date(g.graded_at).toLocaleDateString('fr-FR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <Award size={48} />
                <p>Aucune note enregistrée pour le moment.</p>
              </div>
            )}
          </div>
        )}

        {/* ============ DOCUMENTS ============ */}
        {activeTab === 'documents' && (
          <div className="student-documents">
            <h2><FileText size={22} /> Documents Administratifs</h2>
            {documents.length > 0 ? (
              <div className="documents-list">
                {documents.map((doc) => (
                  <div key={doc.id} className="document-card">
                    <div className="document-icon">
                      <FileText size={24} />
                    </div>
                    <div className="document-info">
                      <h4>{doc.title}</h4>
                      <span className="document-type-badge">{doc.type}</span>
                      <span className="document-date">
                        {new Date(doc.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="document-download-btn">
                      <Download size={18} />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <FileText size={48} />
                <p>Aucun document disponible. Les attestations et bulletins seront ajoutés par l'administration.</p>
              </div>
            )}
          </div>
        )}

        {/* ============ PROFILE ============ */}
        {activeTab === 'profile' && (
          <div className="student-profile">
            <h2><User size={22} /> Mon Profil</h2>
            <div className="profile-info-card">
              <div className="profile-avatar-section">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.full_name} className="profile-avatar" />
                ) : (
                  <div className="profile-avatar-placeholder">
                    <User size={48} />
                  </div>
                )}
              </div>
              <div className="profile-details">
                <div className="profile-field">
                  <label>Nom complet</label>
                  <p>{profile?.full_name || '—'}</p>
                </div>
                <div className="profile-field">
                  <label>Email</label>
                  <p>{profile?.email || '—'}</p>
                </div>
                <div className="profile-field">
                  <label>Téléphone</label>
                  <p>{profile?.phone || 'Non renseigné'}</p>
                </div>
                <div className="profile-field">
                  <label>Rôle</label>
                  <p>{profile?.role === 'student' ? 'Apprenant' : profile?.role || '—'}</p>
                </div>
                {enrollment?.formation && (
                  <div className="profile-field">
                    <label>Formation</label>
                    <p>{(enrollment.formation as any).title}</p>
                  </div>
                )}
              </div>
            </div>
            <button onClick={signOut} className="btn-logout">
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
