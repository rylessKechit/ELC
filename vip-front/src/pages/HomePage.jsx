import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/HomePage.css';

const HomePage = () => {
  const parallaxRef = useRef(null);

  // Effet de parallaxe pour le fond hero
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Variantes d'animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="home-page vip">
      <section className="hero-section">
        <div className="hero-image" ref={parallaxRef}>
          <img src="/images/vip-luxury-car.jpg" alt="Luxury VIP Service" />
          <div className="overlay"></div>
        </div>
        
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInUp}>
            Services de Transport <span className="gold-text">Premium</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp}>
            Découvrez l'excellence du transport VIP. Voyagez avec élégance, confort et discrétion.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            variants={fadeInUp}
          >
            <Link to="#booking" className="hero-button primary">
              Réserver maintenant
            </Link>
            <Link to="/services" className="hero-button secondary">
              Nos services
            </Link>
          </motion.div>
        </motion.div>
        
        <div className="scroll-indicator">
          <a href="#services">
            <span className="mouse">
              <span className="wheel"></span>
            </span>
            <span className="arrow">
              <i className="fas fa-chevron-down"></i>
            </span>
          </a>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <h2>Services <span className="gold-text">Exclusifs</span></h2>
            <p className="section-subtitle">Une expérience sur mesure pour chaque client</p>
          </motion.div>
          
          <div className="services-grid">
            <motion.div 
              className="service-card luxury-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.4)' }}
            >
              <div className="service-icon">
                <i className="fas fa-plane-departure"></i>
              </div>
              <h3>Transferts Aéroport <span className="gold-text">Premium</span></h3>
              <p>Commencez votre voyage dans le luxe avec notre service de transport aéroport exclusif. Votre chauffeur vous attend, peu importe l'heure.</p>
              <Link to="/services/airport" className="service-link">Découvrir</Link>
            </motion.div>

            <motion.div 
              className="service-card luxury-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.4)' }}
            >
              <div className="service-icon">
                <i className="fas fa-glass-cheers"></i>
              </div>
              <h3>Événements <span className="gold-text">Spéciaux</span></h3>
              <p>Rendez vos événements inoubliables. Mariages, soirées VIP, événements corporatifs - nous assurons votre transport en toute élégance.</p>
              <Link to="/services/events" className="service-link">Découvrir</Link>
            </motion.div>

            <motion.div 
              className="service-card luxury-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.4)' }}
            >
              <div className="service-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>Business <span className="gold-text">Class</span></h3>
              <p>Service de transport dédié aux professionnels exigeants. Confidentialité, ponctualité et confort pour vos déplacements d'affaires.</p>
              <Link to="/services/business" className="service-link">Découvrir</Link>
            </motion.div>

            <motion.div 
              className="service-card luxury-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.4)' }}
            >
              <div className="service-icon">
                <i className="fas fa-city"></i>
              </div>
              <h3>Tourisme <span className="gold-text">De Luxe</span></h3>
              <p>Découvrez les plus beaux endroits avec un service personnalisé. Visites privées, circuits touristiques exclusifs.</p>
              <Link to="/services/tourism" className="service-link">Découvrir</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="fleet-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Notre Flotte <span className="gold-text">VIP</span></h2>
          <p className="section-subtitle">Les véhicules les plus luxueux pour votre confort</p>
        </motion.div>
        
        <div className="fleet-slider">
          <motion.div 
            className="fleet-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="fleet-image">
              <img src="/images/mercedes-s-class.jpg" alt="Mercedes Classe S" />
            </div>
            <div className="fleet-details">
              <h3>Mercedes-Benz <span className="gold-text">Classe S</span></h3>
              <p>Le summum du confort et de l'élégance. Cuir pleine fleur, sièges massants, système audio premium.</p>
              <ul className="fleet-features">
                <li><i className="fas fa-check"></i> 3 passagers maximum</li>
                <li><i className="fas fa-check"></i> Wifi gratuit à bord</li>
                <li><i className="fas fa-check"></i> Boissons fraîches offertes</li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="fleet-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="fleet-image">
              <img src="/images/bmw-7.jpg" alt="BMW Série 7" />
            </div>
            <div className="fleet-details">
              <h3>BMW <span className="gold-text">Série 7</span></h3>
              <p>Technologie et raffinement. Un intérieur spacieux combiné à une conduite dynamique et silencieuse.</p>
              <ul className="fleet-features">
                <li><i className="fas fa-check"></i> 3 passagers maximum</li>
                <li><i className="fas fa-check"></i> Système d'infodivertissement premium</li>
                <li><i className="fas fa-check"></i> Ambiance lumineuse personnalisable</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="booking" className="booking-section">
        <motion.div 
          className="booking-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9 }}
        >
          <h2>Réservez Votre <span className="gold-text">Expérience Premium</span></h2>
          <BookingForm />
        </motion.div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <h2>Ce Que Disent <span className="gold-text">Nos Clients</span></h2>
            <p className="section-subtitle">L'excellence reconnue par ceux qui l'ont expérimentée</p>
          </motion.div>
          
          <div className="testimonials-grid">
            <motion.div 
              className="testimonial-card luxury-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -10 }}
            >
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>Un service impeccable du début à la fin. Le chauffeur était non seulement ponctuel mais également d'une courtoisie remarquable. La voiture était luxueuse et parfaitement entretenue. Une expérience que je recommande vivement.</p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src="/images/client-1.jpg" alt="Client VIP" />
                </div>
                <div className="author-info">
                  <h4>Jean-Philippe M.</h4>
                  <p>Directeur Financier</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="testimonial-card luxury-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>Pour notre mariage, nous voulions un service irréprochable. Le véhicule était magnifique, le chauffeur discret et professionnel. Les petites attentions comme le champagne à bord ont rendu ce moment encore plus spécial.</p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src="/images/client-2.jpg" alt="Client VIP" />
                </div>
                <div className="author-info">
                  <h4>Sophie & Thomas</h4>
                  <p>Mariés en juin 2024</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <motion.div 
          className="cta-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Vivez l'<span className="gold-text">Excellence</span> du Transport VIP</h2>
          <p>Notre engagement : vous offrir une expérience de transport inoubliable</p>
          <div className="cta-buttons">
            <Link to="#booking" className="cta-button primary">
              Réserver maintenant
            </Link>
            <Link to="/contact" className="cta-button secondary">
              Contactez-nous
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;