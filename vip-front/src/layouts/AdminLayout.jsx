import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import '../styles/layouts/AdminLayout.css';

const AdminLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Fermer automatiquement la sidebar sur les petits écrans
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Appel initial
    handleResize();
    
    // Ajouter l'écouteur d'événement
    window.addEventListener('resize', handleResize);
    
    // Nettoyage
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fermer la sidebar lors des navigations sur mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <div className="admin-layout vip">
      {/* Sidebar */}
      <motion.aside 
        className="admin-sidebar"
        initial={false}
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="sidebar-header">
          <h1 className="sidebar-title">
            <span className="gold-text">VIP</span> Admin
          </h1>
          <motion.button 
            className="sidebar-toggle"
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className={`fas fa-${sidebarOpen ? 'times' : 'bars'}`}></i>
          </motion.button>
        </div>
        
        <div className="sidebar-user">
          <div className="user-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="user-info">
            <p className="user-name">{currentUser?.name || 'Admin'}</p>
            <p className="user-role">Administrateur <span className="gold-text">Premium</span></p>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <motion.li
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink to="/admin" end>
                <i className="fas fa-tachometer-alt"></i>
                <span>Tableau de bord</span>
              </NavLink>
            </motion.li>
            <motion.li
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink to="/admin/bookings">
                <i className="fas fa-calendar-alt"></i>
                <span>Réservations</span>
              </NavLink>
            </motion.li>
            <motion.li
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink to="/admin/users">
                <i className="fas fa-users"></i>
                <span>Clients VIP</span>
              </NavLink>
            </motion.li>
            <motion.li
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink to="/admin/settings">
                <i className="fas fa-cog"></i>
                <span>Paramètres</span>
              </NavLink>
            </motion.li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <motion.button 
            className="logout-button"
            onClick={handleLogout}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Déconnexion</span>
          </motion.button>
        </div>
      </motion.aside>
      
      {/* Main Content */}
      <div className={`admin-content ${sidebarOpen ? 'content-shifted' : ''}`}>
        <header className="admin-header">
          <motion.button 
            className="mobile-sidebar-toggle"
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-bars"></i>
          </motion.button>
          
          <div className="header-actions">
            <motion.button 
              className="header-button"
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </motion.button>
            
            <motion.button 
              className="header-button"
              onClick={() => navigate('/')}
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-home"></i>
            </motion.button>
          </div>
        </header>
        
        <AnimatePresence mode="wait">
          <motion.main 
            key={location.pathname}
            className="admin-main"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        
        <footer className="admin-footer">
          <p>&copy; {new Date().getFullYear()} - <span className="gold-text">VIP</span> Admin Panel</p>
        </footer>
      </div>
      
      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;