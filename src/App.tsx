import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Formations from './components/Formations';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import PromotionBanner from './components/PromotionBanner';
import LaureatsPage from './components/LaureatsPage';
import FormationsPage from './components/FormationsPage';
import NewsPage from './components/NewsPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageFormations from './pages/admin/ManageFormations';
import ManageStudents from './pages/admin/ManageStudents';
import ManageNews from './pages/admin/ManageNews';
import ManageGrades from './pages/admin/ManageGrades';
import ManageSchedules from './pages/admin/ManageSchedules';
import ManageMaterials from './pages/admin/ManageMaterials';
import ManagePayments from './pages/admin/ManagePayments';
import ContactMessages from './pages/admin/ContactMessages';
import SiteSettings from './pages/admin/SiteSettings';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import StudentLayout from './components/student/StudentLayout';
import './App.css';

function HomePage() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <Formations />
        <Services />
        <Testimonials />
        <Newsletter />
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          <Routes>
            {/* Admin routes — no public header/footer */}
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Routes>
                      <Route index element={<AdminDashboard />} />
                      <Route path="formations" element={<ManageFormations />} />
                      <Route path="etudiants" element={<ManageStudents />} />
                      <Route path="actualites" element={<ManageNews />} />
                      <Route path="notes" element={<ManageGrades />} />
                      <Route path="emplois-du-temps" element={<ManageSchedules />} />
                      <Route path="supports" element={<ManageMaterials />} />
                      <Route path="paiements" element={<ManagePayments />} />
                      <Route path="messages" element={<ContactMessages />} />
                      <Route path="parametres" element={<SiteSettings />} />
                    </Routes>
                  </AdminLayout>
                </AdminRoute>
              }
            />

            {/* Student dashboard — no public header/footer */}
            <Route
              path="/espace-apprenant/dashboard/*"
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentLayout>
                    <StudentDashboard />
                  </StudentLayout>
                </ProtectedRoute>
              }
            />

            {/* Public routes — with header & footer */}
            <Route
              path="*"
              element={
                <>
                  <div className="header-wrapper">
                    <PromotionBanner />
                    <Header />
                  </div>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/formations" element={<FormationsPage />} />
                    <Route path="/formations/:filter" element={<FormationsPage />} />
                    <Route path="/laureats" element={<LaureatsPage />} />
                    <Route path="/actualites" element={<NewsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/a-propos" element={<AboutPage />} />
                    <Route path="/connexion" element={<StudentLogin />} />
                    <Route path="/espace-apprenant" element={<StudentLogin />} />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;