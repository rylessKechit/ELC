import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div 
          className="loading-container"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="spinner gold"></div>
          <p className="loading-text">Chargement de votre profil...</p>
        </motion.div>
      </div>
    );
  }
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Rendre les routes enfants si l'utilisateur est authentifié
  return children;
};

export default PrivateRoute;