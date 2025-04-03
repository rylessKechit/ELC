import { Link } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/ServicePage.css';

const VipServicePage = () => {
  return (
    <div className="service-page vip-service-page">
      <div className="service-header">
        <h1>PRESTATION VIP</h1>
        <h2>TAXI VLB, POUR LE TRANSPORT VIP</h2>
      </div>
      
      <div className="service-overview">
        <div className="service-container">
          <div className="service-content">
            <p>
              Taxi VLB propose une expérience de transport unique pour les grandes stars.
              En choisissant ma prestation VIP, vous bénéficiez non seulement d'un véhicule de luxe impeccable, mais aussi d'un chauffeur professionnel et discret, prêt à répondre à tous vos besoins.
            </p>
          </div>
          
          <div className="service-image-container">
            <img src="/assets/images/vip-service.jpg" alt="Service VIP" className="service-image" />
          </div>
        </div>
      </div>
      
      <div className="service-details">
        <div className="service-container">
          <div className="service-section">
            <div className="service-icon">
              <i className="fas fa-star"></i>
            </div>
            <h3>TAXI VLB, POUR TOUS VOS TRAJETS VIP</h3>
            <div className="service-section-content">
              <div className="service-text">
                <p>
                  Que vous ayez besoin de conseils sur les meilleurs endroits à visiter en ville, d'une assistance pour vos bagages ou simplement de tranquillité d'esprit pendant votre trajet, je vous assure un service personnalisé et attentionné à chaque étape de votre voyage.
                </p>
                <p>
                  Je mets tout en œuvre pour vous garantir une expérience de transport sereine, où le luxe et le raffinement se conjuguent harmonieusement pour créer des souvenirs inoubliables.
                </p>
                <p>
                  Avec ma prestation VIP, chaque trajet devient une occasion spéciale, où vous pouvez vous détendre, vous relaxer et profiter du voyage en toute sérénité.
                </p>
              </div>
              <div className="service-section-image">
                <img src="/assets/images/luxury-car.jpg" alt="Voiture de luxe" />
              </div>
            </div>
          </div>
          
          <div className="service-section">
            <div className="service-icon">
              <i className="fas fa-gem"></i>
            </div>
            <h3>PRESTATIONS DE LUXE</h3>
            <div className="service-section-content reverse">
              <div className="service-section-image">
                <img src="/assets/images/vip-amenities.jpg" alt="Équipements VIP" />
              </div>
              <div className="service-text">
                <ul className="service-list">
                  <li>
                    <span className="service-list-icon"><i className="fas fa-check"></i></span>
                    <span>Véhicules haut de gamme (Mercedes-Benz Classe V)</span>
                  </li>
                  <li>
                    <span className="service-list-icon"><i className="fas fa-check"></i></span>
                    <span>Chauffeur en tenue professionnelle</span>
                  </li>
                  <li>
                    <span className="service-list-icon"><i className="fas fa-check"></i></span>
                    <span>Service de conciergerie personnalisé</span>
                  </li>
                  <li>
                    <span className="service-list-icon"><i className="fas fa-check"></i></span>
                    <span>Boissons et rafraîchissements offerts</span>
                  </li>
                  <li>
                    <span className="service-list-icon"><i className="fas fa-check"></i></span>
                    <span>Wi-Fi à bord et chargeurs pour appareils</span>
                  </li>
                  <li>
                    <span className="service-list-icon"><i className="fas fa-check"></i></span>
                    <span>Assistance bagages et portier</span>
                  </li>
                  <li>
                    <span className="service-list-icon"><i className="fas fa-check"></i></span>
                    <span>Confidentialité et discrétion garanties</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cta-section">
          <h3>Contactez-moi pour plus d'informations sur mes prestations VIP et mes services de transport vers ou depuis les gares et les aéroports.</h3>
          <Link to="/contact" className="cta-button">Me contacter</Link>
        </div>
      </div>
      
      <div className="booking-section">
        <div className="service-container">
          <h2>RÉSERVEZ VOTRE TRANSPORT VIP</h2>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default VipServicePage;