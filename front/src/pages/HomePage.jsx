import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>TAXI VLB, POUR TOUS VOS TRAJETS PROFESSIONNELS ET PRIVÉS</h1>
          <p>Taxi VLB est une entreprise de taxi basée à Verrières le Buisson.</p>
          <p>Disponible 7j/7 et 24h/24, je suis à votre service pour vous transporter vers la destination souhaitée.</p>
          <div className="hero-buttons">
            <Link to="/contact" className="hero-button primary">
              Me contacter
            </Link>
            <a href="#booking" className="hero-button secondary">
              Réserver une course
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/assets/images/taxi-hero.jpg" alt="Taxi VLB service" />
        </div>
      </section>
      
      <section className="services-overview">
        <h2>NOS SERVICES DE TRANSPORT</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-image">
              <img src="/assets/images/airport-transfer.jpg" alt="Service aéroport" />
            </div>
            <h3>TRAJETS AÉROPORT / GARE</h3>
            <p>Transferts vers ou depuis les aéroports et gares avec ponctualité garantie.</p>
            <Link to="/trajets-aeroport-gare" className="service-link">En savoir plus</Link>
          </div>
          
          <div className="service-card">
            <div className="service-image">
              <img src="/assets/images/long-distance.jpg" alt="Longues distances" />
            </div>
            <h3>TRAJETS LONGUES DISTANCES</h3>
            <p>Service de transport pour vos trajets longue distance, sans limite de kilomètres.</p>
            <Link to="/trajets-longues-distances" className="service-link">En savoir plus</Link>
          </div>
          
          <div className="service-card">
            <div className="service-image">
              <img src="/assets/images/custom-transfer.jpg" alt="Sur mesure" />
            </div>
            <h3>TRAJETS SUR MESURE</h3>
            <p>Solutions adaptées à vos besoins spécifiques, pour particuliers et professionnels.</p>
            <Link to="/trajets-sur-mesure" className="service-link">En savoir plus</Link>
          </div>
          
          <div className="service-card">
            <div className="service-image">
              <img src="/assets/images/vip-service.jpg" alt="Service VIP" />
            </div>
            <h3>PRESTATION VIP</h3>
            <p>Service premium avec véhicule de luxe et chauffeur professionnel discret.</p>
            <Link to="/prestation-vip" className="service-link">En savoir plus</Link>
          </div>
        </div>
      </section>
      
      <section id="booking" className="booking-section">
        <h2>RÉSERVEZ VOTRE COURSE</h2>
        <div className="booking-container">
          <BookingForm />
        </div>
      </section>
      
      <section className="advantages-section">
        <h2>LES POINTS FORTS DE VOTRE TAXI PRÈS DE MASSY</h2>
        <div className="advantages-grid">
          <div className="advantage-item">
            <div className="advantage-icon">
              <i className="fas fa-user-tie"></i>
            </div>
            <h3>Chauffeurs professionnels</h3>
            <p>Des chauffeurs expérimentés pour une conduite fluide et sûre.</p>
          </div>
          
          <div className="advantage-item">
            <div className="advantage-icon">
              <i className="fas fa-car"></i>
            </div>
            <h3>Véhicules confortables</h3>
            <p>Des véhicules spacieux et bien entretenus pour voyager sereinement.</p>
          </div>
          
          <div className="advantage-item">
            <div className="advantage-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Disponibilité 24h/24 et 7j/7</h3>
            <p>Un service disponible à toute heure, tous les jours de la semaine.</p>
          </div>
          
          <div className="advantage-item">
            <div className="advantage-icon">
              <i className="fas fa-thumbs-up"></i>
            </div>
            <h3>Flexibilité</h3>
            <p>Des solutions adaptées à toutes vos demandes de transport.</p>
          </div>
          
          <div className="advantage-item">
            <div className="advantage-icon">
              <i className="fas fa-bolt"></i>
            </div>
            <h3>Réactivité</h3>
            <p>Une prise en charge rapide et efficace pour tous vos déplacements.</p>
          </div>
          
          <div className="advantage-item">
            <div className="advantage-icon">
              <i className="fas fa-hourglass-end"></i>
            </div>
            <h3>Ponctualité</h3>
            <p>Arrivée ponctuelle garantie pour vos rendez-vous importants.</p>
          </div>
        </div>
      </section>
      
      <section className="testimonials-section">
        <h2>LES AVIS ET LES TÉMOIGNAGES DE MES CLIENTS</h2>
        <div className="testimonials-container">
          <div className="testimonial-header">
            <div className="rating-overview">
              <div className="google-rating">
                <img src="/assets/images/google-logo.png" alt="Google" />
                <div className="rating">
                  <span className="rating-value">5.0</span>
                  <div className="stars">
                    ★★★★★
                  </div>
                  <span className="rating-count">(22)</span>
                </div>
              </div>
              <a href="https://g.page/r/CXxx-ReviewPage" target="_blank" rel="noopener noreferrer" className="review-button">
                Donnez-nous votre avis sur Google
              </a>
            </div>
          </div>
          
          <div className="testimonials-slider">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                Bon chauffeur remplaçant "au pied levé" en temps et en heure le taxi initialement prévu... bloqué sur le périphérique par un accident. Chauffeur remplaçant à l'heure et prévenant (une bouteille d'eau à disposition) Belle et confortable voiture. Bonne conduite. Bien
              </p>
              <div className="testimonial-author">
                <img src="/assets/images/avatar-laurent.jpg" alt="Laurent" className="author-avatar" />
                <div className="author-info">
                  <p className="author-name">Laurent Oy'Lamarche</p>
                  <p className="author-date">il y a 28 jours</p>
                </div>
              </div>
            </div>
            
            {/* More testimonials would go here */}
          </div>
        </div>
      </section>
      
      <section className="partners-section">
        <h2>MES PARTENAIRES</h2>
        <p>Je travaille en étroite collaboration avec l'Institut d'Optique et l'Université de Paris-Saclay.</p>
        <div className="partners-logos">
          <img src="/assets/images/logo-institut-optique.png" alt="Institut d'Optique" />
          <img src="/assets/images/logo-paris-saclay.png" alt="Université Paris-Saclay" />
        </div>
      </section>
      
      <section className="service-area-section">
        <h2>ZONE DE DÉPLACEMENT</h2>
        <p>J'assure vos déplacements privés ou professionnels où que vous soyez autour de :</p>
        <div className="areas-grid">
          <div className="area-column">
            <ul>
              <li>Massy</li>
              <li>Verrières-le-Buisson</li>
            </ul>
          </div>
          <div className="area-column">
            <ul>
              <li>Villebon-sur-Yvette</li>
              <li>Champlan</li>
            </ul>
          </div>
          <div className="area-column">
            <ul>
              <li>Saulx-les-Chartreux</li>
              <li>Igny</li>
            </ul>
          </div>
          <div className="area-column">
            <ul>
              <li>Vauhallan</li>
              <li>Villejust</li>
            </ul>
          </div>
        </div>
        <p>N'hésitez pas à me contacter pour plus d'informations sur mon entreprise de transport.</p>
        <div className="contact-button-container">
          <Link to="/contact" className="contact-button">
            Me contacter
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;