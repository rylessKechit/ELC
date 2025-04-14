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

const EventsServicePage = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [overviewRef, overviewVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [bookingRef, bookingVisible] = useIntersectionObserver();

  // Event types
  const eventTypes = [
    { title: 'Mariages', text: 'Services spéciaux pour votre jour spécial', icon: 'ring' },
    { title: 'Soirées corporate', text: 'Transport élégant pour vos événements d\'entreprise', icon: 'glass-cheers' },
    { title: 'Galas & Cérémonies', text: 'Arrivez avec style sur le tapis rouge', icon: 'award' },
    { title: 'Événements VIP', text: 'Service discret pour personnalités', icon: 'star' }
  ];

  return (
    <div className="service-page events-service-page">
      <div 
        ref={headerRef} 
        className={`service-hero ${headerVisible ? 'animate' : ''}`}
        style={{ backgroundImage: 'url(/assets/images/red-carpet-arrival.jpg)' }}
      >
        <div className="service-hero-overlay"></div>
        <div className="service-hero-content">
          <h1 className="slide-in-left">ÉVÉNEMENTS & SOIRÉES PRESTIGIEUSES</h1>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-icon"><i className="fas fa-glass-cheers"></i></span>
            <span className="separator-line"></span>
          </div>
          <p className="slide-in-right">Créez l'entrée parfaite pour vos moments exceptionnels</p>
        </div>
      </div>
      
      <div ref={overviewRef} className={`service-overview ${overviewVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="service-overview-content">
            <div className="gold-accent slide-in-left">
              <h2>TRANSPORT D'EXCEPTION POUR VOS ÉVÉNEMENTS</h2>
              <p className="subtitle">Des services sur mesure pour sublimer vos moments importants</p>
            </div>
            
            <div className="overview-text fade-in">
              <p>
                La réussite d'un événement exceptionnel repose sur chaque détail, y compris l'arrivée des invités. 
                Notre service de transport pour événements et soirées vous garantit une entrée remarquée et mémorable,
                à la hauteur de l'importance de votre occasion spéciale.
              </p>
              <p>
                Que ce soit pour un mariage, une soirée de gala, une remise de prix ou un événement d'entreprise 
                prestigieux, nous vous offrons un service de transport haut de gamme, personnalisé selon vos besoins
                spécifiques et impeccablement exécuté.
              </p>
            </div>
            
            <div className="event-types">
              {eventTypes.map((event, index) => (
                <div 
                  key={index} 
                  className={`event-type-item ${overviewVisible ? 'visible' : ''}`}
                  style={{animationDelay: `${0.2 * index}s`}}
                >
                  <div className="event-icon">
                    <i className={`fas fa-${event.icon}`}></i>
                  </div>
                  <div className="event-title">{event.title}</div>
                  <div className="event-text">{event.text}</div>
                </div>
              ))}
            </div>
            
            <div className="overview-features stagger-items">
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-1' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-car-side"></i>
                </div>
                <div className="feature-content">
                  <h3>Flotte prestigieuse</h3>
                  <p>Des véhicules haut de gamme impeccablement entretenus pour faire sensation à votre arrivée.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-2' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-user-tie"></i>
                </div>
                <div className="feature-content">
                  <h3>Chauffeurs d'élite</h3>
                  <p>Professionnels formés au protocole et à l'étiquette des événements prestigieux.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-3' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-tasks"></i>
                </div>
                <div className="feature-content">
                  <h3>Coordination parfaite</h3>
                  <p>Planification minutieuse et synchronisation avec le déroulement de votre événement.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-4' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-camera"></i>
                </div>
                <div className="feature-content">
                  <h3>Photogénique</h3>
                  <p>Véhicules spécialement préparés pour être mis en valeur dans vos photos et vidéos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={servicesRef} className={`service-details ${servicesVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">NOS SERVICES ÉVÉNEMENTIELS</h2>
          <p className="subtitle fade-in">Des solutions adaptées à chaque occasion spéciale</p>
          
          <div className="services-grid">
            <div className="service-detail-card slide-in-left">
              <div className="service-detail-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>SERVICE MARIAGE</h3>
              <div className="service-detail-content">
                <p>
                  Pour le plus beau jour de votre vie, nous vous proposons un service complet qui s'occupe de tous 
                  les aspects du transport. De la préparation à l'église, puis à la réception, et enfin vers votre 
                  lieu de nuit de noces, nos véhicules d'exception sublimeront votre journée.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Décoration personnalisée du véhicule</li>
                  <li><i className="fas fa-check"></i>Champagne et rafraîchissements à bord</li>
                  <li><i className="fas fa-check"></i>Coordination avec votre photographe/vidéaste</li>
                  <li><i className="fas fa-check"></i>Transport des invités d'honneur</li>
                  <li><i className="fas fa-check"></i>Service de navette pour les invités</li>
                </ul>
              </div>
            </div>
            
            <div className="service-detail-image slide-in-right">
              <img src="/assets/images/wedding-car.jpg" alt="Service mariage" loading="lazy" />
            </div>
          </div>
          
          <div className="services-grid reverse">
            <div className="service-detail-image slide-in-left">
              <img src="/assets/images/gala-event.jpg" alt="Gala et cérémonies" loading="lazy" />
            </div>
            
            <div className="service-detail-card slide-in-right">
              <div className="service-detail-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>GALAS & CÉRÉMONIES</h3>
              <div className="service-detail-content">
                <p>
                  Pour les soirées de gala, remises de prix et cérémonies prestigieuses, notre service offre une 
                  arrivée remarquée et élégante. Nos chauffeurs d'élite, formés au protocole, vous accompagnent 
                  jusqu'au tapis rouge avec une discrétion et un professionnalisme impeccables.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Coordination avec les organisateurs de l'événement</li>
                  <li><i className="fas fa-check"></i>Respect du protocole et de l'ordre d'arrivée</li>
                  <li><i className="fas fa-check"></i>Service d'ouverture de porte</li>
                  <li><i className="fas fa-check"></i>Véhicules impeccables pour les photos officielles</li>
                  <li><i className="fas fa-check"></i>Service de retour disponible à toute heure</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="services-grid">
            <div className="service-detail-card slide-in-left">
              <div className="service-detail-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>ÉVÉNEMENTS CORPORATE</h3>
              <div className="service-detail-content">
                <p>
                  Impressionnez vos clients, partenaires et collaborateurs avec un service de transport 
                  qui reflète l'excellence de votre entreprise. Nous gérons le transport pour vos soirées de gala d'entreprise,
                  lancements de produits, conférences et séminaires avec un souci du détail irréprochable.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Transport des dirigeants et VIP</li>
                  <li><i className="fas fa-check"></i>Service de navette pour les participants</li>
                  <li><i className="fas fa-check"></i>Signalétique personnalisée aux couleurs de votre entreprise</li>
                  <li><i className="fas fa-check"></i>Coordination logistique complète</li>
                  <li><i className="fas fa-check"></i>Facturation centralisée et reporting détaillé</li>
                </ul>
              </div>
            </div>
            
            <div className="service-detail-image slide-in-right">
              <img src="/assets/images/corporate-event.jpg" alt="Événement corporate" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="event-packages-section">
        <div className="container">
          <h2>NOS FORMULES ÉVÉNEMENTIELLES</h2>
          <p className="subtitle">Des offres sur mesure pour chaque occasion</p>
          
          <div className="packages-grid">
            <div className="package-card">
              <div className="package-header">
                <h3>ESSENTIEL</h3>
                <div className="package-price">À partir de 390€</div>
              </div>
              <div className="package-content">
                <ul className="package-features">
                  <li><i className="fas fa-check"></i>Berline luxe (Mercedes Classe E)</li>
                  <li><i className="fas fa-check"></i>Chauffeur en tenue formelle</li>
                  <li><i className="fas fa-check"></i>Eau et rafraîchissements</li>
                  <li><i className="fas fa-check"></i>3 heures de service</li>
                  <li><i className="fas fa-check"></i>Service d'ouverture de porte</li>
                </ul>
                <Link to="/contact" className="package-button">
                  En savoir plus
                </Link>
              </div>
            </div>
            
            <div className="package-card featured">
              <div className="package-badge">Populaire</div>
              <div className="package-header">
                <h3>PRESTIGE</h3>
                <div className="package-price">À partir de 790€</div>
              </div>
              <div className="package-content">
                <ul className="package-features">
                  <li><i className="fas fa-check"></i>Berline premium (Mercedes Classe S)</li>
                  <li><i className="fas fa-check"></i>Chauffeur en tenue formelle</li>
                  <li><i className="fas fa-check"></i>Champagne et rafraîchissements</li>
                  <li><i className="fas fa-check"></i>5 heures de service</li>
                  <li><i className="fas fa-check"></i>Décoration florale sur demande</li>
                  <li><i className="fas fa-check"></i>Tapis rouge pour l'embarquement</li>
                  <li><i className="fas fa-check"></i>Coordination avec photographe</li>
                </ul>
                <Link to="/contact" className="package-button">
                  En savoir plus
                </Link>
              </div>
            </div>
            
            <div className="package-card">
              <div className="package-header">
                <h3>ROYAL</h3>
                <div className="package-price">À partir de 1 290€</div>
              </div>
              <div className="package-content">
                <ul className="package-features">
                  <li><i className="fas fa-check"></i>Voiture de collection ou SUV de luxe</li>
                  <li><i className="fas fa-check"></i>Chauffeur en tenue formelle premium</li>
                  <li><i className="fas fa-check"></i>Dom Pérignon et mignardises</li>
                  <li><i className="fas fa-check"></i>Service illimité (jusqu'à 8h)</li>
                  <li><i className="fas fa-check"></i>Décoration personnalisée complète</li>
                  <li><i className="fas fa-check"></i>Tapis rouge et service portier</li>
                  <li><i className="fas fa-check"></i>Répétition incluse la veille</li>
                  <li><i className="fas fa-check"></i>Service conciergerie pendant l'événement</li>
                </ul>
                <Link to="/contact" className="package-button">
                  En savoir plus
                </Link>
              </div>
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
              "Le service pour notre mariage était absolument parfait. La Bentley décorée avec élégance, 
              le chauffeur d'une courtoisie exemplaire et le champagne à bord ont rendu ce moment encore plus magique. 
              Nos invités ont également apprécié le service de navette qui a permis à chacun de profiter pleinement 
              de la soirée. Un grand merci pour avoir contribué à rendre notre jour si spécial !"
            </p>
            <div className="testimonial-author">
              <div className="author-name">Marie & Thomas</div>
              <div className="author-title">Mariés en juin 2024</div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={bookingRef} className={`booking-section ${bookingVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="section-heading">
            <h2>RÉSERVEZ POUR VOTRE ÉVÉNEMENT</h2>
            <p className="subtitle">Un service exceptionnel pour votre occasion spéciale</p>
          </div>
          
          <div className={`booking-container fade-in ${bookingVisible ? 'visible' : ''}`}>
            <BookingForm />
          </div>
        </div>
      </div>
      
      <div className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h3>Besoin d'une solution personnalisée pour votre événement ?</h3>
            <p>Nos spécialistes événementiels sont à votre écoute pour créer une expérience sur mesure</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Demander un devis personnalisé
              </Link>
              <a href="tel:+33600000000" className="btn btn-outline">
                <i className="fas fa-phone"></i>
                Appeler un expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsServicePage;