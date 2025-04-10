import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await authService.getProfile();
          setCurrentUser(response.data.data);
        } catch (err) {
          // En cas d'erreur, supprimer le token invalide
          localStorage.removeItem('token');
          setCurrentUser(null);
          console.error('Error checking auth status:', err);
        }
      }
      
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  // Fonction de connexion
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      const { token, ...userData } = response.data.data;
      
      // Enregistrer le token dans le localStorage
      localStorage.setItem('token', token);
      
      // Mettre à jour l'état utilisateur
      setCurrentUser(userData);
      
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Échec de la connexion';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fonction d'inscription
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      const { token, ...newUserData } = response.data.data;
      
      // Enregistrer le token dans le localStorage
      localStorage.setItem('token', token);
      
      // Mettre à jour l'état utilisateur
      setCurrentUser(newUserData);
      
      return newUserData;
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Échec de l'inscription";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  // Fonction de mise à jour du profil
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.updateProfile(userData);
      const updatedUser = response.data.data;
      
      // Mettre à jour l'état utilisateur
      setCurrentUser(prev => ({ ...prev, ...updatedUser }));
      
      return updatedUser;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Échec de la mise à jour du profil';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const values = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext);

export default AuthContext;