import { Link } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/ServicePage.css';

const LongDistancePage = () => {
  return (
    <div className="service-page long-distance-page">
      <div className="service-header">
        <h1>TRAJETS DE LONGUES DISTANCES À VERRIÈRES LE BUISSON</h1>
        <h2>DÉCOUVREZ LES SERVICES DE TRANSPORT PROPOSÉS PAR TAXI VLB PRÈS D'IGNY ET BIÈVRES</h2>
      </div>
      
      <div className="service-overview">
        <div className="service-container">
          <div className="service-content">
            <p>
              Vous êtes à la recherche d'un service fiable pour vos trajets de longues distances ? Faites confiance à Taxi VLB pour vous assurer un voyage sûr.
              Que vous voyagiez seul, en famille ou en groupe, je suis en mesure de vous transporter en toute sécurité vers votre destination.
            </p>
          </div>
          
          <div className="service-image-container">
            <img src="/assets/images/long-distance.jpg" alt="Trajet longue distance" className="service-image" />
          </div>
        </div>
      </div>
      
      <div className="service-details">
        <div className="service-container">
          <div className="service-section">
            <div className="service-icon">
              <i className="fas fa-road"></i>
            </div>
            <h3>TRAJET DE LONGUE DISTANCE PRÈS D'IGNY ET BIÈVRES</h3>
            <div className="service-section-content">
              <div className="service-text">
                <p>
                  Profitez de mon service de transport dédié aux professionnels et aux particuliers pour réaliser vos déplacements en toute sécurité.
                </p>
                <p>
                  Je vous propose un service de transfert unique pour vos trajets de longues distances, sans limites de kilomètres.
                </p>
                <p>
                  Je mets à votre disposition des voitures spacieuses et bien équipées pour voyager en toute sérénité.
                </p>
                <p>
                  Que vous ayez besoin d'aller à une ville voisine ou à l'autre bout du pays, je vous accompagne tout au long de votre trajet.
                </p>
                <p>
                  Avec une attention particulière à la sécurité, au confort et à la ponctualité, je m'engage à vous fournir une expérience de voyage inégalée.
                </p>
              </div>
              <div className="service-section-image">
                <img src="/assets/images/driving.jpg" alt="Conduite longue distance" />
              </div>
            </div>
          </div>
          
          <div className="service-section">
            <div className="service-icon">
              <i className="fas fa-user-tie"></i>
            </div>
            <h3>TRAJET QUOTIDIEN PRÈS D'IGNY ET BIÈVRES</h3>
            <div className="service-section-content reverse">
              <div className="service-section-image">
                <img src="/assets/images/business-travel.jpg" alt="Trajet quotidien" />
              </div>
              <div className="service-text">
                <p>
                  Faites appel à un chauffeur ponctuel pour répondre à vos besoins quotidiens de déplacement.
                </p>
                <p>
                  Que ce soit pour vous rendre au travail, à des rendez-vous professionnels ou personnels, je vous assure un service fiable et efficace.
                </p>
                <p>
                  Avec des horaires flexibles et des itinéraires bien planifiés, je m'efforce de rendre vos déplacements quotidiens aussi simples et agréables que possible.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cta-section">
          <h3>N'hésitez pas à me contacter pour plus de détails sur mes services de transport vers ou depuis les gares et les aéroports.</h3>
          <Link to="/contact" className="cta-button">Me contacter</Link>
        </div>
      </div>
      
      <div className="booking-section">
        <div className="service-container">
          <h2>RÉSERVEZ VOTRE TRAJET LONGUE DISTANCE</h2>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default LongDistancePage;