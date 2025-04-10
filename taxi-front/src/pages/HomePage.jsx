import { Link } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Taxi pour tous vos trajets quotidiens</h1>
          <p>Service de qualité pour tous vos déplacements. Disponible 24/7.</p>
          <div className="hero-buttons">
            <Link to="/booking" className="button primary">Réserver maintenant</Link>
            <Link to="/contact" className="button secondary">Nous contacter</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/taxi-hero.jpg" alt="Taxi Service" />
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <h2>Nos services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-plane"></i>
              </div>
              <h3>Transferts aéroport</h3>
              <p>Service ponctuel et fiable pour tous vos trajets vers et depuis les aéroports.</p>
              <Link to="/services/airport" className="service-link">En savoir plus</Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-train"></i>
              </div>
              <h3>Transferts gare</h3>
              <p>Arrivez à la gare à l'heure ou soyez pris en charge dès votre arrivée.</p>
              <Link to="/services/train" className="service-link">En savoir plus</Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-city"></i>
              </div>
              <h3>Trajets urbains</h3>
              <p>Pour tous vos déplacements en ville, professionnels ou personnels.</p>
              <Link to="/services/city" className="service-link">En savoir plus</Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-route"></i>
              </div>
              <h3>Longues distances</h3>
              <p>Voyagez confortablement pour vos trajets longue distance.</p>
              <Link to="/services/distance" className="service-link">En savoir plus</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="booking-section" id="booking">
        <div className="container">
          <h2>Réservez votre course</h2>
          <BookingForm />
        </div>
      </section>

      <section className="advantages-section">
        <div className="container">
          <h2>Pourquoi nous choisir</h2>
          <div className="advantages-grid">
            <div className="advantage-item">
              <div className="advantage-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Ponctualité</h3>
              <p>Nous vous garantissons une prise en charge à l'heure convenue.</p>
            </div>

            <div className="advantage-item">
              <div className="advantage-icon">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <h3>Tarifs transparents</h3>
              <p>Pas de surprise, nos tarifs sont clairs et sans frais cachés.</p>
            </div>

            <div className="advantage-item">
              <div className="advantage-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3>Véhicules confortables</h3>
              <p>Une flotte de véhicules récents et bien entretenus pour votre confort.</p>
            </div>

            <div className="advantage-item">
              <div className="advantage-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>Service client 24/7</h3>
              <p>Notre équipe est disponible jour et nuit pour répondre à vos besoins.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2>Ce que disent nos clients</h2>
          <div className="testimonials-slider">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Service excellent et ponctuel. Le chauffeur était très professionnel et courtois. Je recommande vivement ce service de taxi."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="/images/testimonial-1.jpg" alt="Client" />
                </div>
                <div className="author-info">
                  <h4>Sophie D.</h4>
                  <p>Paris</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Très satisfait du service. Réservation facile, chauffeur ponctuel et trajet agréable. Je n'hésiterai pas à faire appel à eux pour mes prochains déplacements."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="/images/testimonial-2.jpg" alt="Client" />
                </div>
                <div className="author-info">
                  <h4>Thomas L.</h4>
                  <p>Lyon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Prêt à réserver votre taxi ?</h2>
          <p>Profitez de notre service professionnel pour tous vos déplacements</p>
          <Link to="/booking" className="cta-button">Réserver maintenant</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;