import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import FleetPage from './pages/FleetPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import BookingStatusPage from './pages/BookingStatusPage';
import NotFoundPage from './pages/NotFoundPage';
import PricingPage from './pages/PricingPage';

// Pages spécifiques aux services premium
import BusinessClassPage from './pages/services/BusinessClassPage';
import AirportVipPage from './pages/services/AirportVipPage';
import EventsServicePage from './pages/services/EventsServicePage';
import LuxuryTourPage from './pages/services/LuxuryTourPage';

// Pages spécifiques aux véhicules
import MercedesClass from './pages/fleet/MercedesClass';
import BmwSeries from './pages/fleet/BmwSeries';
import LuxuryVans from './pages/fleet/LuxuryVans';

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
                <Route path="services/business-class" element={<BusinessClassPage />} />
                <Route path="services/transfert-aeroport-premium" element={<AirportVipPage />} />
                <Route path="services/evenements-speciaux" element={<EventsServicePage />} />
                <Route path="services/tourisme-de-luxe" element={<LuxuryTourPage />} />
                <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />
                
                {/* Pages de flotte avec URLs SEO-friendly */}
                <Route path="flotte" element={<FleetPage />} />
                <Route path="flotte/mercedes-classe-s" element={<MercedesClass />} />
                <Route path="flotte/bmw-serie-7" element={<BmwSeries />} />
                <Route path="flotte/van-luxe" element={<LuxuryVans />} />
                
                <Route path="a-propos" element={<AboutUsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="tarifs" element={<PricingPage />} />
                <Route path="reservation" element={<BookingPage />} />
                <Route path="reservation/confirmation/:bookingId" element={<BookingStatusPage />} />
                <Route path="connexion" element={<LoginPage />} />
                <Route path="inscription" element={<RegisterPage />} />
                
                {/* Support old URLs for SEO */}
                <Route path="fleet" element={<Navigate to="/flotte" replace />} />
                <Route path="about" element={<Navigate to="/a-propos" replace />} />
                <Route path="booking" element={<Navigate to="/reservation" replace />} />
                <Route path="booking/status/:bookingId" 
                       element={<Navigate to={params => `/reservation/confirmation/${params.bookingId}`} replace />} />
                <Route path="login" element={<Navigate to="/connexion" replace />} />
                <Route path="register" element={<Navigate to="/inscription" replace />} />
              </Route>
              
              {/* Routes utilisateur authentifié */}
              <Route path="/profil" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
                <Route index element={<ProfilePage />} />
                <Route path="reservations" element={<MyBookingsPage />} />
                
                {/* Support old URLs for SEO */}
                <Route path="/profile" element={<Navigate to="/profil" replace />} />
                <Route path="/profile/bookings" element={<Navigate to="/profil/reservations" replace />} />
              </Route>
              
              {/* Routes admin */}
              <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="reservations" element={<AdminBookingsPage />} />
                <Route path="clients" element={<AdminUsersPage />} />
                <Route path="parametres" element={<AdminSettingsPage />} />
                
                {/* Support old URLs for SEO */}
                <Route path="bookings" element={<Navigate to="/admin/reservations" replace />} />
                <Route path="users" element={<Navigate to="/admin/clients" replace />} />
                <Route path="settings" element={<Navigate to="/admin/parametres" replace />} />
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