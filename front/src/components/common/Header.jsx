import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import logo from '../../assets/images/logo.png';
import '../../styles/components/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Gestionnaire de défilement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Fonction pour inverser l'état du menu
  const handleToggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // Empêcher le défilement du body quand le menu est ouvert
    if (!mobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Taxi VLB Logo" className="logo" />
          </Link>
        </div>
        
        <div className="header-actions">
          <Link to="/contact" className="contact-btn">
            <i className="fas fa-phone"></i>
            <span>M'appeler</span>
          </Link>
          
          <Link to="/contact" className="location-btn">
            <i className="fas fa-map-marker-alt"></i>
            <span>Me trouver</span>
          </Link>
          
          <Link to="/" className="book-btn">
            <i className="fas fa-calendar-alt"></i>
            <span>Réserver</span>
          </Link>
        </div>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={handleToggleMenu}
          aria-label="Menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
      
      <Navbar mobileMenuOpen={mobileMenuOpen} />
    </header>
  );
};

export default Header;