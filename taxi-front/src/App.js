import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { HelmetProvider } from 'react-helmet-async';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages publiques
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import BookingStatusPage from './pages/BookingStatusPage';
import NotFoundPage from './pages/NotFoundPage';

// Pages spécifiques aux services
import AirportTransferPage from './pages/services/AirportTransferPage';
import TrainStationPage from './pages/services/TrainStationPage';
import CityTransferPage from './pages/services/CityTransferPage';
import LongDistancePage from './pages/services/LongDistancePage';

// Pages authentifiées
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import MyBookingsPage from './pages/profile/MyBookingsPage';

// Pages admin
import AdminDashboardPage from './pages/admin/DashboardPage';
import AdminBookingsPage from './pages/admin/BookingsPage';
import AdminUsersPage from './pages/admin/UsersPage';
import AdminSettingsPage from './pages/admin/SettingsPage';

// Route protection
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';

// Sitemap et autres SEO components
import SitemapXML from './components/seo/SitemapXML';
import RobotsText from './components/seo/RobotsText';

function App() {
  return (
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <BookingProvider>
            <Routes>
              {/* SEO Files */}
              <Route path="/sitemap.xml" element={<SitemapXML />} />
              <Route path="/robots.txt" element={<RobotsText />} />
              
              {/* Routes publiques */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                
                {/* Pages de services avec URLs SEO-friendly */}
                <Route path="services" element={<ServicesPage />} />
                <Route path="services/transfert-aeroport" element={<AirportTransferPage />} />
                <Route path="services/transfert-gare" element={<TrainStationPage />} />
                <Route path="services/taxi-urbain" element={<CityTransferPage />} />
                <Route path="services/longue-distance" element={<LongDistancePage />} />
                <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />
                
                <Route path="contact" element={<ContactPage />} />
                <Route path="tarifs" element={<PricingPage />} />
                <Route path="reservation" element={<BookingPage />} />
                <Route path="reservation/confirmation/:bookingId" element={<BookingStatusPage />} />
                <Route path="connexion" element={<LoginPage />} />
                <Route path="inscription" element={<RegisterPage />} />
                
                {/* Support old URLs for SEO */}
                <Route path="booking" element={<Navigate to="/reservation" replace />} />
                <Route path="booking/status/:bookingId" element={<Navigate to={`/reservation/confirmation/${bookingId}`} replace />} />
                <Route path="login" element={<Navigate to="/connexion" replace />} />
                <Route path="register" element={<Navigate to="/inscription" replace />} />
              </Route>
              
              {/* Routes utilisateur authentifié */}
              <Route path="/profile" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
                <Route index element={<ProfilePage />} />
                <Route path="reservations" element={<MyBookingsPage />} />
              </Route>
              
              {/* Routes admin */}
              <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="reservations" element={<AdminBookingsPage />} />
                <Route path="utilisateurs" element={<AdminUsersPage />} />
                <Route path="parametres" element={<AdminSettingsPage />} />
              </Route>
              
              {/* Page 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BookingProvider>
        </AuthProvider>
      </HelmetProvider>
    </Router>
  );
}