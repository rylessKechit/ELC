import { useState } from 'react';
import '../styles/pages/ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({
    success: false,
    message: '',
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitResult({
          success: true,
          message: data.message || 'Votre message a été envoyé avec succès.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        setSubmitResult({
          success: false,
          message: data.error || 'Une erreur est survenue. Veuillez réessayer.',
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Une erreur est survenue. Veuillez réessayer.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>CONTACTEZ ELYSIAN LUXURY CHAUFFEURS</h1>
        <p className="subtitle">Un service d'exception à votre écoute</p>
      </div>
      
      <div className="contact-container">
        <div className="contact-info">
          <h2>À VOTRE SERVICE</h2>
          <p>
            Nous sommes à votre disposition pour répondre à toutes vos demandes.
            N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
          </p>
          
          <div className="contact-details">
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>TÉLÉPHONE</h3>
                <p><a href="tel:+33600000000">+33 6 00 00 00 00</a></p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>EMAIL</h3>
                <p><a href="mailto:contact@elysian-chauffeurs.com">contact@elysian-chauffeurs.com</a></p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>ADRESSE</h3>
                <p>Paris et région parisienne</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div>
                <h3>DISPONIBILITÉ</h3>
                <p>7j/7 et 24h/24</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Votre email"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Votre numéro de téléphone"
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message"
                rows="6"
                required
              ></textarea>
            </div>
            
            {submitResult.message && (
              <div className={`submit-result ${submitResult.success ? 'success' : 'error'}`}>
                {submitResult.message}
              </div>
            )}
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;