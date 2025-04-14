import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/ServicePage.css';

// Animation utility hook
const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
};

const AirportTransferPage = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [overviewRef, overviewVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [bookingRef, bookingVisible] = useIntersectionObserver();

  // Aéroports desservis
  const airports = [
    { name: 'Paris Charles de Gaulle (CDG)', distance: '25 km', time: '30 min' },
    { name: 'Paris Orly (ORY)', distance: '18 km', time: '25 min' },
    { name: 'Paris Le Bourget', distance: '20 km', time: '28 min' },
    { name: 'Aéroport de Beauvais-Tillé', distance: '85 km', time: '75 min' }
  ];

  // Gares desservies
  const stations = [
    { name: 'Gare du Nord', services: ['Eurostar', 'Thalys'] },
    { name: 'Gare de Lyon', services: ['TGV Sud-Est', 'Lyria'] },
    { name: 'Gare Montparnasse', services: ['TGV Atlantique'] },
    { name: 'Gare de l\'Est', services: ['TGV Est', 'ICE Allemagne'] }
  ];

  return (
    <div className="service-page airport-transfer-page">
      <div 
        ref={headerRef} 
        className={`service-hero ${headerVisible ? 'animate' : ''}`}
        style={{ backgroundImage: 'url(/assets/images/luxury-airport-transfer.jpg)' }}
      >
        <div className="service-hero-overlay"></div>
        <div className="service-hero-content">
          <h1 className="slide-in-left">TRANSFERTS AÉROPORT & GARE</h1>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-icon"><i className="fas fa-plane"></i></span>
            <span className="separator-line"></span>
          </div>
          <p className="slide-in-right">Un service d'exception pour vos arrivées et départs</p>
        </div>
      </div>
      
      <div ref={overviewRef} className={`service-overview ${overviewVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="service-overview-content">
            <div className="gold-accent slide-in-left">
              <h2>UN SERVICE PREMIUM POUR VOS TRANSFERTS</h2>
              <p className="subtitle">Ponctualité, confort et élégance pour tous vos déplacements</p>
            </div>
            
            <div className="overview-text fade-in">
              <p>
                Notre service de transfert aéroport garantit une expérience sans faille pour vos arrivées et départs.
                Avec notre flotte de véhicules haut de gamme et nos chauffeurs professionnels, chaque trajet devient un moment d'exception.
              </p>
              <p>
                Dites adieu au stress des déplacements vers les aéroports et les gares. Nous prenons en charge l'ensemble de votre transfert avec une attention particulière pour chaque détail.
              </p>
            </div>
            
            <div className="overview-features stagger-items">
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-1' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="feature-content">
                  <h3>Ponctualité garantie</h3>
                  <p>Nos chauffeurs vous attendent toujours avec une avance confortable, pour un départ sans stress.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-2' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-plane-arrival"></i>
                </div>
                <div className="feature-content">
                  <h3>Suivi des vols en temps réel</h3>
                  <p>Nous surveillons l'état de votre vol pour nous adapter aux retards ou aux arrivées anticipées.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-3' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-concierge-bell"></i>
                </div>
                <div className="feature-content">
                  <h3>Accueil personnalisé</h3>
                  <p>Notre chauffeur vous accueille à votre arrivée avec une pancarte nominative et prend en charge vos bagages.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-4' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-glass-martini-alt"></i>
                </div>
                <div className="feature-content">
                  <h3>Prestations à bord</h3>
                  <p>Eau minérale, boissons rafraîchissantes et presse du jour pour un voyage en toute sérénité.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={servicesRef} className={`service-details ${servicesVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">NOS SERVICES DE TRANSFERT PREMIUM</h2>
          <p className="subtitle fade-in">Des prestations d'excellence pour chaque besoin</p>
          
          <div className="services-grid">
            <div className="service-detail-card slide-in-left">
              <div className="service-detail-icon">
                <i className="fas fa-plane-departure"></i>
              </div>
              <h3>TRANSFERT VERS L'AÉROPORT</h3>
              <div className="service-detail-content">
                <p>
                  Commencez votre voyage dans les meilleures conditions. Votre chauffeur se présente à l'adresse de votre choix 
                  avec une ponctualité irréprochable. Il prend en charge vos bagages et vous conduit à votre terminal 
                  dans un véhicule luxueux. Vous bénéficiez d'une conduite souple et d'un environnement calme pour 
                  vous préparer sereinement à votre vol.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Ponctualité garantie</li>
                  <li><i className="fas fa-check"></i>Assistance bagages</li>
                  <li><i className="fas fa-check"></i>Connaissance parfaite des accès aéroport</li>
                  <li><i className="fas fa-check"></i>Dépôt directement devant votre terminal</li>
                </ul>
              </div>
            </div>
            
            <div className="service-detail-image slide-in-right">
              <img src="/assets/images/airport-departure.jpg" alt="Transfert vers l'aéroport" loading="lazy" />
            </div>
          </div>
          
          <div className="services-grid reverse">
            <div className="service-detail-image slide-in-left">
              <img src="/assets/images/airport-arrival.jpg" alt="Accueil à l'aéroport" loading="lazy" />
            </div>
            
            <div className="service-detail-card slide-in-right">
              <div className="service-detail-icon">
                <i className="fas fa-plane-arrival"></i>
              </div>
              <h3>ACCUEIL À L'AÉROPORT</h3>
              <div className="service-detail-content">
                <p>
                  Après un long vol, profitez d'un accueil personnalisé et chaleureux. Votre chauffeur vous attend 
                  en zone d'arrivée avec une pancarte nominative. Il vous accompagne jusqu'au véhicule, s'occupe de vos 
                  bagages et vous conduit à votre destination en toute sérénité. Un service attentionné qui fait 
                  toute la différence.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Panneau d'accueil avec votre nom</li>
                  <li><i className="fas fa-check"></i>Suivi en temps réel de votre vol</li>
                  <li><i className="fas fa-check"></i>Accueil personnalisé dès la sortie</li>
                  <li><i className="fas fa-check"></i>30 minutes de stationnement offertes</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="services-grid">
            <div className="service-detail-card slide-in-left">
              <div className="service-detail-icon">
                <i className="fas fa-train"></i>
              </div>
              <h3>TRANSFERT GARE & TRANSFERT INTER-GARES</h3>
              <div className="service-detail-content">
                <p>
                  Simplifiez vos trajets en train avec notre service de transfert gare. Que vous ayez besoin d'être 
                  déposé pour votre départ ou accueilli à votre arrivée, nos chauffeurs connaissent parfaitement tous les accès et 
                  vous permettent de voyager sans stress. Notre service inter-gares facilite également vos correspondances 
                  à Paris entre les différentes gares.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Connaissance parfaite des accès</li>
                  <li><i className="fas fa-check"></i>Suivi en temps réel des retards</li>
                  <li><i className="fas fa-check"></i>Transfert inter-gares optimisé</li>
                  <li><i className="fas fa-check"></i>Véhicules adaptés aux gares parisiennes</li>
                </ul>
              </div>
            </div>
            
            <div className="service-detail-image slide-in-right">
              <img src="/assets/images/train-station-transfer.jpg" alt="Transfert gare" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="airports-section">
        <div className="container">
          <div className="section-heading">
            <h2>AÉROPORTS ET GARES DESSERVIS</h2>
            <p className="subtitle">Un service complet pour tous vos déplacements</p>
          </div>
          
          <div className="destinations-grid">
            <div className="destination-card">
              <div className="destination-header">
                <i className="fas fa-plane"></i>
                <h3>Aéroports</h3>
              </div>
              <ul className="destination-list">
                {airports.map((airport, index) => (
                  <li key={index}>
                    <span className="destination-name">{airport.name}</span>
                    <div className="destination-details">
                      <span><i className="fas fa-road"></i> {airport.distance}</span>
                      <span><i className="fas fa-clock"></i> {airport.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="destination-card">
              <div className="destination-header">
                <i className="fas fa-train"></i>
                <h3>Gares</h3>
              </div>
              <ul className="destination-list">
                {stations.map((station, index) => (
                  <li key={index}>
                    <span className="destination-name">{station.name}</span>
                    <div className="destination-details">
                      <span><i className="fas fa-exchange-alt"></i> {station.services.join(', ')}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="client-testimonial">
        <div className="container">
          <div className="testimonial-content">
            <div className="testimonial-quote">
              <i className="fas fa-quote-left"></i>
            </div>
            <p>
              "Un service impeccable ! Mon chauffeur était en avance, très professionnel et courtois. 
              Le véhicule était luxueux et d'une propreté irréprochable. Après un long vol, 
              ce fut un véritable plaisir d'être accueilli de cette façon. Je recommande vivement !"
            </p>
            <div className="testimonial-author">
              <div className="author-name">Jean-Pierre L.</div>
              <div className="author-title">Directeur Commercial</div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={bookingRef} className={`booking-section ${bookingVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="section-heading">
            <h2>RÉSERVEZ VOTRE TRANSFERT</h2>
            <p className="subtitle">Un service sur-mesure pour répondre à vos attentes les plus exigeantes</p>
          </div>
          
          <div className={`booking-container fade-in ${bookingVisible ? 'visible' : ''}`}>
            <BookingForm />
          </div>
        </div>
      </div>
      
      <div className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h3>Des exigences particulières pour votre transfert ?</h3>
            <p>Contactez-nous directement pour un service entièrement personnalisé</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Demande personnalisée
              </Link>
              <a href="tel:+33600000000" className="btn btn-outline">
                <i className="fas fa-phone"></i>
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportTransferPage;