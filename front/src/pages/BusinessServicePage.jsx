import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/ServicePage.css';
import businessTravel from '../assets/images/business-travel.jpg';
import airportTransferBusiness from '../assets/images/airport-transfer-business.jpg';
import businessRoadshow from '../assets/images/business-roadshow.jpg';
import corporateSolution from '../assets/images/corporate-solution.jpg';

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

const BusinessServicePage = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [overviewRef, overviewVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [bookingRef, bookingVisible] = useIntersectionObserver();

  // Business benefits
  const businessBenefits = [
    { title: 'Productivité', text: 'Transformez votre temps de transport en temps productif', icon: 'chart-line' },
    { title: 'Confidentialité', text: 'Espace de travail mobile sécurisé et confidentiel', icon: 'lock' },
    { title: 'Image professionnelle', text: 'Arrivez à vos rendez-vous avec une image impeccable', icon: 'handshake' },
    { title: 'Gain de temps', text: 'Optimisez votre agenda avec un service ponctuel et fiable', icon: 'clock' }
  ];

  return (
    <div className="service-page business-service-page">
      <div 
        ref={headerRef} 
        className={`service-hero ${headerVisible ? 'animate' : ''}`}
        style={{ backgroundImage: `url(${businessTravel})` }}
      >
        <div className="service-hero-overlay"></div>
        <div className="service-hero-content">
          <h1 className="slide-in-left">TRANSPORT D'AFFAIRES PREMIUM</h1>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-icon"><i className="fas fa-briefcase"></i></span>
            <span className="separator-line"></span>
          </div>
          <p className="slide-in-right">Des solutions de mobilité sur mesure pour les professionnels exigeants</p>
        </div>
      </div>
      
      <div ref={overviewRef} className={`service-overview ${overviewVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="service-overview-content">
            <div className="gold-accent slide-in-left">
              <h2>OPTIMISEZ VOS DÉPLACEMENTS PROFESSIONNELS</h2>
              <p className="subtitle">Un service de transport dédié aux professionnels exigeants</p>
            </div>
            
            <div className="overview-text fade-in">
              <p>
                Notre service de transport d'affaires est spécialement conçu pour répondre aux besoins spécifiques des professionnels 
                et des entreprises. Nous comprenons l'importance de la ponctualité, de la fiabilité et de la discrétion dans 
                vos déplacements professionnels.
              </p>
              <p>
                Que vous ayez besoin d'un transfert aéroport, d'un service pour vos collaborateurs ou pour accompagner vos clients, 
                notre flotte premium et nos chauffeurs expérimentés vous garantissent un service irréprochable adapté au monde des affaires.
              </p>
            </div>
            
            <div className="business-benefits">
              {businessBenefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className={`benefit-item ${overviewVisible ? 'visible' : ''}`}
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
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="feature-content">
                  <h3>Réservation flexible</h3>
                  <p>Système de réservation adapté aux changements de dernière minute et aux emplois du temps chargés.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-2' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-file-invoice"></i>
                </div>
                <div className="feature-content">
                  <h3>Facturation simplifiée</h3>
                  <p>Facturation mensuelle avec rapport détaillé, suivi des dépenses et intégration avec vos systèmes de comptabilité.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-3' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-users-cog"></i>
                </div>
                <div className="feature-content">
                  <h3>Service personnalisé</h3>
                  <p>Gestionnaire de compte dédié pour répondre à tous vos besoins et coordonner vos déplacements.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-4' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <div className="feature-content">
                  <h3>Couverture internationale</h3>
                  <p>Réseau de partenaires dans plus de 100 villes à travers le monde pour vos déplacements internationaux.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={servicesRef} className={`service-details ${servicesVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">NOS SOLUTIONS POUR ENTREPRISES</h2>
          <p className="subtitle fade-in">Des services adaptés à toutes vos exigences professionnelles</p>
          
          <div className="services-grid">
            <div className="service-detail-card slide-in-left">
              <div className="service-detail-icon">
                <i className="fas fa-plane-departure"></i>
              </div>
              <h3>TRANSFERT AÉROPORT & GARE</h3>
              <div className="service-detail-content">
                <p>
                  Vos déplacements professionnels commencent dans le confort de nos véhicules premium. Nos chauffeurs 
                  suivent votre vol en temps réel pour s'adapter à tout changement d'horaire. Vous êtes attendu 
                  à votre arrivée avec une pancarte nominative et une prise en charge immédiate de vos bagages.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Suivi des vols en temps réel</li>
                  <li><i className="fas fa-check"></i>Attente gratuite en cas de retard</li>
                  <li><i className="fas fa-check"></i>WiFi et prises de recharge à bord</li>
                  <li><i className="fas fa-check"></i>Boissons et rafraîchissements offerts</li>
                  <li><i className="fas fa-check"></i>Assistance bagages incluse</li>
                </ul>
              </div>
            </div>
            
            <div className="service-detail-image slide-in-right">
              <img src={airportTransferBusiness} alt="Transfert aéroport professionnel" loading="lazy" />
            </div>
          </div>
          
          <div className="services-grid reverse">
            <div className="service-detail-image slide-in-left">
              <img src={businessRoadshow} alt="Service Roadshow" loading="lazy" />
            </div>
            
            <div className="service-detail-card slide-in-right">
              <div className="service-detail-icon">
                <i className="fas fa-route"></i>
              </div>
              <h3>SERVICE ROADSHOW & MULTI-ÉTAPES</h3>
              <div className="service-detail-content">
                <p>
                  Pour vos roadshows ou journées à multiples rendez-vous, nous vous proposons un service à disposition 
                  avec chauffeur attitré. Votre chauffeur vous accompagne tout au long de la journée, gérant les temps 
                  de trajet et les itinéraires pour optimiser votre agenda.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Chauffeur dédié pour la journée entière</li>
                  <li><i className="fas fa-check"></i>Adaptation aux changements de programme</li>
                  <li><i className="fas fa-check"></i>Connaissance parfaite des accès et itinéraires</li>
                  <li><i className="fas fa-check"></i>Véhicule transformable en bureau mobile</li>
                  <li><i className="fas fa-check"></i>Tarifs forfaitaires transparents</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="services-grid">
            <div className="service-detail-card slide-in-left">
              <div className="service-detail-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>SOLUTIONS CORPORATE</h3>
              <div className="service-detail-content">
                <p>
                  Notre offre Corporate s'adresse aux entreprises qui souhaitent gérer efficacement la mobilité de leurs 
                  collaborateurs et clients. Nous proposons des solutions complètes incluant plateforme de réservation 
                  dédiée, reporting détaillé et facturation centralisée.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Plateforme de réservation personnalisée</li>
                  <li><i className="fas fa-check"></i>Système de validation hiérarchique</li>
                  <li><i className="fas fa-check"></i>Reporting mensuel détaillé par centre de coûts</li>
                  <li><i className="fas fa-check"></i>Facturation centralisée ou par département</li>
                  <li><i className="fas fa-check"></i>Tarifs négociés selon volume</li>
                </ul>
              </div>
            </div>
            
            <div className="service-detail-image slide-in-right">
              <img src={corporateSolution} alt="Solutions corporate" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="business-packages-section">
        <div className="container">
          <h2>NOS FORFAITS ENTREPRISES</h2>
          <p className="subtitle">Des solutions adaptées à tous les besoins professionnels</p>
          
          <div className="packages-grid">
            <div className="package-card">
              <div className="package-header">
                <h3>STARTER</h3>
                <div className="package-price">À partir de 150€/mois</div>
              </div>
              <div className="package-content">
                <ul className="package-features">
                  <li><i className="fas fa-check"></i>10 transferts aéroport/gare</li>
                  <li><i className="fas fa-check"></i>Berline ou Tesla Model 3</li>
                  <li><i className="fas fa-check"></i>Accès à la plateforme de réservation</li>
                  <li><i className="fas fa-check"></i>Facturation mensuelle</li>
                  <li><i className="fas fa-check"></i>Support par email</li>
                </ul>
                <Link to="/contact" className="package-button">
                  Demander un devis
                </Link>
              </div>
            </div>
            
            <div className="package-card featured">
              <div className="package-badge">Recommandé</div>
              <div className="package-header">
                <h3>BUSINESS</h3>
                <div className="package-price">À partir de 450€/mois</div>
              </div>
              <div className="package-content">
                <ul className="package-features">
                  <li><i className="fas fa-check"></i>30 transferts aéroport/gare</li>
                  <li><i className="fas fa-check"></i>Berline, SUV ou Tesla Model 3</li>
                  <li><i className="fas fa-check"></i>2 services roadshow inclus</li>
                  <li><i className="fas fa-check"></i>Plateforme personnalisée</li>
                  <li><i className="fas fa-check"></i>Gestionnaire de compte dédié</li>
                  <li><i className="fas fa-check"></i>Reporting mensuel détaillé</li>
                  <li><i className="fas fa-check"></i>Support prioritaire 24/7</li>
                </ul>
                <Link to="/contact" className="package-button">
                  Demander un devis
                </Link>
              </div>
            </div>
            
            <div className="package-card">
              <div className="package-header">
                <h3>ENTERPRISE</h3>
                <div className="package-price">Sur mesure</div>
              </div>
              <div className="package-content">
                <ul className="package-features">
                  <li><i className="fas fa-check"></i>Volume illimité</li>
                  <li><i className="fas fa-check"></i>Accès à toute la flotte</li>
                  <li><i className="fas fa-check"></i>Service roadshow illimité</li>
                  <li><i className="fas fa-check"></i>API d'intégration</li>
                  <li><i className="fas fa-check"></i>Système de validation hiérarchique</li>
                  <li><i className="fas fa-check"></i>Facturation par centre de coûts</li>
                  <li><i className="fas fa-check"></i>Director of Customer Success dédié</li>
                  <li><i className="fas fa-check"></i>Service conciergerie premium</li>
                </ul>
                <Link to="/contact" className="package-button">
                  Contacter un expert
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
              "Depuis que nous avons souscrit au forfait Business, la gestion des déplacements de nos cadres est devenue 
              beaucoup plus efficace. Le service est impeccable, les chauffeurs sont professionnels et discrets, 
              et la facturation centralisée nous a permis de réduire considérablement le temps consacré à la gestion administrative. 
              Un partenaire fiable que je recommande à toutes les entreprises."
            </p>
            <div className="testimonial-author">
              <div className="author-name">Philippe D.</div>
              <div className="author-title">Directeur Administratif et Financier</div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={bookingRef} className={`booking-section ${bookingVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="section-heading">
            <h2>RÉSERVEZ VOTRE SERVICE D'AFFAIRES</h2>
            <p className="subtitle">Transformez vos déplacements professionnels en temps productif</p>
          </div>
          
          <div className={`booking-container fade-in ${bookingVisible ? 'visible' : ''}`}>
            <BookingForm />
          </div>
        </div>
      </div>
      
      <div className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h3>Besoin d'une solution sur mesure pour votre entreprise ?</h3>
            <p>Nos experts sont à votre disposition pour élaborer une offre adaptée à vos besoins spécifiques</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Demander un rendez-vous
              </Link>
              <a href="tel:+33600000000" className="btn btn-outline">
                <i className="fas fa-phone"></i>
                Ligne dédiée entreprises
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessServicePage;