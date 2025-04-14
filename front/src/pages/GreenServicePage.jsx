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

const GreenServicePage = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [overviewRef, overviewVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [bookingRef, bookingVisible] = useIntersectionObserver();

  // Eco facts
  const ecoFacts = [
    { number: '0', text: 'émission de CO₂', icon: 'leaf' },
    { number: '70%', text: 'réduction de l\'empreinte carbone', icon: 'globe-americas' },
    { number: '100%', text: 'énergie renouvelable pour nos bornes', icon: 'bolt' },
    { number: '350', text: 'arbres plantés cette année', icon: 'tree' }
  ];

  return (
    <div className="service-page green-service-page">
      <div 
        ref={headerRef} 
        className={`service-hero ${headerVisible ? 'animate' : ''}`}
        style={{ backgroundImage: 'url(/assets/images/tesla-model-3.jpg)' }}
      >
        <div className="service-hero-overlay"></div>
        <div className="service-hero-content">
          <h1 className="slide-in-left">SERVICE DE TRANSPORT ÉCOLOGIQUE</h1>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-icon"><i className="fas fa-leaf"></i></span>
            <span className="separator-line"></span>
          </div>
          <p className="slide-in-right">Voyagez avec style et responsabilité avec notre flotte de Tesla Model 3</p>
        </div>
      </div>
      
      <div ref={overviewRef} className={`service-overview ${overviewVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="service-overview-content">
            <div className="gold-accent slide-in-left">
              <h2>LE LUXE RESPONSABLE</h2>
              <p className="subtitle">L'élégance d'un service premium combinée à l'engagement écologique</p>
            </div>
            
            <div className="overview-text fade-in">
              <p>
                Notre service de transport Green allie le confort exceptionnel d'une berline haut de gamme à un engagement fort pour la protection de l'environnement. 
                Avec notre flotte de Tesla Model 3, chaque trajet devient une expérience unique alliant technologie de pointe, design épuré et démarche écologique.
              </p>
              <p>
                Que ce soit pour vos déplacements professionnels, vos transferts aéroport ou vos événements spéciaux, notre service Green vous permet de voyager en harmonie avec vos valeurs environnementales, sans compromis sur la qualité et le confort.
              </p>
            </div>
            
            <div className="eco-stats">
              {ecoFacts.map((fact, index) => (
                <div 
                  key={index} 
                  className={`eco-stat-item ${overviewVisible ? 'visible' : ''}`}
                  style={{animationDelay: `${0.2 * index}s`}}
                >
                  <div className="eco-stat-icon">
                    <i className={`fas fa-${fact.icon}`}></i>
                  </div>
                  <div className="eco-stat-number">{fact.number}</div>
                  <div className="eco-stat-text">{fact.text}</div>
                </div>
              ))}
            </div>
            
            <div className="overview-features stagger-items">
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-1' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-leaf"></i>
                </div>
                <div className="feature-content">
                  <h3>Zéro émission</h3>
                  <p>Nos véhicules 100% électriques ne rejettent aucun gaz à effet de serre pendant vos trajets.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-2' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                <div className="feature-content">
                  <h3>Performance exceptionnelle</h3>
                  <p>Profitez d'une accélération fulgurante et d'une tenue de route impeccable avec la Tesla Model 3.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-3' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-charging-station"></i>
                </div>
                <div className="feature-content">
                  <h3>Énergie verte</h3>
                  <p>Nous utilisons exclusivement de l'électricité issue de sources renouvelables pour recharger notre flotte.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-4' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-laptop"></i>
                </div>
                <div className="feature-content">
                  <h3>Technologie embarquée</h3>
                  <p>Profitez d'une connectivité parfaite et d'un système de divertissement haute définition pendant votre trajet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={servicesRef} className={`service-details ${servicesVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">NOTRE FLOTTE ÉCOLOGIQUE</h2>
          <p className="subtitle fade-in">Des véhicules premium respectueux de l'environnement</p>
          
          <div className="services-grid">
            <div className="service-detail-card slide-in-left">
              <div className="service-detail-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3>TESLA MODEL 3</h3>
              <div className="service-detail-content">
                <p>
                  La Tesla Model 3 redéfinit l'expérience de conduite électrique avec ses performances exceptionnelles et son intérieur minimaliste. 
                  Ce véhicule allie technologie de pointe, confort et respect de l'environnement.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Accélération 0-100 km/h en 3,3 secondes</li>
                  <li><i className="fas fa-check"></i>Autonomie jusqu'à 560 km</li>
                  <li><i className="fas fa-check"></i>Intérieur premium en cuir végan</li>
                  <li><i className="fas fa-check"></i>Écran tactile 15" pour contrôler toutes les fonctions</li>
                  <li><i className="fas fa-check"></i>Système audio immersif 14 haut-parleurs</li>
                  <li><i className="fas fa-check"></i>Toit panoramique en verre</li>
                </ul>
              </div>
            </div>
            
            <div className="service-detail-image slide-in-right">
              <img src="/assets/images/tesla-interior.jpg" alt="Intérieur Tesla Model 3" loading="lazy" />
            </div>
          </div>
          
          <div className="services-grid reverse">
            <div className="service-detail-image slide-in-left">
              <img src="/assets/images/tesla-supercharger.jpg" alt="Tesla supercharger" loading="lazy" />
            </div>
            
            <div className="service-detail-card slide-in-right">
              <div className="service-detail-icon">
                <i className="fas fa-charging-station"></i>
              </div>
              <h3>NOTRE ENGAGEMENT ÉCOLOGIQUE</h3>
              <div className="service-detail-content">
                <p>
                  Notre engagement pour l'environnement va au-delà de l'utilisation de véhicules électriques. 
                  Nous avons mis en place une politique globale pour réduire notre empreinte écologique à tous les niveaux.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>100% de notre énergie provient de sources renouvelables</li>
                  <li><i className="fas fa-check"></i>Compensation carbone pour nos activités administratives</li>
                  <li><i className="fas fa-check"></i>Programme de plantation d'arbres pour chaque 1000 km parcourus</li>
                  <li><i className="fas fa-check"></i>Recyclage et gestion responsable des batteries en fin de vie</li>
                  <li><i className="fas fa-check"></i>Produits d'entretien écologiques et biodégradables</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="eco-benefits-section">
        <div className="container">
          <h2>LES AVANTAGES DE CHOISIR GREEN</h2>
          <p className="subtitle">Pourquoi opter pour une solution de transport écologique ?</p>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-earth-americas"></i>
              </div>
              <h3>Impact environnemental</h3>
              <p>En choisissant notre service Green, vous réduisez considérablement votre empreinte carbone par rapport à un véhicule thermique.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>Image de marque</h3>
              <p>Démontrez l'engagement écologique de votre entreprise à vos clients et partenaires lors de vos déplacements professionnels.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-volume-mute"></i>
              </div>
              <h3>Confort acoustique</h3>
              <p>Profitez d'un trajet silencieux grâce à la motorisation électrique, idéal pour travailler ou se détendre.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Sécurité optimale</h3>
              <p>Les Tesla Model 3 sont parmi les véhicules les plus sûrs au monde avec une note de 5 étoiles aux tests de sécurité.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-wifi"></i>
              </div>
              <h3>Connectivité</h3>
              <p>Restez connecté avec le WiFi gratuit à bord et les nombreuses prises de recharge pour vos appareils.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-hand-holding-heart"></i>
              </div>
              <h3>Responsabilité sociale</h3>
              <p>Participez à notre programme de plantation d'arbres et autres initiatives environnementales que nous soutenons.</p>
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
              "J'ai été impressionné par la qualité du service Green. La Tesla Model 3 était impeccable, 
              silencieuse et confortable. Pouvoir voyager dans le luxe tout en respectant mes valeurs 
              environnementales est un vrai plus. Le chauffeur était parfaitement professionnel et 
              la course s'est déroulée sans accroc. Je recommande sans hésiter !"
            </p>
            <div className="testimonial-author">
              <div className="author-name">Mathieu R.</div>
              <div className="author-title">Directeur RSE</div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={bookingRef} className={`booking-section ${bookingVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="section-heading">
            <h2>RÉSERVEZ VOTRE TRANSPORT ÉCOLOGIQUE</h2>
            <p className="subtitle">Voyagez responsable, voyagez avec style</p>
          </div>
          
          <div className={`booking-container fade-in ${bookingVisible ? 'visible' : ''}`}>
            <BookingForm />
          </div>
        </div>
      </div>
      
      <div className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h3>Envie d'un service sur mesure ?</h3>
            <p>Contactez-nous pour personnaliser votre expérience de transport écologique</p>
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

export default GreenServicePage;