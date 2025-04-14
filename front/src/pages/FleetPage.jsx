import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/FleetPage.css';

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

const FleetPage = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [overviewRef, overviewVisible] = useIntersectionObserver();
  const [fleetRef, fleetVisible] = useIntersectionObserver();
  const [bookingRef, bookingVisible] = useIntersectionObserver();

  // État pour filtrer la flotte
  const [activeFilter, setActiveFilter] = useState('all');

  // Données de la flotte
  const fleetData = [
    {
      id: 'mercedes-e',
      name: 'Mercedes-Benz Classe E',
      category: 'sedan',
      categoryName: 'Berline de Luxe',
      passengers: 3,
      luggage: 3,
      description: "La Mercedes Classe E incarne l'équilibre parfait entre élégance et technologie, offrant une expérience de conduite raffinée et confortable. Son habitacle spacieux et son niveau de finition exemplaire vous garantissent un voyage dans les meilleures conditions.",
      features: [
        'Sièges en cuir confortables',
        'Climatisation bi-zone',
        'Système audio premium',
        'Wifi à bord',
        'Prises de recharge USB',
        'Bouteilles d\'eau offertes'
      ],
      image: '/assets/images/mercedes-e-class.jpg',
      additionalImages: [
        '/assets/images/mercedes-e-interior.jpg',
        '/assets/images/mercedes-e-rear.jpg'
      ]
    },
    {
      id: 'tesla-model3',
      name: 'Tesla Model 3',
      category: 'green',
      categoryName: 'Véhicule Électrique',
      passengers: 4,
      luggage: 4,
      description: "La Tesla Model 3 représente l'avenir du transport premium avec sa motorisation 100% électrique. Alliant performances exceptionnelles, technologie de pointe et respect de l'environnement, elle offre une expérience de transport unique et responsable.",
      features: [
        'Motorisation 100% électrique',
        'Écran tactile central 15"',
        'Toit panoramique en verre',
        'Intérieur minimaliste et élégant',
        'Accélération 0-100 km/h en 3,3s',
        'Wifi et streaming à bord'
      ],
      image: '/assets/images/tesla-model-3.jpg',
      additionalImages: [
        '/assets/images/tesla-model3-interior.jpg',
        '/assets/images/tesla-model3-rear.jpg'
      ]
    },
    {
      id: 'mercedes-s',
      name: 'Mercedes-Benz Classe S',
      category: 'premium',
      categoryName: 'Berline Premium',
      passengers: 3,
      luggage: 3,
      description: "La Mercedes Classe S représente le summum du luxe automobile. Son confort exceptionnel, ses technologies avancées et son silence de fonctionnement en font le choix idéal pour les clients les plus exigeants. Chaque détail est pensé pour offrir une expérience de transport incomparable.",
      features: [
        'Sièges massants et climatisés',
        'Système audio Burmester 4D',
        'Éclairage d\'ambiance 64 couleurs',
        'Tablettes tactiles à l\'arrière',
        'Minibar intégré',
        'Isolation phonique renforcée'
      ],
      image: '/assets/images/mercedes-s-class.jpg',
      additionalImages: [
        '/assets/images/mercedes-s-interior.jpg',
        '/assets/images/mercedes-s-rear.jpg'
      ]
    },
    {
      id: 'bmw-7',
      name: 'BMW Série 7',
      category: 'premium',
      categoryName: 'Berline Premium',
      passengers: 3,
      luggage: 3,
      description: "La BMW Série 7 offre une expérience de conduite exceptionnelle alliant sportivité et raffinement. Son intérieur somptueux et ses technologies innovantes, notamment son système de divertissement haut de gamme, vous garantissent un voyage inoubliable.",
      features: [
        'Sièges Executive Lounge',
        'Sky Lounge avec toit panoramique',
        'Système de divertissement arrière',
        'Commande gestuelle',
        'Assistant personnel intelligent',
        'Parfumeur d\'ambiance'
      ],
      image: '/assets/images/bmw-7-series.jpg',
      additionalImages: [
        '/assets/images/bmw-7-interior.jpg',
        '/assets/images/bmw-7-rear.jpg'
      ]
    },
    {
      id: 'bmw-x5',
      name: 'BMW X5',
      category: 'suv',
      categoryName: 'SUV de Luxe',
      passengers: 5,
      luggage: 5,
      description: "Le BMW X5 combine élégance et praticité avec son espace intérieur généreux et sa position de conduite surélevée. Parfait pour les groupes ou les familles, il offre un grand confort à tous les passagers ainsi qu'une capacité de bagages importante.",
      features: [
        'Intérieur spacieux et modulable',
        'Position de conduite surélevée',
        'Système audio Harman Kardon',
        'Grand coffre pour les bagages',
        'Climatisation 4 zones',
        'Vitres teintées pour plus d\'intimité'
      ],
      image: '/assets/images/bmw-x5.jpg',
      additionalImages: [
        '/assets/images/bmw-x5-interior.jpg',
        '/assets/images/bmw-x5-rear.jpg'
      ]
    },
    {
      id: 'mercedes-v',
      name: 'Mercedes-Benz Classe V',
      category: 'van',
      categoryName: 'Van VIP',
      passengers: 7,
      luggage: 7,
      description: "Le Mercedes Classe V est la solution idéale pour les groupes jusqu'à 7 personnes. Configuré comme un salon mobile avec des sièges face-à-face, il combine espace, confort et élégance. Parfait pour les voyages d'affaires en groupe ou les transferts familiaux.",
      features: [
        'Configuration salon face-à-face',
        'Tables de travail intégrées',
        'Réfrigérateur et porte-gobelets',
        'Prises 220V pour ordinateurs',
        'Éclairage d\'ambiance personnalisable',
        'Séparation chauffeur'
      ],
      image: '/assets/images/mercedes-v-class.jpg',
      additionalImages: [
        '/assets/images/mercedes-v-interior.jpg',
        '/assets/images/mercedes-v-rear.jpg'
      ]
    }
  ];

  // Filtrer les véhicules selon la catégorie active
  const filteredVehicles = activeFilter === 'all' 
    ? fleetData 
    : fleetData.filter(vehicle => vehicle.category === activeFilter);

  return (
    <div className="fleet-page">
      <div 
        ref={headerRef} 
        className={`page-hero ${headerVisible ? 'animate' : ''}`}
        style={{ backgroundImage: 'url(/assets/images/fleet-hero.jpg)' }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="slide-in-left">NOTRE FLOTTE D'EXCEPTION</h1>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-icon"><i className="fas fa-car"></i></span>
            <span className="separator-line"></span>
          </div>
          <p className="slide-in-right">Des véhicules haut de gamme pour une expérience de transport incomparable</p>
        </div>
      </div>
      
      <div ref={overviewRef} className={`fleet-overview ${overviewVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="fleet-overview-content">
            <div className="gold-accent slide-in-left">
              <h2>UNE SÉLECTION EXIGEANTE DE VÉHICULES PREMIUM</h2>
              <p className="subtitle">Le parfait équilibre entre luxe, confort et fiabilité</p>
            </div>
            
            <div className="overview-text fade-in">
              <p>
                Notre flotte de véhicules a été méticuleusement sélectionnée pour répondre aux attentes 
                de notre clientèle exigeante. Chaque véhicule est choisi non seulement pour son prestige 
                et son confort, mais aussi pour sa fiabilité et sa sécurité.
              </p>
              <p>
                Régulièrement renouvelés et entretenus avec le plus grand soin, nos véhicules sont toujours 
                dans un état impeccable. De la berline de luxe au van VIP en passant par nos véhicules 
                électriques, vous trouverez toujours le véhicule parfaitement adapté à vos besoins.
              </p>
            </div>
            
            <div className="fleet-features">
              <div className={`feature-item ${overviewVisible ? 'visible' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="feature-content">
                  <h3>Flotte récente</h3>
                  <p>Tous nos véhicules ont moins de 2 ans et sont régulièrement renouvelés.</p>
                </div>
              </div>
              
              <div className={`feature-item ${overviewVisible ? 'visible' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-tools"></i>
                </div>
                <div className="feature-content">
                  <h3>Entretien rigoureux</h3>
                  <p>Maintenance par des concessionnaires officiels selon les plus hauts standards.</p>
                </div>
              </div>
              
              <div className={`feature-item ${overviewVisible ? 'visible' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-hand-sparkles"></i>
                </div>
                <div className="feature-content">
                  <h3>Propreté irréprochable</h3>
                  <p>Nettoyage complet intérieur et extérieur avant chaque service.</p>
                </div>
              </div>
              
              <div className={`feature-item ${overviewVisible ? 'visible' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="feature-content">
                  <h3>Sécurité optimale</h3>
                  <p>Équipements de sécurité à la pointe et vérifications régulières.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={fleetRef} className={`fleet-showcase ${fleetVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">DÉCOUVREZ NOS VÉHICULES</h2>
          <p className="subtitle fade-in">Sélectionnez le véhicule parfait pour votre prochain trajet</p>
          
          <div className="fleet-filters">
            <button 
              className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Tous les véhicules
            </button>
            <button 
              className={`filter-button ${activeFilter === 'sedan' ? 'active' : ''}`}
              onClick={() => setActiveFilter('sedan')}
            >
              Berlines de Luxe
            </button>
            <button 
              className={`filter-button ${activeFilter === 'green' ? 'active' : ''}`}
              onClick={() => setActiveFilter('green')}
            >
              Véhicules Électriques
            </button>
            <button 
              className={`filter-button ${activeFilter === 'premium' ? 'active' : ''}`}
              onClick={() => setActiveFilter('premium')}
            >
              Berlines Premium
            </button>
            <button 
              className={`filter-button ${activeFilter === 'suv' ? 'active' : ''}`}
              onClick={() => setActiveFilter('suv')}
            >
              SUV de Luxe
            </button>
            <button 
              className={`filter-button ${activeFilter === 'van' ? 'active' : ''}`}
              onClick={() => setActiveFilter('van')}
            >
              Vans VIP
            </button>
          </div>
          
          <div className="fleet-grid">
            {filteredVehicles.map((vehicle, index) => (
              <div 
                key={vehicle.id} 
                className={`vehicle-card ${fleetVisible ? 'visible' : ''}`} 
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="vehicle-image">
                  <img src={vehicle.image} alt={vehicle.name} />
                  <div className="vehicle-category">{vehicle.categoryName}</div>
                </div>
                <div className="vehicle-details">
                  <h3>{vehicle.name}</h3>
                  <div className="vehicle-specs">
                    <div className="spec-item">
                      <i className="fas fa-users"></i>
                      <span>Jusqu'à {vehicle.passengers} passagers</span>
                    </div>
                    <div className="spec-item">
                      <i className="fas fa-suitcase"></i>
                      <span>Jusqu'à {vehicle.luggage} bagages</span>
                    </div>
                  </div>
                  <p className="vehicle-description">{vehicle.description}</p>
                  <div className="vehicle-features">
                    <h4>Équipements</h4>
                    <ul>
                      {vehicle.features.slice(0, 3).map((feature, i) => (
                        <li key={i}><i className="fas fa-check"></i> {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="vehicle-actions">
                    <button className="vehicle-details-btn" onClick={() => window.location.href = `/flotte-vehicules/${vehicle.id}`}>
                      Voir les détails
                    </button>
                    <Link to="/contact" className="vehicle-book-btn">
                      Réserver
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="fleet-comparison">
        <div className="container">
          <h2>COMPARATIF DE NOTRE FLOTTE</h2>
          <p className="subtitle">Trouvez le véhicule parfaitement adapté à vos besoins</p>
          
          <div className="comparison-table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Véhicule</th>
                  <th>Catégorie</th>
                  <th>Passagers</th>
                  <th>Bagages</th>
                  <th>Idéal pour</th>
                  <th>Prix indicatif</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mercedes Classe E</td>
                  <td>Berline de Luxe</td>
                  <td>3</td>
                  <td>3</td>
                  <td>Trajets professionnels, Aéroport</td>
                  <td>€€</td>
                </tr>
                <tr>
                  <td>Tesla Model 3</td>
                  <td>Véhicule Électrique</td>
                  <td>4</td>
                  <td>4</td>
                  <td>Trajets éco-responsables, Ville</td>
                  <td>€€</td>
                </tr>
                <tr>
                  <td>Mercedes Classe S</td>
                  <td>Berline Premium</td>
                  <td>3</td>
                  <td>3</td>
                  <td>VIP, Événements prestigieux</td>
                  <td>€€€</td>
                </tr>
                <tr>
                  <td>BMW Série 7</td>
                  <td>Berline Premium</td>
                  <td>3</td>
                  <td>3</td>
                  <td>VIP, Longue distance confort</td>
                  <td>€€€</td>
                </tr>
                <tr>
                  <td>BMW X5</td>
                  <td>SUV de Luxe</td>
                  <td>5</td>
                  <td>5</td>
                  <td>Familles, Groupes, Bagages volumineux</td>
                  <td>€€€</td>
                </tr>
                <tr>
                  <td>Mercedes Classe V</td>
                  <td>Van VIP</td>
                  <td>7</td>
                  <td>7</td>
                  <td>Groupes, Équipes professionnelles</td>
                  <td>€€€€</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="price-legend">
            <span><strong>Prix indicatif :</strong></span>
            <span className="price-indicator">€ = Économique</span>
            <span className="price-indicator">€€ = Standard</span>
            <span className="price-indicator">€€€ = Premium</span>
            <span className="price-indicator">€€€€ = Luxe</span>
          </div>
        </div>
      </div>
      
      <div className="fleet-care">
        <div className="container">
          <div className="care-content">
            <div className="care-image">
              <img src="/assets/images/vehicle-maintenance.jpg" alt="Entretien de notre flotte" />
            </div>
            <div className="care-text">
              <h2>ENTRETIEN & MAINTENANCE</h2>
              <p>
                L'excellence de notre service repose sur une flotte impeccablement entretenue. 
                Chaque véhicule fait l'objet d'un protocole d'entretien rigoureux:
              </p>
              <ul className="care-list">
                <li>
                  <i className="fas fa-calendar-check"></i>
                  <div>
                    <h4>Maintenance préventive</h4>
                    <p>Révisions régulières selon un calendrier strict, dépassant les recommandations des constructeurs</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-soap"></i>
                  <div>
                    <h4>Nettoyage professionnel</h4>
                    <p>Nettoyage complet intérieur et extérieur après chaque service avec des produits écologiques haut de gamme</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-clipboard-check"></i>
                  <div>
                    <h4>Contrôle qualité</h4>
                    <p>Inspection de 50 points avant chaque mise en service pour garantir une expérience parfaite</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-air-freshener"></i>
                  <div>
                    <h4>Ambiance intérieure</h4>
                    <p>Parfums d'ambiance subtils et élégants, température pré-réglée selon la saison</p>
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
              "J'ai eu l'occasion de tester plusieurs véhicules de la flotte et chaque expérience a été 
              remarquable. Les voitures sont non seulement magnifiques mais aussi dans un état impeccable. 
              La Tesla Model 3 pour mes déplacements en ville et la Mercedes Classe S pour mes voyages 
              d'affaires sont désormais mes choix privilégiés. Un service qui allie parfaitement luxe et fiabilité."
            </p>
            <div className="testimonial-author">
              <div className="author-name">Nicolas R.</div>
              <div className="author-title">Directeur Marketing</div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={bookingRef} className={`booking-section ${bookingVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="section-heading">
            <h2>RÉSERVEZ VOTRE VÉHICULE</h2>
            <p className="subtitle">Choisissez l'excellence pour votre prochain déplacement</p>
          </div>
          
          <div className={`booking-container fade-in ${bookingVisible ? 'visible' : ''}`}>
            <BookingForm />
          </div>
        </div>
      </div>
      
      <div className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h3>Vous avez des exigences particulières ?</h3>
            <p>Notre flotte peut s'adapter à vos besoins spécifiques</p>
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

export default FleetPage;