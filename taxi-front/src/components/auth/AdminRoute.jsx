import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser, isAdmin, loading } = useAuth();
  
  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Rediriger vers la page d'accueil si l'utilisateur n'est pas administrateur
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  // Rendre les routes enfants si l'utilisateur est un administrateur
  return children;
};

export default AdminRoute;