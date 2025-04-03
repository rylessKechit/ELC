import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import '../../styles/components/Header.css';
import logo from '../../assets/images/logo.png';

const Header = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
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
          
          <Link to="/contact" className="contact-btn">
            <i className="fas fa-map-marker-alt"></i>
            <span>Me trouver</span>
          </Link>
          
          <Link to="/" className="book-btn">
            <i className="fas fa-calendar-alt"></i>
            <span>Réserver votre course</span>
          </Link>
        </div>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
      
      <Navbar mobileMenuOpen={mobileMenuOpen} />
    </header>
  );
};

export default Header;