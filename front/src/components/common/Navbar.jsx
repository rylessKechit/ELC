import { NavLink } from 'react-router-dom';
import '../../styles/components/Navbar.css';

const Navbar = ({ mobileMenuOpen }) => {
  return (
    <nav className={`navbar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <ul className="nav-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''}
            end
          >
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/trajets-aeroport-gare" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Aéroport / Gare
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/trajets-longues-distances" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Longues Distances
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/trajets-sur-mesure" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Sur Mesure
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/prestation-vip" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            VIP
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;