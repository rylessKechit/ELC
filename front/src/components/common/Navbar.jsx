import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/components/Navbar.css';

const Navbar = ({ mobileMenuOpen }) => {
  const [activeLink, setActiveLink] = useState('');
  
  // Déterminer le lien actif en fonction de l'URL
  useEffect(() => {
    const pathname = window.location.pathname;
    setActiveLink(pathname);
  }, []);
  
  // Gérer les clics sur les liens en mobile
  const handleLinkClick = () => {
    // Fermeture automatique du menu sur mobile après un clic (géré par le composant parent)
  };

  return (
    <nav className={`navbar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <ul className="nav-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={handleLinkClick}
          >
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/trajets-aeroport-gare" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={handleLinkClick}
          >
            Trajets Aéroport / Gare
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/trajets-longues-distances" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={handleLinkClick}
          >
            Trajets Longues Distances
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/trajets-sur-mesure" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={handleLinkClick}
          >
            Trajets Sur Mesure
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/prestation-vip" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={handleLinkClick}
          >
            Prestation VIP
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={handleLinkClick}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;