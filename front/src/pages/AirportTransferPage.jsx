import { Link } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/ServicePage.css';

const AirportTransferPage = () => {
  return (
    <div className="service-page airport-transfer-page">
      <div className="service-header">
        <h1>SERVICE DE TAXI À VERRIÈRES LE BUISSON</h1>
        <h2>TAXI VLB, POUR VOS TRAJETS VERS OÙ DEPUIS LES GARES ET LES AÉROPORTS</h2>
      </div>
      
      <div className="service-overview">
        <div className="service-container">
          <div className="service-content">
            <p>
              Taxi VLB est votre partenaire de confiance pour assurer un service de transport sûr et professionnel.
              Je suis disponible pour vous transporter vers ou depuis les gares et les aéroports.
              Je suis à votre service pour vous assurer un voyage confortable et sans stress, que vous soyez en partance pour une destination exotique ou que vous reveniez d'un voyage d'affaires.
            </p>
          </div>
          
          <div className="service-image-container">
            <img src="/assets/images/airport-transfer.jpg" alt="Transfert aéroport" className="service-image" />
          </div>
        </div>
      </div>
      
      <div className="service-details">
        <div className="service-container">
          <div className="service-section">
            <div className="service-icon">
              <i className="fas fa-plane"></i>
            </div>
            <h3>TRAJETS VERS OÙ DEPUIS L'AÉROPORT</h3>
            <div className="service-section-content">
              <div className="service-text">
                <p>
                  Je m'engage à vous fournir un service ponctuel et fiable pour vous conduire vers l'aéroport en toute tranquillité d'esprit.
                </p>
                <p>
                  Que vous voyagiez seul, en famille ou en groupe, je suis à votre service pour m'assurer que votre trajet soit agréable et sans tracas.
                </p>
                <p>
                  De plus, à votre retour, je serai là pour vous accueillir à l'aéroport et vous ramener chez vous en toute sécurité.
                </p>
              </div>
              <div className="service-section-image">
                <img src="/assets/images/airport-waiting.jpg" alt="Attente à l'aéroport" />
              </div>
            </div>
          </div>
          
          <div className="service-section">
            <div className="service-icon">
              <i className="fas fa-train"></i>
            </div>
            <h3>TRANSFERT VERS LES GARES TGV</h3>
            <div className="service-section-content reverse">
              <div className="service-section-image">
                <img src="/assets/images/train-station.jpg" alt="Gare TGV" />
              </div>
              <div className="service-text">
                <p>
                  Avec mon service de taxi, je vous garantis une prise en charge rapide et efficace pour vous conduire à la gare à temps pour votre train.
                </p>
                <p>
                  Vous pouvez compter sur moi pour vous offrir un service courtois et professionnel, que ce soit pour un voyage d'affaires ou des vacances en famille.
                </p>
                <p>
                  De plus, si vous arrivez en train, je serai disponible pour vous accueillir à la gare et vous ramener à votre destination finale.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cta-section">
          <h3>N'hésitez pas à me contacter pour réserver votre <Link to="/trajets-longues-distances">trajet de longue distance</Link> ou <Link to="/trajets-sur-mesure">sur mesure</Link>.</h3>
          <Link to="/contact" className="cta-button">Me contacter</Link>
        </div>
      </div>
      
      <div className="booking-section">
        <div className="service-container">
          <h2>RÉSERVEZ VOTRE TRANSFERT</h2>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default AirportTransferPage;