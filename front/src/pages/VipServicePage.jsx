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

const VipServicePage = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [overviewRef, overviewVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [fleetRef, fleetVisible] = useIntersectionObserver();
  const [bookingRef, bookingVisible] = useIntersectionObserver();

  // Avantages VIP
  const vipBenefits = [
    { title: 'Discrétion', text: 'Service confidentiel et personnel', icon: 'user-secret' },
    { title: 'Conciergerie', text: 'Assistance 24/7 pour tous vos besoins', icon: 'concierge-bell' },
    { title: 'Sur mesure', text: 'Service entièrement personnalisable', icon: 'sliders-h' },
    { title: 'Excellence', text: 'Expérience irréprochable garantie', icon: 'crown' }
  ];

  // Véhicules VIP
  const vipVehicles = [
    {
      name: 'Mercedes-Benz Classe S',
      description: 'La référence du luxe et du confort',
      features: [
        'Intérieur cuir Nappa exclusif',
        'Sièges massants et ventilés',
        'Système audio Burmester',
        'Tablettes arrière connectées',
        'Minibar personnalisé'
      ],
      image: '/assets/images/mercedes-s-class.jpg'
    },
    {
      name: 'BMW Série 7',
      description: 'Alliance parfaite entre technologie et raffinement',
      features: [
        'Système divertissement Executive Lounge',
        'Sky Lounge panoramique',
        'Ambiance lumineuse personnalisable',
        'Isolation phonique renforcée',
        'Système de massage 8 programmes'
      ],
      image: '/assets/images/bmw-7-series.jpg'
    },
    {
      name: 'Mercedes-Benz Classe V VIP',
      description: 'L\'expérience d\'un salon privé mobile pour vos déplacements en groupe',
      features: [
        'Configuration salon face-à-face',
        'Bar et espace réfrigéré',
        'Écrans HD individuels',
        'Wifi haut débit dédié',
        'Séparation chauffeur avec interphone'
      ],
      image: '/assets/images/mercedes-v-class.jpg'
    }
  ];

  return (
    <div className="service-page vip-service-page">
      <div 
        ref={headerRef} 
        className={`service-hero ${headerVisible ? 'animate' : ''}`}
        style={{ backgroundImage: 'url(/assets/images/vip-service-hero.jpg)' }}
      >
        <div className="service-hero-overlay"></div>
        <div className="service-hero-content">
          <h1 className="slide-in-left">EXPÉRIENCE VIP</h1>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-icon"><i className="fas fa-crown"></i></span>
            <span className="separator-line"></span>
          </div>
          <p className="slide-in-right">Un service d'exception pour une clientèle exigeante</p>
        </div>
      </div>
      
      <div ref={overviewRef} className={`service-overview ${overviewVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="service-overview-content">
            <div className="gold-accent slide-in-left">
              <h2>LE SUMMUM DU LUXE ET DE LA PERSONNALISATION</h2>
              <p className="subtitle">Une expérience de transport exclusive, au-delà de vos attentes</p>
            </div>
            
            <div className="overview-text fade-in">
              <p>
                Notre service VIP redéfinit l'expérience du transport de luxe en proposant bien plus qu'un simple 
                trajet. Nous créons une expérience sur mesure où chaque détail est minutieusement pensé pour 
                répondre à vos exigences les plus élevées et anticiper vos moindres besoins.
              </p>
              <p>
                Que vous soyez une personnalité publique, un chef d'entreprise ou simplement à la recherche 
                d'un service d'exception, notre offre VIP vous garantit discrétion, élégance et perfection 
                à chaque instant de votre parcours avec nous.
              </p>
            </div>
            
            <div className="vip-benefits">
              {vipBenefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className={`vip-benefit-item ${overviewVisible ? 'visible' : ''}`}
                  style={{animationDelay: `${0.2 * index}s`}}
                >
                  <div className="benefit-icon">
                    <i className={`fas fa-${benefit.icon}`}></i>
                  </div>
                  <div className="benefit-title">{benefit.title}</div>
                  <div className="benefit-text">{benefit.text}</div>
                </div>
              ))}
            </div>
            
            <div className="overview-features stagger-items">
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-1' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-user-tie"></i>
                </div>
                <div className="feature-content">
                  <h3>Chauffeurs d'élite</h3>
                  <p>Chauffeurs sélectionnés parmi les meilleurs, formés au protocole et aux standards de service les plus exigeants.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-2' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-glass-martini-alt"></i>
                </div>
                <div className="feature-content">
                  <h3>Service à bord premium</h3>
                  <p>Champagne grand cru, rafraîchissements de luxe et collations gastronomiques selon vos préférences.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-3' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="feature-content">
                  <h3>Disponibilité exclusive</h3>
                  <p>Service disponible 24/7 avec temps d'attente minimal et flexibilité totale pour s'adapter à vos changements de programme.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-4' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="feature-content">
                  <h3>Sécurité renforcée</h3>
                  <p>Protocoles de sécurité stricts et option de chauffeurs formés à la protection rapprochée disponible sur demande.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={servicesRef} className={`service-details ${servicesVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">NOS PRESTATIONS D'EXCEPTION</h2>
          <p className="subtitle fade-in">Des services exclusifs pour une expérience incomparable</p>
          
          <div className="services-grid">
            <div className="service-detail-card slide-in-left">
              <div className="service-detail-icon">
                <i className="fas fa-gem"></i>
              </div>
              <h3>SERVICE PERSONNALISÉ</h3>
              <div className="service-detail-content">
                <p>
                  Avant chaque prise en charge, nous établissons un profil détaillé de vos préférences 
                  pour personnaliser votre expérience. Température idéale, musique préférée, 
                  rafraîchissements de choix, agencement intérieur... Tous les aspects de 
                  votre trajet sont adaptés à vos désirs.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Profil de préférences détaillé et mis à jour</li>
                  <li><i className="fas fa-check"></i>Aménagement du véhicule selon vos besoins</li>
                  <li><i className="fas fa-check"></i>Rafraîchissements et snacks personnalisés</li>
                  <li><i className="fas fa-check"></i>Journaux et magazines de votre choix</li>
                  <li><i className="fas fa-check"></i>Adaptations spéciales sur simple demande</li>
                </ul>
              </div>
            </div>
            
            <div className="service-detail-image slide-in-right">
              <img src="/assets/images/vip-customized-service.jpg" alt="Service personnalisé" loading="lazy" />
            </div>
          </div>
          
          <div className="services-grid reverse">
            <div className="service-detail-image slide-in-left">
              <img src="/assets/images/vip-concierge.jpg" alt="Service conciergerie" loading="lazy" />
            </div>
            
            <div className="service-detail-card slide-in-right">
              <div className="service-detail-icon">
                <i className="fas fa-concierge-bell"></i>
              </div>
              <h3>CONCIERGERIE PRIVÉE</h3>
              <div className="service-detail-content">
                <p>
                  Notre service de conciergerie VIP va bien au-delà du simple transport. Votre assistant 
                  personnel est disponible pour organiser tous les aspects de votre séjour ou 
                  de votre déplacement, des réservations aux arrangements spéciaux.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Réservations de restaurants et établissements exclusifs</li>
                  <li><i className="fas fa-check"></i>Organisation d'événements privés</li>
                  <li><i className="fas fa-check"></i>Accès VIP aux lieux culturels et de divertissement</li>
                  <li><i className="fas fa-check"></i>Services shopping et livraison</li>
                  <li><i className="fas fa-check"></i>Assistance personnelle 24/7</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="services-grid">
            <div className="service-detail-card slide-in-left">
              <div className="service-detail-icon">
                <i className="fas fa-user-shield"></i>
              </div>
              <h3>CONFIDENTIALITÉ ABSOLUE</h3>
              <div className="service-detail-content">
                <p>
                  Pour nos clients exigeant une discrétion totale, nous offrons un service 
                  de confidentialité renforcée. Tous nos chauffeurs signent des accords de 
                  confidentialité stricts, et des protocoles spécifiques sont mis en place 
                  pour garantir votre vie privée.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Accords de confidentialité juridiquement contraignants</li>
                  <li><i className="fas fa-check"></i>Véhicules à vitres teintées et intimité garantie</li>
                  <li><i className="fas fa-check"></i>Itinéraires discrets et entrées privées</li>
                  <li><i className="fas fa-check"></i>Réservations sous pseudonyme</li>
                  <li><i className="fas fa-check"></i>Option chauffeur avec formation sécuritaire avancée</li>
                </ul>
              </div>
            </div>
            
            <div className="service-detail-image slide-in-right">
              <img src="/assets/images/vip-privacy.jpg" alt="Confidentialité absolue" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
      
      <div ref={fleetRef} className={`fleet-section ${fleetVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">NOTRE FLOTTE VIP</h2>
          <p className="subtitle fade-in">Des véhicules d'exception pour une expérience incomparable</p>
          
          <div className="vip-fleet">
            {vipVehicles.map((vehicle, index) => (
              <div key={index} className={`vip-vehicle-card ${fleetVisible ? 'visible' : ''}`} style={{animationDelay: `${0.3 * index}s`}}>
                <div className="vehicle-image">
                  <img src={vehicle.image} alt={vehicle.name} loading="lazy" />
                </div>
                <div className="vehicle-info">
                  <h3>{vehicle.name}</h3>
                  <p className="vehicle-description">{vehicle.description}</p>
                  <ul className="vehicle-features">
                    {vehicle.features.map((feature, i) => (
                      <li key={i}><i className="fas fa-check"></i>{feature}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className="vehicle-cta">
                    Réserver ce véhicule
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="vip-experience-section">
        <div className="container">
          <div className="experience-content">
            <div className="experience-image">
              <img src="/assets/images/vip-experience-collage.jpg" alt="Expérience VIP" loading="lazy" />
            </div>
            <div className="experience-text">
              <h2>L'EXPÉRIENCE VIP</h2>
              <p>
                Chaque aspect de notre service VIP est méticuleusement conçu pour créer un moment d'exception. 
                Dès votre première interaction avec nous, vous ressentirez la différence d'un service véritablement premium :
              </p>
              <ul className="experience-features">
                <li>
                  <span className="step-number">01</span>
                  <div className="step-content">
                    <h4>Coordination préalable</h4>
                    <p>Un concierge dédié prépare votre trajet selon vos préférences exactes</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">02</span>
                  <div className="step-content">
                    <h4>Accueil personnalisé</h4>
                    <p>Votre chauffeur vous accueille par votre nom et vous guide vers votre véhicule</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">03</span>
                  <div className="step-content">
                    <h4>Environnement sur mesure</h4>
                    <p>Ambiance parfaite dès votre entrée dans le véhicule : température, musique, rafraîchissements</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">04</span>
                  <div className="step-content">
                    <h4>Voyage d'exception</h4>
                    <p>Service attentif mais discret, confort inégalé et attention constante à vos besoins</p>
                  </div>
                </li>
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
              "Après avoir essayé de nombreux services de transport haut de gamme à travers le monde, 
              je peux affirmer que l'expérience VIP offerte ici est véritablement exceptionnelle. 
              L'attention aux détails est remarquable, le chauffeur était d'une discrétion et d'un 
              professionnalisme parfaits, et l'intérieur du véhicule était préparé exactement selon 
              mes préférences. Un service qui surpasse même les standards les plus élevés."
            </p>
            <div className="testimonial-author">
              <div className="author-name">Alexandre D.</div>
              <div className="author-title">PDG Groupe International</div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={bookingRef} className={`booking-section ${bookingVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="section-heading">
            <h2>RÉSERVEZ VOTRE EXPÉRIENCE VIP</h2>
            <p className="subtitle">Un service d'exception vous attend</p>
          </div>
          
          <div className={`booking-container fade-in ${bookingVisible ? 'visible' : ''}`}>
            <BookingForm />
          </div>
        </div>
      </div>
      
      <div className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h3>Des exigences particulières pour votre service VIP ?</h3>
            <p>Notre équipe d'exception est à votre disposition pour créer une expérience sur mesure</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Contact privilégié
              </Link>
              <a href="tel:+33600000000" className="btn btn-outline">
                <i className="fas fa-phone"></i>
                Ligne VIP dédiée
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VipServicePage;