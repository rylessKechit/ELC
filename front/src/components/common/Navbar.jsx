import { NavLink } from 'react-router-dom';
import '../../styles/components/Navbar.css';

const Navbar = ({ mobileMenuOpen }) => {
  const navLinks = [
    { path: '/', label: 'Accueil', exact: true },
    { path: '/trajets-aeroport-gare', label: 'Aéroport / Gare' },
    { path: '/trajets-longues-distances', label: 'Longues Distances' },
    { path: '/trajets-sur-mesure', label: 'Sur Mesure' },
    { path: '/prestation-vip', label: 'VIP' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-container">
        <ul className="nav-links">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => isActive ? 'active' : ''}
                end={link.exact}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;